'use client';

import { createContext, useContext, type ReactNode } from 'react';

const GoogleOAuthConfigContext = createContext(false);

export function GoogleOAuthConfigProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactNode;
}) {
  return (
    <GoogleOAuthConfigContext.Provider value={enabled}>
      {children}
    </GoogleOAuthConfigContext.Provider>
  );
}

export function useGoogleOAuthEnabled() {
  return useContext(GoogleOAuthConfigContext);
}
