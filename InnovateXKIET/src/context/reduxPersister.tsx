// context/ReduxProvider.tsx
'use client'; // Enable client-side features like Redux
import { ReactNode } from 'react';
import { persistor, store } from '@/lib/Redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function ReduxPersister({ children }: { children: ReactNode }) {
    return <PersistGate loading={null} persistor={persistor}>
        {children}
    </PersistGate>;
}
