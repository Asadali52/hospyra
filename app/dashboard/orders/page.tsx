'use client';

import { useState } from 'react';
import { Box } from 'lucide-react';
import GlobalButton from '@/components/buttons/GlobalButton';
import OrdersTable from '@/components/dashboard/OrdersTable';
import CreateOrderModal from '@/components/dashboard/CreateOrderModal';
import { ordersTableRowsData } from '@/components/dashboard/TablesStaticData';

type OrderStat = {
  label: string;
  value: string;
  valueClassName?: string;
};

const stats: OrderStat[] = [
  { label: 'Total Orders', value: '8' },
  { label: 'Pending Orders', value: '2', valueClassName: 'text-[#E75B3B]' },
  { label: 'Total Spend', value: '$8,211.50' },
  { label: 'Avg Order Value', value: '$1026' },
];

const quickReorderVendors = [
  { name: 'Fresh Farms Co', type: 'Food', lastOrder: '$1,250' },
  { name: 'Wine Distributors', type: 'Beverage', lastOrder: '$2,100' },
  { name: "Ocean's Best", type: 'Seafood', lastOrder: '$890' },
] as const;

const OrdersPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <section>
      <div className="flex flex-wrap items-center justify-end gap-3">
        <GlobalButton
          title="Add Item"
          bgColor="#020617"
          color="white"
          borderRadius="8px"
          height="40px"
          className="font-effra px-3"
          icon={<Box size={16} />}
          onClick={() => setIsCreateModalOpen(true)}
        />
      </div>

      <div className="mt-5 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {stats.map((card) => (
          <div key={card.label} className="rounded-2xl border bg-linear-to-b from-[#F9F8F8] to-[#F8F2EF] border-[#EEDFDB] p-5">
            <p className="text-sm text-[#52525B] font-effra">{card.label}</p>
            <p className={`mt-4 mb-2 text-3xl font-semibold text-[#0F172A] font-effra ${card.valueClassName ?? ''}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-[#EEDFDB]">
        <h3 className="text-2xl font-semibold text-[#18181B] px-5 pt-5 font-effra">Recent Orders</h3>
        <OrdersTable rows={ordersTableRowsData} />
      </div>

      <div className="mt-5 rounded-2xl border border-[#EEDFDB] p-5">
        <h3 className="text-2xl font-semibold text-[#18181B] font-effra">Quick Reorder</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {quickReorderVendors.map((vendor) => (
            <div key={vendor.name} className="rounded-xl bg-[#F9FAFB] p-4">
              <p className="text-lg font-semibold text-[#18181B] font-effra">{vendor.name}</p>
              <p className="mt-1 text-sm text-[#3F3F46] font-effra">{vendor.type}</p>
              <p className="mt-1 text-sm text-[#27272A] font-effra">Last order: {vendor.lastOrder}</p>
              <div className="mt-3">
                <GlobalButton
                  title="Reorder"
                  width="100%"
                  height="38px"
                  borderRadius="8px"
                  bgColor="#020617"
                  color="#FFFFFF"
                  className="font-effra"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateOrderModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </section>
  );
};

export default OrdersPage;
