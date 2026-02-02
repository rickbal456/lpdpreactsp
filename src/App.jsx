import { useEffect, useState } from 'react'
import shopeeData from '../json/deeplink-shopee-react.json'
import tiktokData from '../json/deeplink-tiktok.json'
import lazadaData from '../json/deeplink-lazada.json'
import travelokaData from '../json/deeplink-traveloka.json'
import shopeefoodData from '../json/deeplink-shopeefood.json'
import redirectConfig from '../json/pengaturan-redirect.json'

function App() {
  const [redirecting, setRedirecting] = useState(true)

  // Function to get URL parameter
  const getURLParameter = (name) => {
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      if (pair[0] === name) {
        return decodeURIComponent(pair[1])
      }
    }
    return ''
  }

  // Shopee URLs - mengambil dari JSON file (format reactPath)
  const getShopeeUrls = () => {
    return shopeeData['shopee-deeplink'] || []
  }

  // TikTok URLs - mengambil dari JSON file
  const getTiktokUrls = () => {
    return tiktokData['tiktok-deeplink'] || []
  }

  // Lazada URLs - mengambil dari JSON file
  const getLazadaUrls = () => {
    return lazadaData['lazada-deeplink'] || []
  }

  // Traveloka URLs - mengambil dari JSON file
  const getTravelokaUrls = () => {
    return travelokaData['traveloka-deeplink'] || []
  }

  // ShopeeFood URLs - mengambil dari JSON file
  const getShopeefoodUrls = () => {
    return shopeefoodData['shopeefood-deeplink'] || []
  }

  useEffect(() => {
    // Function to redirect to random URL from array
    const redirectToRandomUrl = (urls, delay) => {
      if (urls.length === 0) return
      setTimeout(() => {
        const random = Math.floor(Math.random() * urls.length)
        window.location.href = urls[random]
      }, delay)
    }

    // Shopee redirect - cek pengaturan dulu
    if (redirectConfig.shopee.enabled) {
      const shopeeUrls = getShopeeUrls()
      redirectToRandomUrl(shopeeUrls, redirectConfig.shopee.delay)
    }

    // TikTok redirect - cek pengaturan dulu
    if (redirectConfig.tiktok.enabled) {
      const tiktokUrls = getTiktokUrls()
      redirectToRandomUrl(tiktokUrls, redirectConfig.tiktok.delay)
    }

    // Lazada redirect - cek pengaturan dulu
    if (redirectConfig.lazada.enabled) {
      const lazadaUrls = getLazadaUrls()
      redirectToRandomUrl(lazadaUrls, redirectConfig.lazada.delay)
    }

    // Traveloka redirect - cek pengaturan dulu
    if (redirectConfig.traveloka.enabled) {
      const travelokaUrls = getTravelokaUrls()
      redirectToRandomUrl(travelokaUrls, redirectConfig.traveloka.delay)
    }

    // ShopeeFood redirect - cek pengaturan dulu
    if (redirectConfig.shopeefood.enabled) {
      const shopeefoodUrls = getShopeefoodUrls()
      redirectToRandomUrl(shopeefoodUrls, redirectConfig.shopeefood.delay)
    }

  }, [])

  return (
    <div className="loading-container">
      <div className="loading-text">PLEASE WAIT</div>
      <div className="loading-spinner"></div>
    </div>
  )
}

export default App
