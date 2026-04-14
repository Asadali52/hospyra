'use client';

import { useState } from 'react';
import GlobalButton from '@/components/buttons/GlobalButton';
import { Modal, ModalPanel } from '@/components/ui/modal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SubmitRequestModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SubmitRequestModal = ({ open, onOpenChange }: SubmitRequestModalProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => onOpenChange(false);

  const handleSubmit = () => {
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalPanel
        headingText="Submit New Request"
        headingClassName="text-2xl"
        className="max-w-xl rounded-3xl p-6 overflow-hidden"
        onClose={handleClose}
      >
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="text-[#52525B] font-effra text-base">
            Submit a request for any business need - from equipment repairs to menu changes.
          </p>

          <div className="mt-5">
            <label className="mb-2 block text-[#111827] font-effra text-sm font-medium">
              Request Title *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Replace broken oven"
              className="w-full rounded-md border border-transparent bg-[#F3F4F6] px-4 py-2.5 text-sm text-[#111827] placeholder:text-[#71717A] font-effra outline-none focus:border-[#1E50C1]"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-[#111827] font-effra text-sm font-medium">
                Category *
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-10! w-full rounded-md border border-transparent bg-[#F3F4F6] px-4 text-sm font-effra">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Staffing">Staffing</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Construction">Construction</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-[#111827] font-effra text-sm font-medium">
                Priority *
              </label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="h-10! w-full rounded-md border border-transparent bg-[#F3F4F6] px-4 text-sm font-effra">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">high</SelectItem>
                  <SelectItem value="medium">medium</SelectItem>
                  <SelectItem value="low">low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-[#111827] font-effra text-sm font-medium">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed information about your request..."
              rows={5}
              className="w-full resize-none rounded-md border border-transparent bg-[#F3F4F6] px-4 py-3 text-sm text-[#111827] placeholder:text-[#71717A] font-effra outline-none focus:border-[#1E50C1]"
            />
          </div>

          <div className="mt-4 rounded-xl border border-[#93C5FD] bg-[#EFF6FF] p-4">
            <p className="text-lg font-semibold text-[#1F2937] font-effra">What happens next?</p>
            <p className="mt-2 text-sm text-[#374151] font-effra">
              Your request will be reviewed by the Hosperra team and assigned to the appropriate specialist. You&apos;ll receive updates via email and in your dashboard.
            </p>
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
              title="Submit Request"
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

export default SubmitRequestModal;
