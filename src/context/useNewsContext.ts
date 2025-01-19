import { useContext } from 'react';
import { NewsContextType } from '../interfaces';
import { NewsContext } from './NewsContext';

export const useNewsContext = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext must be used within a NewsProvider');
  }
  return context;
};
