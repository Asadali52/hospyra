'use client'

import { useState } from 'react'
import Image from 'next/image'
import BackgroundImg from '@/public/assets/pngs/why-join-hospyra-bg.png'
import { useJoinHospyraModal } from '@/contexts/JoinHospyraModalContext'

const tabs = ['Business', 'Vendors', 'Partners', 'Ambassador'] as const

type Tab = (typeof tabs)[number]

const cardsByTab: Record<Tab, { image: string; text: string }[]> = {
  Business: [
    { image: '/assets/pngs/join-hosperra-1.png', text: 'Strong, Competitive Pricing Across All Categories' },
    { image: '/assets/pngs/join-hosperra-2.png', text: 'Access To Experienced Teams Across Operations, Supply, And Services' },
    { image: '/assets/pngs/join-hosperra-3.png', text: 'Culinary Support To Build Stronger Menus And Improve Food Quality' },
    { image: '/assets/pngs/join-hosperra-4.png', text: 'Marketing Support To Increase Traffic And Grow Revenue' },
    { image: '/assets/pngs/join-hosperra-5.png', text: 'Structured System To Manage Everything In One Place' },
    { image: '/assets/pngs/join-hosperra-6.png', text: 'Dedicated Team Managing Execution And Coordination' },
    { image: '/assets/pngs/join-hosperra-7.png', text: 'AI-Driven Insights Across Costs, Menu, Operations, And Performance' },
    { image: '/assets/pngs/join-hosperra-8.png', text: 'Continuous Involvement To Improve Decision-Making And Direction' },
    { image: '/assets/pngs/join-hosperra-9.png', text: 'Scalable Support For Single Or Multi-Location Growth' },
  ],
  Vendors: [
    { image: '/assets/pngs/join-hosperra-1.png', text: 'Access A Growing Network Of Hospitality Businesses' },
    { image: '/assets/pngs/join-hosperra-2.png', text: 'Streamlined Orders And Coordinated Demand' },
    { image: '/assets/pngs/join-hosperra-5.png', text: 'One Platform To Manage Relationships And Deliveries' },
    { image: '/assets/pngs/join-hosperra-6.png', text: 'Dedicated Support For Vendor Onboarding And Integration' },
  ],
  Partners: [
    { image: '/assets/pngs/join-hosperra-2.png', text: 'Connect With Qualified Hospitality Clients' },
    { image: '/assets/pngs/join-hosperra-3.png', text: 'Direct Access To Culinary And Operations Projects' },
    { image: '/assets/pngs/join-hosperra-4.png', text: 'Marketing And Design Opportunities' },
    { image: '/assets/pngs/join-hosperra-6.png', text: 'Structured Projects With Clear Scope And Execution' },
  ],
  Ambassador: [
    { image: '/assets/pngs/join-hosperra-1.png', text: 'Introduce Businesses And Partners To The Platform' },
    { image: '/assets/pngs/join-hosperra-2.png', text: 'Build A Network Within Hospitality And Beyond' },
    { image: '/assets/pngs/join-hosperra-3.png', text: 'Earn Ongoing Passive Income' },
    { image: '/assets/pngs/join-hosperra-8.png', text: 'Be Part Of The Growth Of Hospitality And Many Other Industries' },
  ],
}

const WhyJoinHospyra = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Business')
  const { openModal } = useJoinHospyraModal()
  const cards = cardsByTab[activeTab]

  return (
    <div className="relative min-h-150 text-white lg:rounded-[70px] overflow-hidden">
      <Image
        src={BackgroundImg}
        alt="Why Join Hosperra background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="relative z-20 h-full py-10 lg:py-16">

        <div className="text-center px-[4%]">
          <h2 className="text-[46px] max-[1200px]:text-[36px] max-[640px]:text-[28px] font-bold font-effra">
            Why Join Hosperra
          </h2>
          <p className="mt-2 text-base md:text-lg text-white/95 font-effra">
            Built To Help You Operate Better, Grow Faster, And Stay In Control
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 min-[400px]:gap-6 md:gap-8 mt-8 border-b border-white/20 w-fit mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-medium font-effra pb-2 text-base md:text-lg relative top-px transition-colors ${activeTab === tab
                ? 'text-white border-b border-white'
                : 'text-[#949494] border-b border-transparent hover:text-white/80'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="md:grid flex overflow-auto hide-scrollbar grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-10 px-[4%]">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 bg-[#27272A]/90 overflow-hidden shrink-0 w-[320px] md:w-full"
            >
              <div className="relative h-22 rounded-xl overflow-clip">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <p className="p-4 font-semibold font-effra text-sm md:text-base text-white">
                {card.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 lg:mt-12 px-[4%]">
          <p className="text-lg md:text-xl font-effra mb-6">
            Start Transforming Your Business Today
          </p>
          <button
            type="button"
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#1E50C1] text-white font-medium font-effra hover:bg-[#1a45a8] transition-colors"
          >
            👉 Join Now Pay $0 Signup Fee (Limited Time $499 Value)
          </button>
        </div>
      </div>
    </div>
  )
}

export default WhyJoinHospyra
