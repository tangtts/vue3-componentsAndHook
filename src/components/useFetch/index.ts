import {
  computed,
  ComputedRef,
  isRef,
  ref,
  Ref,
  shallowRef,
  toRaw,
  watch,
} from "vue";
import containsProp from "../../utils/containsProp";
import createEventHook, { EventHookOn } from "../../utils/createEventHook";
import {
  BeforeFetchContext,
  DataType,
  HttpMethod,
  InternalConfig,
  UseFetchOptions,
} from "./types";

function isFetchOptions(obj: object): obj is UseFetchOptions {
  return (
    obj &&
    containsProp(
      obj,
      "immediate",
      "refetch",
      "initialData",
      "timeout",
      "beforeFetch",
      "afterFetch",
      "onFetchError",
      "fetch"
    )
  );
}

function headersToObject(headers: HeadersInit | undefined) {
  if (typeof Headers !== "undefined" && headers instanceof Headers)
    return Object.fromEntries([...headers.entries()]);
  return headers;
}

const resolveUnref = val => {
  return toRaw(val);
};

export type MaybeComputedRef<T> = ComputedRef<T> | T | Ref<T>;

interface UseFetchReturn<T> {
  /**
   * Indicates if the fetch request has finished
   */
  isFinished: Ref<boolean>;

  /**
   * The statusCode of the HTTP fetch response
   */
  statusCode: Ref<number | null>;

  /**
   * The raw response of the fetch response
   */
  response: Ref<Response | null>;

  /**
   * Any fetch errors that may have occurred
   */
  error: Ref<any>;

  /**
   * The fetch response body on success, may either be JSON or text
   */
  data: Ref<T | null>;

  /**
   * Indicates if the request is currently being fetched.
   */
  isFetching: Ref<boolean>;

  /**
   * Abort the fetch request
   */
  abort: () => void;
  execute: (throwOnFailed?: boolean) => Promise<any>;
  onFetchResponse: EventHookOn<Response>;

  onFetchError: EventHookOn;
  onFetchFinally: EventHookOn;

  get(): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>;
  post(
    payload?: MaybeComputedRef<unknown>,
    type?: string
  ): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>;
  // type
  json<JSON = any>(): UseFetchReturn<JSON> & PromiseLike<UseFetchReturn<JSON>>;
}
const payloadMapping: Record<string, string> = {
  json: "application/json",
  text: "text/plain",
};
//
export default function useFetch<T>(
  url: string,
  args?: Partial<InternalConfig & UseFetchOptions>
): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>> {
  // 内部的 config
  const config: InternalConfig = {
    method: "GET",
    type: "text",
    payload: undefined as unknown,
  };

  /** @type {UseFetchOptions} -  timeout / beforeFetch... */
  let options: UseFetchOptions = {
    immediate: true,
    refetch: false,
    timeout: 0,
  };
  // fetch 请求
  /** @type {RequestInit} fetch 默认请求类型,+ signal */
  let fetchOptions: RequestInit = {};

  // 与用户 传入的类型进行合并
  if (args && isFetchOptions(args)) {
    options = { ...options, ...args };
  }
  //  解构出需要的数据
  const { fetch = window.fetch, initialData, timeout } = options;

  /** @type {shallowRef} 初始对时默认的数据做一次浅ref */
  const data = shallowRef<T | null>(initialData || null);

  const isFinished = ref(false);
  const isFetching = ref(false);
  /**
   * @description 是否在 loading 状态
   * @param {boolean} isLoading
   */
  const loading = (isLoading: boolean) => {
    isFetching.value = isLoading;
    isFinished.value = !isLoading;
  };

  let controller: AbortController | undefined;

  /**
   * @description abort 取消请求，在 fetch 的 signal属性 注入controller.signal
   */
  const abort = () => {
    controller?.abort();
    controller = new AbortController();
    controller.signal.onabort = () => (aborted.value = true);
    fetchOptions = {
      ...fetchOptions,
      signal: controller.signal,
    };
  };

  /** @type {EventHook<Response>} responseEvent，事件触发 */
  const responseEvent = createEventHook<Response>();
  const errorEvent = createEventHook<any>();
  const finallyEvent = createEventHook<any>();

  const aborted = ref(false);
  const statusCode = ref<number | null>(null);
  const response = shallowRef<Response | null>(null);
  const error = shallowRef<any>(null);

  let execute = async (throwOnFailed = false) => {
    loading(true);
    error.value = null;
    statusCode.value = null;
    aborted.value = false;

    const defaultFetchOptions: RequestInit = {
      method: config.method,
      headers: {},
    };

    if (config.payload) {
      // 先把 headers 转为 对象
      const headers = headersToObject(defaultFetchOptions.headers) as Record<
        string,
        string
      >;

      if (config.payloadType) {
        headers["Content-Type"] =
          payloadMapping[config.payloadType] ?? config.payloadType;
      }

      // post 请求需要
      // const { data } = useFetch(url).post().text()
      // const { data } = useFetch(url, { method: 'GET' }, { refetch: true })
      const payload = resolveUnref(config.payload);

      // 如果 payloadType 时 json 就先 JSON.stringify
      defaultFetchOptions.body =
        config.payloadType === "json"
          ? JSON.stringify(payload)
          : (payload as BodyInit);
    }

    let isCanceled = false;

    // 拼接 BeforeFetchContext
    const context: BeforeFetchContext = {
      url: resolveUnref(url),
      options: {
        ...defaultFetchOptions,
        ...fetchOptions,
      },
      cancel: () => {
        isCanceled = true;
      },
    };

    // 把用户的与当前的context 合并
    if (options.beforeFetch) {
      Object.assign(context, await options.beforeFetch(context));
    }

    // 如果调用了 cancel 函数,就停止
    if (isCanceled || !fetch) {
      loading(false);
      return Promise.resolve(null);
    }
    
    /** @type {json / text} 格式化后的真实数据 */
    let responseData: any = null;
    return new Promise<Response | null>((resolve, reject) => {
      fetch(context.url, {
        ...defaultFetchOptions,
        ...context.options,
        headers: {
          ...headersToObject(defaultFetchOptions.headers),
          ...headersToObject(context.options?.headers),
        },
      })
        .then(async fetchResponse => {
          // 保留初始数据
          response.value = fetchResponse;
          statusCode.value = fetchResponse.status;

          responseData = await fetchResponse[config.type]();

          if (!fetchResponse.ok) {
            data.value = initialData || null;
            throw new Error(fetchResponse.statusText);
          }

          if (options.afterFetch) {
            // 把 json 之后的数据和 没有 json 后的数据 统一传入
            // 返回 数据解构  data
            ({ data: responseData } = await options.afterFetch({
              data: responseData,
              response: fetchResponse,
            }));
          }
          data.value = responseData;

          //  const { onFetchResponse, onFetchError } = useFetch(url)

          // onFetchResponse((response) => {
          //   console.log(response.status)
          // })

          // onFetchError((error) => {
          //   console.error(error.message)
          // })
          // 触发 fetchResponse
          responseEvent.trigger(fetchResponse);
          return resolve(fetchResponse);
        })
        .catch(async fetchError => {
          let errorData = fetchError.message || fetchError.name;

          if (options.onFetchError)
            ({ error: errorData } = await options.onFetchError({
              data: responseData,
              error: fetchError,
              response: response.value,
            }));
          error.value = errorData;

          errorEvent.trigger(fetchError);

          if (throwOnFailed) return reject(fetchError);

          return resolve(null);
        })
        .finally(() => {
          loading(false);

          finallyEvent.trigger(null);
        });
    });
  };

  function resolveRef<T>(r: MaybeComputedRef<T>) {
    return typeof r === "function" ? computed<T>(r as any) : ref(r);
  }

  const refetch = resolveRef(options.refetch);

  watch([refetch, resolveRef(url)], ([refetch]) => refetch && execute(), {
    deep: true,
  });

  if (options.immediate) {
    setTimeout(execute, 0);
  }

  const shell: UseFetchReturn<T> = {
    isFinished,
    statusCode,
    response,
    error,
    data,
    isFetching,
    abort,
    execute,
    // 会返回一个 off 事件
    onFetchResponse: responseEvent.on,
    onFetchError: errorEvent.on,
    onFetchFinally: finallyEvent.on,
    // method
    get: setMethod("GET"),
    post: setMethod("POST"),

    // type
    json: setType("json"),
  };

  function setMethod(method: HttpMethod) {
    return (payload?: unknown, payloadType?: string) => {
      if (!isFetching.value) {
        config.method = method;
        config.payload = payload;
        config.payloadType = payloadType;

        // watch for payload changes
        if (isRef(config.payload)) {
          watch(
            [refetch, resolveUnref(config.payload)],
            ([refetch]) => refetch && execute(),
            { deep: true }
          );
        }

        const rawPayload = resolveUnref(config.payload);
        // Set the payload to json type only if it's not provided and a literal object is provided and the object is not `formData`
        // The only case we can deduce the content type and `fetch` can't
        if (
          !payloadType &&
          rawPayload &&
          Object.getPrototypeOf(rawPayload) === Object.prototype &&
          !(rawPayload instanceof FormData)
        )
          config.payloadType = "json";

        return {
          ...shell,
          then(onFulfilled: any, onRejected: any) {
            return new Promise(onFulfilled);
          },
        } as any;
      }
    };
  }

  function setType(type: DataType) {
    return () => {
      if (!isFetching.value) {
        config.type = type;
        return {
          ...shell,
          then(onFulfilled: any, onRejected: any) {
            return Promise.resolve().then(onFulfilled, onRejected);
          },
        } as any;
      }
      return undefined;
    };
  }

  return {
    ...shell,
    then(onFulfilled, onRejected) {
      return Promise.resolve().then(onFulfilled as any, onRejected);
    },
  };
}
