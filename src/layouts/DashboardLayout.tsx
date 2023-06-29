import React from "react";
import PageLayout from "./PageLayout";
import { Box } from '@mantine/core'
import SideNav from '@/components/nav/SideNav'
import TopNav from '@/components/nav/TopNav'

type Props = { children: React.ReactNode }

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <PageLayout>
      <Box className="hidden md:block">
        <SideNav />
      </Box>

      <Box className="md:ml-[14rem]">
        <TopNav />

        <Box className="pb-20">
          {children}
        </Box>
      </Box>
    </PageLayout>
  )
}

export default DashboardLayout