import { ClerkProvider } from '@clerk/clerk-react';
import type { ReactNode } from 'react';


export default function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {children}
    </ClerkProvider>
  );
}