<script setup lang="ts">
import { getMemberProfileApi, putMemberProfileApi } from '@/services/profile'
import { useMemberStore } from '@/stores'
import { Gender, ProfileDetail } from '@/types/member'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getWindowInfo()

// 获取用户信息
const profile = ref<ProfileDetail>({} as ProfileDetail)
const getMemberProfileData = async () => {
  const res = await getMemberProfileApi()
  profile.value = res.result
}
onLoad(() => {
  getMemberProfileData()
})

const onAvatarChange = () => {
  // 调用拍照/选择图片api
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (res) => {
      console.log(res)
      const { tempFilePath } = res.tempFiles[0]
      uploadAvatar(tempFilePath)
    },
  })
}

const memberStore = useMemberStore()
const onChooseAvatar: UniHelper.ButtonOnChooseavatar = (e) => {
  console.log(e)
  const { avatarUrl } = e.detail
  // uploadAvatar(avatarUrl)
  // 伪装实现，没有上传服务器
  profile.value!.avatar = avatarUrl
  uni.showToast({ title: '头像修改成功', icon: 'success' })
  memberStore.profile.avatar = avatarUrl
}

// 文件上传，写法正确，黑马的接口挂了
const uploadAvatar = (tempUrl: string) => {
  uni.uploadFile({
    url: '/member/profile/avatar',
    name: 'file',
    filePath: tempUrl,
    success: (res) => {
      if (res.statusCode === 200) {
        const avatar = JSON.parse(res.data).result.avatar
        profile.value!.avatar = avatar
        uni.showToast({ title: '头像修改成功', icon: 'success' })
      } else {
        uni.showToast({ title: '出现错误', icon: 'error' })
      }
    },
  })
}

// 点击保存提交表单
const onSubmit = async () => {
  const res = await putMemberProfileApi({
    nickname: profile.value?.nickname,
    gender: profile.value?.gender,
    birthday: profile.value?.birthday,
    profession: profile.value?.profession,
    provinceCode: fullLocationCode[0],
    cityCode: fullLocationCode[1],
    countyCode: fullLocationCode[2],
  })
  memberStore.profile.nickname = profile.value?.nickname
  uni.navigateBack()
  uni.showToast({ title: '修改成功', icon: 'success' })
}

// 修改性别
const onGenderChange: UniHelper.RadioGroupOnChange = (e) => {
  profile.value.gender = e.detail.value as Gender
}

// 修改生日
const onBirthdayChange: UniHelper.DatePickerOnChange = (e) => {
  profile.value.birthday = e.detail.value
}

// 修改城市
let fullLocationCode: [string, string, string] = ['', '', '']
const onFulllocationChange: UniHelper.RegionPickerOnChange = (e) => {
  profile.value.fullLocation = e.detail.value.join(' ')
  // 提交后端更新
  fullLocationCode = e.detail.code
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <!-- 这里换成使用微信小程序的头像组件 -->
    <view class="avatar">
      <view class="avatar-content">
        <button
          style="background-color: #fff0; border: none; padding: 0; margin: 0"
          class="avatar-wrapper"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <view class="avatar-content">
            <image class="image" :src="profile.avatar" mode="aspectFill" />
            <text class="text">点击修改头像</text>
          </view>
        </button>
      </view>
    </view>
    <!-- 头像 -->
    <!-- <view class="avatar" @tap="onAvatarChange">
      <view class="avatar-content">
        <image class="image" :src="profile.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view> -->
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profile.account }}</text>
        </view>
        <!-- <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" :value="profile?.nickname" />
        </view> -->
        <!-- 替换为微信小程序提供的昵称接口 -->
        <view class="form-item">
          <text class="label">昵称</text>
          <input
            class="weui-input"
            type="nickname"
            placeholder="请填写昵称"
            v-model="profile.nickname"
          />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderChange">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="profile?.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profile?.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="profile?.birthday"
            @change="onBirthdayChange"
          >
            <view v-if="profile?.birthday">{{ profile?.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            @change="onFulllocationChange"
            class="picker"
            mode="region"
            :value="profile?.fullLocation?.split(' ')"
          >
            <view v-if="profile?.fullLocation">{{ profile?.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input class="input" type="text" placeholder="请填写职业" v-model="profile.profession" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button @tap="onSubmit" class="form-button">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
