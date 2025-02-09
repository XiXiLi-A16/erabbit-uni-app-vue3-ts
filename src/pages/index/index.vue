<script setup lang="ts">
import { getHomeBannerApi, getHomeCategoryApi } from '@/services/home'
import CustomNavbar from './components/CustomNavbar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CategoryPanel from './components/CategoryPanel.vue'

// 获取首页轮播图数据
const bannerList = ref([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  bannerList.value = res.result
  console.log(bannerList.value)
}

// 获取前台分类数据
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryApi()
  // categoryList.value = res.result
}
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
})
</script>

<template>
  <CustomNavbar />
  <XtxSwiper :list="bannerList" />
  <CategoryPanel />
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
