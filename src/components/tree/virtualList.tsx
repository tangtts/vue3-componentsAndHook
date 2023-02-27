import { computed, defineComponent, onMounted, reactive, ref } from "vue"
export default defineComponent({
  name: 'VirtualList',
  props: {
    size: {
      type: Number,
      default: 0
    },
    remain: {
      type: Number,
      default: 8
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { slots }) {
    const wrapper = ref<HTMLElement>();
    const scrollBar = ref<HTMLElement>();
    let state = reactive({
      start: 0,
      end: props.remain,
      offset: 0
    });
    let data = computed(() => {
      return props.items.slice(state.start, state.end)
    })
    function handleScroll() {
      state.start = Math.floor( wrapper.value!.scrollTop / props.size);
      state.end = state.start + props.remain;
      state.offset = state.start * props.size;
      console.log(data.value)
    }
    onMounted(() => {
      scrollBar.value!.style.height = props.items.length * props.size + 'px';
      wrapper.value!.style.height = props.remain * props.size + 'px';
    })
    return () => {
      return (<div style={{
        overflowY: 'scroll',
        position: 'relative'
      }} ref={wrapper} onScroll={handleScroll}>
        <div
          style={{
            position: "absolute",
            width: "10px",
            right: "0",
            backgroundColor: "red"
          }}
          ref={scrollBar}></div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            width: "100%",
            transform:`translateY(${state.offset}px)`
          }}
        >
          {data.value.map(node => {
            return slots.default!({ node })
          })}
        </div>
      </div>
      )
    }
  }
})