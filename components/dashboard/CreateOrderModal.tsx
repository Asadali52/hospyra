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

type CreateOrderModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateOrderModal = ({ open, onOpenChange }: CreateOrderModalProps) => {
  const [category, setCategory] = useState('');
  const [vendor, setVendor] = useState('');
  const [amount, setAmount] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleClose = () => onOpenChange(false);

  const handleSubmit = () => {
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalPanel
        headingText="Create New Order"
        headingClassName="text-2xl"
        className="max-w-xl rounded-3xl p-6 overflow-hidden"
        onClose={handleClose}
      >
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="text-[#52525B] font-effra text-base">
            Place a new order with your vendors for food, supplies, or equipment.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
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
                  <SelectItem value="Beverage">Beverage</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Supplies">Supplies</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-[#111827] font-effra text-sm font-medium">
                Vendor *
              </label>
              <Select value={vendor} onValueChange={setVendor}>
                <SelectTrigger className="h-10! w-full rounded-md border border-transparent bg-[#F3F4F6] px-4 text-sm font-effra">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fresh Farms Co">Fresh Farms Co</SelectItem>
                  <SelectItem value="Wine Distributors">Wine Distributors</SelectItem>
                  <SelectItem value="Ocean's Best">Ocean&apos;s Best</SelectItem>
                  <SelectItem value="Kitchen Supply Pro">Kitchen Supply Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-[#111827] font-effra text-sm font-medium">
                Order Amount *
              </label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-md border border-transparent bg-[#F3F4F6] px-4 py-2.5 text-sm text-[#111827] placeholder:text-[#71717A] font-effra outline-none focus:border-[#1E50C1]"
              />
            </div>

            <div>
              <label className="mb-2 block text-[#111827] font-effra text-sm font-medium">
                Delivery Date *
              </label>
              <input
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                placeholder="Select date"
                className="w-full rounded-md border border-transparent bg-[#F3F4F6] px-4 py-2.5 text-sm text-[#111827] placeholder:text-[#71717A] font-effra outline-none focus:border-[#1E50C1]"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-[#111827] font-effra text-sm font-medium">
              Order Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Special instructions or items to order..."
              rows={3}
              className="w-full resize-none rounded-md border border-transparent bg-[#F3F4F6] px-4 py-3 text-sm text-[#111827] placeholder:text-[#71717A] font-effra outline-none focus:border-[#1E50C1]"
            />
          </div>

          <div className="mt-5 flex flex-wrap justify-end gap-3">
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
              title="Create Order"
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

export default CreateOrderModal;
