// src/services/login.ts
import type { LoginResult } from '@/types/member'
import { http } from '@/utils/https'

type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}

/**
 * 发送微信小程序登录请求
 * @param {LoginParams} data - 登录参数
 * @returns {Promise<LoginResult>} - 登录结果
 */
export const postLoginWxMinApi = (data: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

/**
 * 发起微信小程序模拟登录请求
 * @param {string} phoneNumber - 模拟用户手机号码
 * @returns {Promise<LoginResult>} - 登录结果
 */
export const postLoginWxMinSimpleApi = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
