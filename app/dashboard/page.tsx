import GlobalButton from "@/components/buttons/GlobalButton";
import KeyMatricsCard from "@/components/dashboard/KeyMatricsCard";
import LineScore from "@/components/dashboard/LineScore";
import { ScoreDonut } from "@/components/dashboard/ScoreDonut";
import { keyMetricsData } from "@/components/dashboard/StaticData";
import WhatsHappeningNow from "@/components/dashboard/WhatsHappeningNow";
import { FileText, MessageSquare, Package } from 'lucide-react'


const DashboardPage = () => {
  return (
    <div className="grid gap-5 grid-cols-3 max-[1350px]:grid-cols-1">
      <div className="border border-[#FFDAD0] rounded-2xl p-4 bg-[#FFDAD0]/20">
        <p className="text-xl font-medium font-effra text-center">Business Performance Score</p>
        <ScoreDonut score={78} />
        <div className="bg-[#1F2022] rounded-full mx-auto w-fit px-6 py-3 flex items-center gap-2">
          <div className="bg-[#FF4945] h-3 w-3 rounded-full" />
          <p className="text-white text-xs">Good Needs Optimization</p>
        </div>
        <p className="pt-5">Score Breakdown</p>
        <LineScore score={82} label="Food Quality" />
        <LineScore score={70} label="Staffing" />
        <LineScore score={75} label="Operations" />
        <LineScore score={68} label="Cost Control" />
        <LineScore score={65} label="Marketing" />
        <LineScore score={80} label="Customer Experience" />
        <LineScore score={72} label="Technology" />
      </div>
      <div className="col-span-2 max-[1350px]:col-span-1">
        <div className="border border-[#EEDFDB] rounded-2xl p-4">
          <p className="text-md font-medium font-effra">Quick Actions</p>
          <div className="grid min-[370px]:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <GlobalButton title={"Submit Request"} className="flex-row-reverse" borderRadius="8px" height="40px" icon={<FileText size={20} />} bgColor="#1E50C1" color="white" />
            <GlobalButton title={"Order Supplies"} className="flex-row-reverse" borderRadius="8px" height="40px" borderColor="#EEDFDB" borderWidth="1px" icon={<Package size={20} />} />
            <GlobalButton title={"Message Team"} className="flex-row-reverse" borderRadius="8px" height="40px" borderColor="#EEDFDB" borderWidth="1px" icon={<MessageSquare size={20} />} />
            <GlobalButton title={"Emergency"} className="flex-row-reverse" borderRadius="8px" height="40px" icon={<FileText size={20} />} bgColor="#D4183D" color="white" />
          </div>
        </div>
        <p className="text-xl font-medium font-effra py-3">Key Metrics</p>
        <div className="grid grid-cols-1 min-[390px]:grid-cols-2 md:grid-cols-3 gap-5">
          {keyMetricsData.map((metric) => (
            <KeyMatricsCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              icon={<metric.icon className={metric.iconClassName} size={metric.iconSize ?? 24} />}
              footerText={metric.footerText}
              footerTone={metric.footerTone}
            />
          ))}
        </div>
        <WhatsHappeningNow />
      </div>
    </div>
  );
};

export default DashboardPage;