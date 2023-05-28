import React from "react";
import '@fontsource-variable/montserrat';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query'
import AdminProvider from '@/providers/AdminProvider'

type Props = { children: React.ReactNode }

const Providers: React.FC<Props> = ({ children }) => {
  const queryClient = new QueryClient()

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Montserrat Variable, sans-serif",
            colorScheme: 'light',
          }}
        >
          <AdminProvider>
            {children}
          </AdminProvider>
        </MantineProvider>
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default Providers