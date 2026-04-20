'use client';

import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlobalButton from '../buttons/GlobalButton';
import RightImg from "@/public/assets/pngs/banner-images/home-banner-img.png";

const HomeBanner = () => {
  const router = useRouter();
  return (
    <div className='grid grid-cols-2 max-[1000px]:grid-cols-1 py-16 max-[1000px]:py-10 px-[4%] max-[1200px]:gap-6 bg-linear-to-b from-[#F8F7F7] to-[#FFF7F5]'>
      <div className='my-auto space-y-3 max-[1000px]:order-1'>
        <p>Designed by operators, for operators.</p>
        <p className='text-[46px] max-[1200px]:text-[36px] max-[640px]:text-[28px] font-semibold leading-16 max-[1200px]:leading-12 max-[640px]:leading-10'>Complete System Designed To Run Your Entire Business Through One Platform</p>
        <p className='text-lg'>Hosperra combines expertise, a strong supplier network, and technology with dedicated support. We improve your product, elevate customer experience, increase revenue, and reduce costs while keeping operations structured.</p>
        <p className='text-[#FF3500] text-lg'>Pay $0 Signup Fee (Limited Time — $499 Value)</p>
        <div className='flex max-[550px]:flex-col gap-4 mt-4 sm:mt-8'>
          <GlobalButton title='Join Now' className='px-6' borderRadius='8px' height='45px' bgColor='#1E50C1' color='white' />
          <div onClick={() => router.push('/dashboard')} className='underline flex cursor-pointer font-medium items-center max-[550px]:justify-center gap-2'>
            Book a Demo <ArrowRight size={20} />
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <div className="relative w-[90%] max-[1200px]:w-full">
          <Image
            src={RightImg}
            alt=""
            // fill
            className="rounded-[24px] w-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-19 cursor-pointer h-10 rounded-full flex items-center justify-center shadow-md">
            <Play fill="#1E50C1" stroke="#1E50C1" size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner
