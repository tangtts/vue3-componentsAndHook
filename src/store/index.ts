import { createStore } from 'vuex'

// 手动声明 state 类型
export interface State {
	count2: number
}

// 定义注入类型
const store = createStore<State>({
	state() {
		return {
			count2: 0
		}
	},
	mutations: {
		increment(state: State) {
			state.count2++
		}
	}
})



export default store
