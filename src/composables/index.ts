import { XtxGuessInstance } from '@/types/component'
import { ref } from 'vue'

/**
 * 猜你喜欢 组合式函数
 * @returns
 */
export const useGuessList = () => {
  // 获取猜你喜欢组件实例
  const guessRef = ref<XtxGuessInstance>()

  // 滚动到底部加载更多
  const onScrolltolower = () => {
    guessRef.value.getMore()
  }
  // 返回ref和事件处理函数
  return {
    guessRef,
    onScrolltolower,
  }
}
