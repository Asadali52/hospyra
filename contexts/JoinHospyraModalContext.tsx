'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { JoinHospyraModal } from '@/components/modals/JoinHospyraModal';

interface JoinHospyraModalContextValue {
  openModal: (initialValues?: { email?: string; name?: string; phone?: string; referralCode?: string }) => void;
  closeModal: () => void;
}

const JoinHospyraModalContext = createContext<JoinHospyraModalContextValue | null>(null);

export const JoinHospyraModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<{
    email?: string;
    name?: string;
    phone?: string;
    referralCode?: string;
  }>({});

  const openModal = useCallback(
    (values?: { email?: string; name?: string; phone?: string; referralCode?: string }) => {
      setInitialValues(values ?? {});
      setOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <JoinHospyraModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <JoinHospyraModal
        open={open}
        onOpenChange={setOpen}
        initialValues={initialValues}
      />
    </JoinHospyraModalContext.Provider>
  );
};

export const useJoinHospyraModal = (): JoinHospyraModalContextValue => {
  const ctx = useContext(JoinHospyraModalContext);
  if (!ctx) {
    return {
      openModal: () => {},
      closeModal: () => {},
    };
  }
  return ctx;
};
