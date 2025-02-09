<script setup lang="ts">
import { getHomeBannerApi } from '@/services/home'
import CustomNavbar from './components/CustomNavbar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const bannerList = ref([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  bannerList.value = res.result
  console.log(bannerList.value)
}

onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <CustomNavbar />
  <XtxSwiper :list="bannerList" />
</template>

<style lang="scss"></style>
