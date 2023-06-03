import React from "react"
import { Drawer } from '@mantine/core'
import SideNav from './SideNav'

interface Props {
  opened: boolean,
  close: () => void
}

export function SideNavDrawer({ opened, close }: Props) {
  return (
    <React.Fragment>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size='14rem' 
        padding={0}
        withCloseButton={false}
      >
        <SideNav mobile={true} />
      </Drawer>
    </React.Fragment>
  )
}