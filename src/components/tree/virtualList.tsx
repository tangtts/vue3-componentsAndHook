import { computed, defineComponent, onMounted, reactive, ref, watch, h } from "vue"
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

    // 可以预留的条数
    const prev = computed(() => {
      return Math.min(state.start, props.remain)
    });

    const next = computed(() => {
      return Math.min(props.items.length - state.end, props.remain)
    });



    let data = computed(() => {
      const start = state.start - prev.value;
      const end = state.end + next.value;
      return props.items.slice(start, end)
    })
    function handleScroll() {
      state.start = Math.floor(wrapper.value!.scrollTop / props.size);
      state.end = state.start + props.remain;
      state.offset = state.start * props.size - prev.value * props.size;
    }
    watch(() => props.items, () => {
      // scrollBar.value!.style.height = props.items.length * props.size + 'px';
    })
    onMounted(() => {
      // scrollBar.value!.style.height = props.items.length * props.size + 'px';
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
            transform: `translateY(${state.offset}px)`
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