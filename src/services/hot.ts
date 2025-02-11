import { http } from '@/utils/https'
import type { PageParams } from '@/types/global'
import { HotResult } from '@/types/hot'

/**
 * 通用热门推荐类型
 * @param url 请求地址
 * @param data 请求参数
 */
type HotParams = PageParams & { subType?: string }
export const getHotRecommendApi = (url: string, data?: HotParams) => {
  return http<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
