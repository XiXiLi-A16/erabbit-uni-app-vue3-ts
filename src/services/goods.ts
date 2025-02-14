import { GoodsResult } from '@/types/goods'
import { http } from '@/utils/https'

/**
 * 根据商品ID获取商品信息
 * @param {string} id - 商品ID
 * @returns {Promise<GoodsResult>} - 返回商品信息
 */
export const getGoodsByIdApi = (id: string) => {
  // 发送GET请求，获取商品信息
  return http<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: { id },
  })
}
