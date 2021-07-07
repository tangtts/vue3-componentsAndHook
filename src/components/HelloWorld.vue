<template>
  <h1>{{ msg }}</h1>
  <h1>{{ count2 }}</h1>
  <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  <p>
    <svg-icon iconClass="bug" style="fontsize: 40px" />
    <el-button @click="add" type="primary">dainji</el-button>
  </p>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

import { useStore } from "vuex";
import { State } from "../store";
import { login } from "../utils/api";
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const store = useStore<State>();

    const { count2 } = store.state;
    const count = ref(0);
    function add() {
      login({ username: "18623806693", password: "654321" }).then((res) => {
        console.log(res);
      });
    }
    return { count, count2, add };
  },
});
</script>

<style scoped lang="scss">
a {
  color: red;
}
</style>
