import type { ProfileDetail } from '@/types/member'
import { http } from '@/utils/https'

/**
 * 获取个人信息
 */
export const getMemberProfileApi = () => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}
