import type { LucideIcon } from 'lucide-react';
import { DollarSign, ShoppingCart, Users, Percent } from 'lucide-react';

export type KeyMetricItem = {
  title: string;
  value: string;
  icon: LucideIcon;
  iconClassName: string;
  iconSize?: number;
  footerText?: string;
  footerTone?: 'positive' | 'neutral';
};

export type StatusRowItem = {
  label: string;
  count?: number;
  rowClassName: string;
  badgeClassName?: string;
  alertBorderClassName?: string;
};

export const keyMetricsData: KeyMetricItem[] = [
  {
    title: 'Daily Revenue',
    value: '$3,247',
    icon: DollarSign,
    iconClassName: 'text-[#2563EB]',
    iconSize: 24,
    footerText: '+12.5% vs yesterday',
    footerTone: 'positive',
  },
  {
    title: 'Monthly Revenue',
    value: '$89,450',
    icon: DollarSign,
    iconClassName: 'text-[#16A34A]',
    iconSize: 24,
  },
  {
    title: 'Avg Ticket Size',
    value: '$23.50',
    icon: ShoppingCart,
    iconClassName: 'text-[#9333EA]',
    iconSize: 24,
    footerText: '+$2.30',
    footerTone: 'positive',
  },
  {
    title: 'Total Customers Today',
    value: '138',
    icon: Users,
    iconClassName: 'text-[#EA580C]',
    iconSize: 24,
    footerText: '+18 vs yesterday',
    footerTone: 'positive',
  },
  {
    title: 'Food Cost %',
    value: '32%',
    icon: Percent,
    iconClassName: 'text-[#2563EB]',
    iconSize: 24,
    footerText: 'Target: 30%',
    footerTone: 'neutral',
  },
  {
    title: 'Labor Cost %',
    value: '28%',
    icon: Percent,
    iconClassName: 'text-[#CA8A04]',
    iconSize: 24,
    footerText: 'Target: 25%',
    footerTone: 'neutral',
  },
];

export const activeOrdersData: StatusRowItem[] = [
  {
    label: 'In Progress',
    count: 12,
    rowClassName: 'bg-[#EEF3FA]',
    badgeClassName: 'bg-[#2563EB] text-white',
  },
  {
    label: 'Delayed',
    count: 3,
    rowClassName: 'bg-[#F7EEF1]',
    badgeClassName: 'bg-[#EA0000] text-white',
  },
  {
    label: 'Delivered',
    count: 5,
    rowClassName: 'bg-[#EEF8F2]',
    badgeClassName: 'bg-[#15B34A] text-white',
  },
];

export const openRequestsData: StatusRowItem[] = [
  {
    label: 'Active',
    count: 6,
    rowClassName: 'bg-[#EEF2F7]',
    badgeClassName: 'bg-[#475569] text-white',
  },
  {
    label: 'Urgent',
    count: 2,
    rowClassName: 'bg-[#F7F2EC]',
    badgeClassName: 'bg-[#FF5A00] text-white',
  },
  {
    label: 'Pending Approval',
    count: 1,
    rowClassName: 'bg-[#F9F8EE]',
    badgeClassName: 'bg-[#D79C00] text-white',
  },
];

export const alertsData: StatusRowItem[] = [
  {
    label: 'Low inventory: Chicken',
    rowClassName: 'bg-[#F8EEF0]',
    alertBorderClassName: 'border-l-4 border-l-[#FF4D4F]',
  },
  {
    label: 'Labor over target',
    rowClassName: 'bg-[#F7F2EC]',
    alertBorderClassName: 'border-l-4 border-l-[#FF8A00]',
  },
  {
    label: 'Slow service flagged',
    rowClassName: 'bg-[#F8F7EA]',
    alertBorderClassName: 'border-l-4 border-l-[#DAB000]',
  },
];
