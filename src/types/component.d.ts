// 全局组件的类型声明
import XtxSwiper from './XtxSwiper.vue'
import XtxGuess from './XtxGuess.vue'
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}
