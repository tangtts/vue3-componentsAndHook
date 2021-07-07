import { createStore } from 'vuex'
const WIDTH = 992;


// 手动声明 state 类型
export interface State {
	isCollapse:boolean // 控制侧边导航栏
	isMobile:boolean// 是否是手机
}

// 定义注入类型
const store = createStore<State>({
	state() {
		return {
			isCollapse:false,
			isMobile:false
		}
	},
	mutations: {
		toggleCollapse(state: State) {
			
			state.isCollapse= !state.isCollapse;
		},
		setCollapseOpen(state: State){
			state.isCollapse =false
		},
		checkedIsMobile(state: State,payload:number){
			state.isMobile = WIDTH-payload>0
		}
	}
})



export default store
