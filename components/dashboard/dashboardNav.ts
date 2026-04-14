import type { LucideIcon } from 'lucide-react';
import {
  LayoutGrid,
  TrendingUp,
  Utensils,
  Package,
  Users,
  ShoppingCart,
  ClipboardList,
  Megaphone,
  DollarSign,
  Brain,
  Building2,
  MessageSquare,
  FileText,
  Settings,
} from 'lucide-react';

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const DASHBOARD_NAV: DashboardNavItem[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutGrid },
  { href: '/dashboard/performance', label: 'Performance', icon: TrendingUp },
  { href: '/dashboard/menu', label: 'Menu Management', icon: Utensils },
  { href: '/dashboard/inventory', label: 'Inventory', icon: Package },
  { href: '/dashboard/staffing', label: 'Staffing', icon: Users },
  { href: '/dashboard/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/dashboard/requests', label: 'Requests', icon: ClipboardList },
  { href: '/dashboard/marketing', label: 'Marketing', icon: Megaphone },
  { href: '/dashboard/financials', label: 'Financials', icon: DollarSign },
  { href: '/dashboard/intelligence', label: 'Hosperra Intelligence', icon: Brain },
  { href: '/dashboard/business-profile', label: 'Business Profile', icon: Building2 },
  { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
  { href: '/dashboard/documents', label: 'Documents', icon: FileText },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function dashboardPathMatches(pathname: string, href: string): boolean {
  if (href === '/dashboard') {
    return pathname === '/dashboard' || pathname === '/dashboard/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function dashboardNavLabel(pathname: string): string {
  const byLength = [...DASHBOARD_NAV].sort((a, b) => b.href.length - a.href.length);
  return byLength.find((n) => dashboardPathMatches(pathname, n.href))?.label ?? 'Dashboard';
}

/** One welcome line per area — keyed by the same `href`s as `DASHBOARD_NAV`. */
const DASHBOARD_WELCOME: Record<string, string> = {
  '/dashboard': 'Welcome back, Olivia',
  '/dashboard/performance': 'Detailed breakdown of your business score',
  '/dashboard/menu': 'Full control of menu items and profitability',
  '/dashboard/inventory': 'Track supply levels and optimize ordering',
  '/dashboard/staffing': 'Manage your workforce and schedules',
  '/dashboard/orders': 'Track all purchases and deliveries',
  '/dashboard/requests': 'Submit and track all your business needs',
  '/dashboard/marketing': 'Track your online presence and campaigns',
  '/dashboard/financials': 'Complete financial overview and analysis',
  '/dashboard/intelligence': 'AI-powered insights and recommendations',
  '/dashboard/business-profile': 'Complete your profile to unlock stronger insights, better support, and more accurate recommendations.',
  '/dashboard/messages': 'Communication hub for all your needs',
  '/dashboard/documents': 'All your files in one place',
  '/dashboard/settings': 'Manage your business information and preferences',
};

export function dashboardWelcomeMessage(pathname: string): string {
  const byLength = [...DASHBOARD_NAV].sort((a, b) => b.href.length - a.href.length);
  const match = byLength.find((n) => dashboardPathMatches(pathname, n.href));
  if (!match) return `Welcome back, `;
  return DASHBOARD_WELCOME[match.href] ?? `Welcome back, `;
}
