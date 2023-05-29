import React from "react";
import PageLayout from "./PageLayout";
import { Box } from '@mantine/core'

type Props = { children: React.ReactNode }

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <PageLayout>
      <Box>
        {children}
      </Box>
    </PageLayout>
  )
}

export default DashboardLayout