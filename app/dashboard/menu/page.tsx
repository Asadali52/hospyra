'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, Plus, TrendingUp } from 'lucide-react';
import GlobalButton from '@/components/buttons/GlobalButton';
import MenuItemsTable from '@/components/dashboard/MenuItemsTable';
import AddMenuItemModal from '@/components/dashboard/AddMenuItemModal';
import { menuTableRowsData } from '@/components/dashboard/TablesStaticData';

const summaryCards = [
  { label: 'Total Menu Items', value: '12' },
  { label: 'Avg Margin', value: '63%' },
  { label: 'Best Seller', value: 'Craft Cocktail' },
  { label: 'Low Margin Items', value: '1' },
] as const;

const insights = [
  {
    title: 'Low Margin Alert',
    text: 'Wagyu Burger margin below 40%',
    className: 'bg-[#F8F5E7]',
    icon: AlertTriangle,
    iconClassName: 'text-[#D4A100]',
  },
  {
    title: 'Best Seller',
    text: 'Craft Cocktails driving 15% of revenue',
    className: 'bg-[#EAF8EE]',
    icon: TrendingUp,
    iconClassName: 'text-[#00A63E]',
  },
  {
    title: 'Underperforming',
    text: 'Lobster Bisque - low sales volume',
    className: 'bg-[#EEF3FA]',
    icon: AlertTriangle,
    iconClassName: 'text-[#2563EB]',
  },
] as const;

const tabs = ['All Items', 'Appetizers', 'Mains', 'Desserts', 'Drinks'] as const;

const MenuPage = () => {

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('All Items');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredRows = useMemo(() => {
    if (activeTab === 'All Items') return menuTableRowsData;
    return menuTableRowsData.filter((row) => row.category === activeTab);
  }, [activeTab]);

  return (
    <section>
      <div className="flex flex-wrap items-center justify-end gap-3">
        <GlobalButton
          title="Add Menu Item"
          bgColor="#020617"
          color="white"
          borderRadius="8px"
          height="40px"
          className="font-effra px-3"
          icon={<Plus size={16} />}
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      <div className="mt-5 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-2xl border bg-linear-to-b fron-[#F9F8F8] to-[#F8F2EF] border-[#EEDFDB] p-5">
            <p className="text-sm text-[#52525B] font-effra">{card.label}</p>
            <p className="mt-4 mb-2 text-3xl font-semibold text-[#0F172A] font-effra">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-[#EEDFDB] p-5">
        <h3 className="text-xl font-semibold text-[#18181B] font-effra">Menu Insights</h3>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {insights.map((insight) => (
            <div key={insight.title} className={`rounded-xl p-4 ${insight.className}`}>
              <p className="flex items-center gap-2 text-[#18181B] font-semibold font-effra">
                <insight.icon size={18} className={insight.iconClassName} />
                {insight.title}
              </p>
              <p className="mt-3 text-sm text-[#4A5565] pl-6 font-effra">{insight.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex overflow-x-auto hide-scrollbar gap-2">
        {tabs.map((tab) => (
          <GlobalButton
            key={tab}
            title={tab}
            onClick={() => setActiveTab(tab)}
            borderRadius="8px"
            height="40px"
            borderWidth="1px"
            borderColor={activeTab === tab ? '#020617' : '#E5E7EB'}
            bgColor={activeTab === tab ? '#020617' : '#FFFFFF'}
            color={activeTab === tab ? '#FFFFFF' : '#27272A'}
            className="font-effra px-4 whitespace-nowrap"
          />
        ))}
      </div>

      <MenuItemsTable rows={filteredRows} />
      <AddMenuItemModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </section>
  );
}

export default MenuPage;