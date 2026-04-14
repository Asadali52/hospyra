import {
  activeOrdersData,
  openRequestsData,
  alertsData,
} from '@/components/dashboard/StaticData';

const ROW_BASE = 'flex items-center justify-between rounded-xl px-5 py-3.5 text-[#18181B] font-effra';
const BADGE_BASE = 'flex h-6 min-w-8 items-center justify-center rounded-full px-3 text-sm font-bold';

const WhatsHappeningNow = () => {
  return (
    <section className="rounded-2xl border border-[#EEDFDB] p-4 mt-6">
      <h3 className="text-lg font-semibold text-[#18181B] font-effra">
        What&apos;s Happening Now
      </h3>

      <div className="mt-6 grid gap-3 sm:gap-5 grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 whitespace-nowrap">
        <div>
          <p className="text-md font-semibold text-[#2C2D2F] font-effra">Active Orders</p>
          <div className="mt-3 space-y-3 sm:space-y-4">
            {activeOrdersData.map((item) => (
              <div key={item.label} className={`${ROW_BASE} ${item.rowClassName}`}>
                <span className="text-sm font-medium">{item.label}</span>
                <span className={`${BADGE_BASE} ${item.badgeClassName ?? ''}`}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-md font-semibold text-[#2C2D2F] font-effra">Open Requests</p>
          <div className="mt-3 space-y-3 sm:space-y-4">
            {openRequestsData.map((item) => (
              <div key={item.label} className={`${ROW_BASE} ${item.rowClassName}`}>
                <span className="text-sm font-medium">{item.label}</span>
                <span className={`${BADGE_BASE} ${item.badgeClassName ?? ''}`}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-md font-semibold text-[#2C2D2F] font-effra">Alerts</p>
          <div className="mt-3 space-y-3 sm:space-y-4">
            {alertsData.map((item) => (
              <div
                key={item.label}
                className={`${ROW_BASE} justify-start pl-4 ${item.rowClassName} ${item.alertBorderClassName ?? ''}`}
              >
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsHappeningNow;