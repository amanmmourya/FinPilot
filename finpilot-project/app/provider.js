// app/providers.js
'use client';

import { Provider } from 'react-redux';
import store from '@/store/store.js';

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
