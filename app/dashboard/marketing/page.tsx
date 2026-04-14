'use client';

import { useState } from 'react';
import {
  Globe,
  Instagram,
  Music2,
  Plus,
  Sparkles,
  Star,
  TrendingUp,
  TriangleAlert,
} from 'lucide-react';
import GlobalButton from '@/components/buttons/GlobalButton';
import SummaryStatCard from '@/components/dashboard/SummaryStatCard';
import LaunchCampaignModal from '@/components/dashboard/modals/LaunchCampaignModal';

type MarketingStat = {
  label: string;
  value: string;
  footer: string;
};

type PlatformCard = {
  id: string;
  name: string;
  badge: string;
  badgeClassName: string;
  metricLabel: string;
  metricValue: string;
  metricDelta?: string;
  postsLabel: string;
  postsValue: string;
  icon: typeof Instagram;
};

const marketingStats: MarketingStat[] = [
  { label: 'Total Followers', value: '20.7K', footer: '+11.2%' },
  { label: 'Avg Engagement', value: '5.5%', footer: '+0.8%' },
  { label: 'Monthly Reach', value: '56.5K', footer: '+18%' },
  { label: 'Avg Response Time', value: '4.5 ★', footer: '+0.2' },
];

const marketingInsights = [
  {
    id: '1',
    text: 'Instagram posting frequency below target (2x/week vs. 3x/week goal)',
    className: 'bg-[#FEFCE8]',
    iconClassName: 'text-[#D08700]',
  },
  {
    id: '2',
    text: 'Strong review growth: +24 reviews this month (18% increase)',
    className: 'bg-[#ECFDF3]',
    iconClassName: 'text-[#00A63E]',
  },
  {
    id: '3',
    text: 'TikTok engagement 62% above industry average',
    className: 'bg-[#EFF6FF]',
    iconClassName: 'text-[#155DFC]',
  },
] as const;

const platformCards: PlatformCard[] = [
  {
    id: '1',
    name: 'Instagram',
    badge: 'Good',
    badgeClassName: 'bg-[#1D4ED8] text-white',
    metricLabel: 'Followers',
    metricValue: '12,500',
    metricDelta: '+8.5%',
    postsLabel: 'Total Posts/Reviews',
    postsValue: '156',
    icon: Instagram,
  },
  {
    id: '2',
    name: 'TikTok',
    badge: 'Excellent',
    badgeClassName: 'bg-[#10B981] text-white',
    metricLabel: 'Followers',
    metricValue: '8,200',
    metricDelta: '+15.2%',
    postsLabel: 'Total Posts/Reviews',
    postsValue: '89',
    icon: Music2,
  },
  {
    id: '3',
    name: 'Google Business',
    badge: 'Good',
    badgeClassName: 'bg-[#1D4ED8] text-white',
    metricLabel: 'Engagement/Rating',
    metricValue: '4.6 ★',
    postsLabel: 'Total Posts/Reviews',
    postsValue: '245',
    icon: Globe,
  },
  {
    id: '4',
    name: 'Yelp',
    badge: 'Good',
    badgeClassName: 'bg-[#1D4ED8] text-white',
    metricLabel: 'Engagement/Rating',
    metricValue: '4.3 ★',
    postsLabel: 'Total Posts/Reviews',
    postsValue: '189',
    icon: Star,
  },
];

const campaigns = [
  {
    id: '1',
    title: 'Summer Happy Hour',
    platform: 'Instagram',
    status: 'Active',
    statusClassName: 'bg-[#10B981] text-white',
    reach: '15,400',
    engagement: '650',
    conversions: '42',
    budget: '$500',
    spent: '$320',
  },
  {
    id: '2',
    title: 'Weekend Brunch Special',
    platform: 'Facebook',
    status: 'Active',
    statusClassName: 'bg-[#10B981] text-white',
    reach: '12,200',
    engagement: '520',
    conversions: '38',
    budget: '$400',
    spent: '$280',
  },
  {
    id: '3',
    title: 'New Menu Launch',
    platform: 'TikTok',
    status: 'Completed',
    statusClassName: 'bg-[#E5E7EB] text-[#27272A]',
    reach: '28,900',
    engagement: '1850',
    conversions: '94',
    budget: '$800',
    spent: '$800',
  },
] as const;

const MarketingPage = () => {
  const [isLaunchOpen, setIsLaunchOpen] = useState(false);

  return (
    <section>
      <div className="flex flex-wrap items-center justify-end gap-3">
        <GlobalButton
          title="Launch Campaign"
          bgColor="#020617"
          color="white"
          borderRadius="8px"
          height="40px"
          className="font-effra px-3"
          onClick={() => setIsLaunchOpen(true)}
        />
      </div>

      <div className="mt-5 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {marketingStats.map((stat) => (
          <SummaryStatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            footerText={stat.footer}
            footerIcon={<TrendingUp size={12} />}
          />
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-[#EEDFDB] p-4">
        <h3 className="text-xl font-semibold text-[#18181B] font-effra">Marketing Insights</h3>
        <div className="mt-4 space-y-3">
          {marketingInsights.map((item) => (
            <div key={item.id} className={`rounded-lg p-5 ${item.className}`}>
              <p className="flex items-center gap-2 text-sm text-[#27272A] font-effra">
                <TriangleAlert size={20} className={item.iconClassName} />
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 min-[419px]:grid-cols-2 xl:grid-cols-4">
        {platformCards.map((item) => (
          <div key={item.id} className="rounded-xl border border-[#EEDFDB] p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xl font-semibold text-[#18181B] font-effra">{item.name}</p>
              <item.icon size={18} className="text-[#4A3CF0]" />
            </div>
            <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold font-effra ${item.badgeClassName}`}>
              {item.badge}
            </span>
            <p className="mt-3 text-sm text-[#52525B] font-effra">{item.metricLabel}</p>
            <p className="text-xl mt-2 leading-none font-semibold text-[#18181B] font-effra">{item.metricValue}</p>
            {item.metricDelta ? (
              <p className="mt-1 text-sm text-[#16A34A] font-effra">{item.metricDelta}</p>
            ) : null}
            <p className="mt-2 text-sm text-[#52525B] font-effra">{item.postsLabel}</p>
            <p className="text-xl mt-2 leading-none font-semibold text-[#18181B] font-effra">{item.postsValue}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-[#EEDFDB] p-4">
        <h3 className="text-xl font-semibold text-[#18181B] font-effra">Campaigns</h3>
        <div className="mt-4 space-y-3">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="rounded-xl bg-[#F9FAFB] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold text-[#18181B] font-effra">{campaign.title}</p>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold font-effra ${campaign.statusClassName}`}>
                      {campaign.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#52525B] font-effra">{campaign.platform}</p>
                </div>
                <GlobalButton
                  title="View Details"
                  borderRadius="8px"
                  height="34px"
                  borderWidth="1px"
                  borderColor="#E5E7EB"
                  bgColor="#FFFFFF"
                  color="#111827"
                  className="font-effra whitespace-nowrap px-3 text-xs"
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-5">
                <div>
                  <p className="text-xs text-[#52525B] font-effra">Reach</p>
                  <p className="text-xl leading-none font-semibold text-[#18181B] font-effra">{campaign.reach}</p>
                </div>
                <div>
                  <p className="text-xs text-[#52525B] font-effra">Engagement</p>
                  <p className="text-xl leading-none font-semibold text-[#18181B] font-effra">{campaign.engagement}</p>
                </div>
                <div>
                  <p className="text-xs text-[#52525B] font-effra">Conversions</p>
                  <p className="text-xl leading-none font-semibold text-[#18181B] font-effra">{campaign.conversions}</p>
                </div>
                <div>
                  <p className="text-xs text-[#52525B] font-effra">Budget</p>
                  <p className="text-xl leading-none font-semibold text-[#18181B] font-effra">{campaign.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-[#52525B] font-effra">Spent</p>
                  <p className="text-xl leading-none font-semibold text-[#18181B] font-effra">{campaign.spent}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LaunchCampaignModal open={isLaunchOpen} onOpenChange={setIsLaunchOpen} />
    </section>
  );
};

export default MarketingPage;
