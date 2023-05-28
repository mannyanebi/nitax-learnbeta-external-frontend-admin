import React from "react";
import { Box } from '@mantine/core'

type Props = { children: React.ReactNode }

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Box>
        {children}
      </Box>
    </React.Fragment>
  )
}

export default DashboardLayout