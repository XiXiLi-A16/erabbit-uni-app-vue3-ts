import { http } from '@/utils/https'
import { CategoryTopItem } from '@/types/category'
/**
 * 分类列表-小程序
 */
export const getCategoryTopApi = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
