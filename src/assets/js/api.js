import mihoyo from '@/assets/data/mihoyo.json'
import headerLinks from '@/assets/data/headerlinks.json'
import bannerInfo from '@/assets/data/bannerinfo.json'

export function getMihoyoData() {
  return { value: mihoyo }
}

export function getHeaderLinks() {
  return headerLinks
}

export function getBannerInfo() {
  return bannerInfo
}