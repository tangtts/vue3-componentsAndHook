# useFetch
> 来自于 [vueuse](https://vueuse.org/core/useFetch/#usefetch)的仿写
> 
<br/>

写了一篇 [**👉详细的介绍**](https://juejin.cn/post/7211033231058042938)，就不过多赘述了
>
<br/>

 简单的功能介绍
 1. 发送请求
      - 直接使用
 `const { isFetching, error, data } = useFetch(url)`
    -  手动调用
  `const { execute } = useFetch(url, { immediate: false }) execute()`

 1. 请求拦截，响应拦截 
 ```js
const { data } = useFetch(url, {
  async beforeFetch({ url, options, cancel }) {
    const myToken = await getMyToken()
    if (!myToken)
      cancel()
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${myToken}`,
    }
    return {
      options,
    }
  },
})

// 响应拦截
const { data } = useFetch(url, {
  afterFetch(ctx) {
    if (ctx.data.title === 'HxH')
      ctx.data.title = 'Hunter x Hunter' // Modifies the response data
    return ctx
  },
})
```

3. 发布订阅响应
  ```js
  const { onFetchResponse, onFetchError } = useFetch(url)

  onFetchResponse((response) => {
      console.log(response.status)
  })

  onFetchError((error) => {
    console.error(error.message)
  })
  ```




