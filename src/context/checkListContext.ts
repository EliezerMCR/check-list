import { createContext } from 'react';
import type { CheckListContextType } from './checkListContextTypes';

export const CheckListContext = createContext<CheckListContextType | null>(
  null
);
