import React from 'react';
import { AlertTriangle, CheckCircle2, Lightbulb, TrendingUp } from 'lucide-react';
import GlobalButton from '@/components/buttons/GlobalButton';
import {
  requestsSnapshotData,
  ordersSnapshotData,
  inventoryHealthData,
  inventoryNoticesData,
  staffingSnapshotData,
  staffingNoticesData,
} from '@/components/dashboard/StaticData';

function InventoryStatusIcon({ status }: { status: 'Low' | 'Normal' | 'High' }) {
  if (status === 'Normal') return <CheckCircle2 size={14} />;
  if (status === 'High') return <TrendingUp size={14} />;
  return <AlertTriangle size={14} />;
}

const RequestsAndOrders = () => {
  return (
    <section>
      <h3 className="text-xl my-4 font-semibold text-[#18181B] font-effra">
        Requests &amp; Orders
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-[#EEDFDB] p-5">
          <p className="text-lg font-semibold text-[#2C2D2F] font-effra">Requests Snapshot</p>
          <div className="mt-4 space-y-3">
            {requestsSnapshotData.map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${item.rowClassName}`}
              >
                <span className="text-sm font-medium text-[#2C2D2F] font-effra">{item.label}</span>
                <span className={`text-2xl font-semibold font-effra ${item.valueClassName ?? ''}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <GlobalButton
              title="Submit New Request"
              width="100%"
              borderRadius="10px"
              bgColor="#1E50C1"
              color="white"
              font="600"
              className="font-effra"
            />
          </div>
        </div>

        <div className="rounded-xl border border-[#EEDFDB] p-5">
          <p className="text-lg font-semibold text-[#2C2D2F] font-effra">Orders Snapshot</p>
          <div className="mt-4 space-y-3">
            {ordersSnapshotData.map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${item.rowClassName}`}
              >
                <span className="text-sm font-medium text-[#2C2D2F] font-effra">{item.label}</span>
                <span className={`text-2xl font-semibold font-effra ${item.valueClassName ?? ''}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <GlobalButton
              title="View Orders"
              width="100%"
              borderRadius="10px"
              bgColor="#FFFFFF"
              borderColor="#E5E7EB"
              borderWidth="1px"
              color="#2C2D2F"
              font="600"
              className="font-effra"
            />
          </div>
        </div>

        <div className="rounded-xl border border-[#EEDFDB] p-5">
          <p className="text-lg font-semibold text-[#2C2D2F] font-effra">Inventory &amp; Supply Health</p>
          <div className="mt-4 space-y-3">
            {inventoryHealthData.map((item) => (
              <div
                key={item.name}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${item.rowClassName}`}
              >
                <span className="text-sm font-medium text-[#2C2D2F] font-effra">{item.name}</span>
                <span
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold font-effra ${item.badgeClassName}`}
                >
                  <InventoryStatusIcon status={item.status} />
                  {item.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {inventoryNoticesData.map((item) => (
              <div
                key={item.text}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 ${item.rowClassName} ${item.borderClassName}`}
              >
                <Lightbulb size={16} className={`${item.iconClassName ?? 'text-[#DAB000]'} shrink-0`} />
                <span className="text-sm text-[#2C2D2F] font-effra">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#EEDFDB] p-5">
          <p className="text-lg font-semibold text-[#2C2D2F] font-effra">Staffing Overview</p>
          <div className="mt-4 space-y-3">
            {staffingSnapshotData.map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${item.rowClassName}`}
              >
                <span className="text-sm font-medium text-[#2C2D2F] font-effra">{item.label}</span>
                <span className={`text-2xl font-semibold font-effra ${item.valueClassName ?? ''}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {staffingNoticesData.map((item) => (
              <div
                key={item.text}
                className={`flex items-center gap-2 rounded-xl px-4 py-4 ${item.rowClassName} ${item.borderClassName}`}
              >
                <Lightbulb size={20} className={`${item.iconClassName ?? 'text-[#F97316]'} shrink-0`} />
                <span className="text-sm text-[#2C2D2F] font-effra">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestsAndOrders;
