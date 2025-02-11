import { PageParams, PageResult } from '@/types/global'
import { BannerItem, CategoryItem, GuessItem, HotItem } from '@/types/home'
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

/**
 * 首页-前台分类
 * @returns
 */
export const getHomeCategoryApi = () => {
  return http<CategoryItem[]>({
    url: '/home/category/mutli',
    method: 'GET',
  })
}

/**
 * 首页-热门推荐
 * @returns
 */
export const getHomeHotApi = () => {
  return http<HotItem[]>({
    url: '/home/hot/mutli',
    method: 'GET',
  })
}

/**
 * 首页-猜你喜欢
 * @returns
 */
export const getHomeGoodsGuessLikeApi = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    url: '/home/goods/guessLike',
    method: 'GET',
    data,
  })
}
