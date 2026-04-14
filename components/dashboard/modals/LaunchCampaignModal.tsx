'use client';

import { useState } from 'react';
import GlobalButton from '@/components/buttons/GlobalButton';
import DashInput from '@/components/dashboard/DashInput';
import { Modal, ModalPanel } from '@/components/ui/modal';

type LaunchCampaignModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const platformOptions = ['Instagram', 'Facebook', 'TikTok', 'Google Ads'] as const;

const LaunchCampaignModal = ({ open, onOpenChange }: LaunchCampaignModalProps) => {
  const [campaignName, setCampaignName] = useState('');
  const [platforms, setPlatforms] = useState<string[]>(['Instagram']);
  const [budget, setBudget] = useState('500');
  const [duration, setDuration] = useState('7');
  const [objective, setObjective] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => onOpenChange(false);

  const handleTogglePlatform = (platform: string) => {
    setPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((item) => item !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = () => {
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalPanel
        headingText="Launch New Campaign"
        headingClassName="text-2xl"
        className="max-w-xl rounded-3xl p-6 overflow-hidden"
        onClose={handleClose}
      >
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="text-[#52525B] font-effra text-sm">
            Create a new marketing campaign across your social media platforms.
          </p>

          <div className="mt-4">
            <DashInput
              label="Campaign Name"
              isRequired
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="e.g., Summer Happy Hour"
            />
          </div>

          <div className="mt-4">
            <p className="mb-2 block text-[#111827] font-effra text-sm font-medium">Target Platforms *</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {platformOptions.map((platform) => {
                const selected = platforms.includes(platform);
                return (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => handleTogglePlatform(platform)}
                    className="flex items-center gap-2 rounded-md border border-[#D4D4D8] bg-white px-4 py-3 text-left"
                  >
                    <span
                      className={`inline-flex h-4 w-4 items-center justify-center rounded border ${selected
                          ? 'border-[#111827] bg-[#111827] text-white'
                          : 'border-[#D4D4D8] bg-[#F4F4F5]'
                        }`}
                    >
                      {selected ? '✓' : ''}
                    </span>
                    <span className="text-sm font-semibold text-[#18181B] font-effra">{platform}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <DashInput
              label="Budget"
              isRequired
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            <DashInput
              label="Duration (days)"
              isRequired
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <DashInput
              label="Campaign Objective"
              isRequired
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-[#111827] font-effra text-sm font-medium">
              Campaign Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your campaign goals, target audience, and key messaging..."
              rows={3}
              className="w-full resize-none rounded-md border border-transparent bg-[#F3F4F6] px-4 py-3 text-sm text-[#111827] placeholder:text-[#71717A] font-effra outline-none focus:border-[#1E50C1]"
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <GlobalButton
              title="Cancel"
              borderRadius="10px"
              height="44px"
              borderWidth="1px"
              borderColor="#E5E7EB"
              bgColor="#FFFFFF"
              color="#111827"
              className="font-effra px-5"
              onClick={handleClose}
            />
            <GlobalButton
              title="Launch Campaign"
              borderRadius="10px"
              height="44px"
              bgColor="#020617"
              color="#FFFFFF"
              className="font-effra px-5"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </ModalPanel>
    </Modal>
  );
};

export default LaunchCampaignModal;
