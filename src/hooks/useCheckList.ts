import { useContext } from 'react';
import { CheckListContext } from '../context/checkListContext';

export function useCheckList() {
  const context = useContext(CheckListContext);
  if (!context) {
    throw new Error('useCheckList must be used within CheckListProvider');
  }
  return context;
}
