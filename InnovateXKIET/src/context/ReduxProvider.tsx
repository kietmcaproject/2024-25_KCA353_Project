// context/ReduxProvider.tsx
'use client'; // Enable client-side features like Redux

import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from '@/lib/Redux/store';

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
