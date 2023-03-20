<template>
  <div>
    {{ data }}
    <button @click="executeClick">execute</button>
  </div>
</template>
<script lang="ts" setup>
import useFetch from "./index";

import { onMounted, ref, computed, reactive, watch, useAttrs } from "vue";

// await 有点问题
const url = "/src/a.json";

// async function fetch() {
//   // let f = await a()
//   const r = await useFetch(url)

//   console.log(r)
// }
// fetch()
const data = ref(123)

function a() {
  const { data: a, onFetchResponse } = useFetch(url, {
    async beforeFetch({ url, options, cancel }) {
      const myToken = "ccc"

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
  onFetchResponse((response) => {
    // response.json().then(res => {
    //   console.log(res)
    // })
  })
}

function after() {
  const { data } = useFetch(url, {
    afterFetch(ctx) {
      console.log(ctx, "ctxxxxx")
      if (ctx.data.title === 'HxH')
        ctx.data.title = 'Hunter x Hunter' // Modifies the response data

      return ctx
    },
  })


}

function error() {
  const { data } = useFetch(url, {
    onFetchError(ctx) {
      // ctx.data can be null when 5xx response
      if (ctx.data === null)
        ctx.data = { title: 'Hunter x Hunter' } // Modifies the response data

      ctx.error = new Error('Custom Error') // Modifies the error

      return ctx
    },
  })
  console.log(data.value, "error")
}


setTimeout(() => {
  const { isFetching, error, data } = useFetch(url)
  const { execute, abort } = useFetch(url, { immediate: false })

  execute()
  // abort()
  //  onFetchResponse()
})



const executeClick = () => {
  // execute()
  const { data } = useFetch(url).get().json();
  console.log(data.value)
  a()
  after()
  error()
}


</script>

<style lang="scss" scoped></style>
