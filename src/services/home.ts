import { BannerItem } from '@/types/home'
import { http } from '@/utils/https'

/**
 *
 * @param distributionSite 广告区域展示位置 1为首页（默认值） 2为商品分类页
 * @returns
 */
export const getHomeBannerApi = (distributionSite = 1) => {
  return http<BannerItem[]>({
    url: '/home/banner',
    method: 'GET',
    data: {
      distributionSite,
    },
  })
}
