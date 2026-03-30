import React from 'react'
import BannerCard from '@/components/cards/BannerCard'

const AboutBanner = () => {
  return (
    <BannerCard
      backgroundImage="/assets/pngs/banner-images/about-banner-img.png"
      heading="BUILT BY OPERATORS. DESIGNED FOR GROWTH."
      description="Hospyra Was Created To Solve The Fragmentation In Hospitality Execution. We Believe Restaurants Deserve One Accountable Partner Not A Dozen Disconnected Vendors."
      topLabel="ABOUT HOSPYRA"
      primaryButton={{
        text: 'Talk to Hospyra',
        href: '/contact',
      }}
      secondaryButton={{
        text: 'Book a Strategy Call',
        href: '/contact',
      }}
    />
  )
}

export default AboutBanner