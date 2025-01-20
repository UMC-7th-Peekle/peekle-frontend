import { createContext, useContext } from 'react';
import { TabsContextType } from '@/types/common';

export const TabsContext = createContext<TabsContextType | null>(null);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (context === null) {
    throw new Error('useTabsContext는 Tabs 안에서 쓰여야 합니다');
  }
  return context;
};
