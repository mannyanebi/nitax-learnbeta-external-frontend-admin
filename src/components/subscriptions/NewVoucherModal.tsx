import React, { useState } from 'react';
import { Modal, Box, Text, Flex, Tabs, UnstyledButton } from '@mantine/core';
import Input from '../custom/Input';
import Form from '../custom/Form';

interface Props {
  opened: boolean,
  close: () => void
}

export default function NewVoucherModal({ opened, close }: Props) {
  return (
    <React.Fragment>
      <Modal
        size='lg'
        radius={12}
        opened={opened}
        onClose={close}
        centered>
        <Box className='px-2 sm:px-8 md:px-10'>
          <Text className='font-semibold text-center text-lg'>
            Create Voucher
          </Text>

          <Box className='mt-10'>
            <Tabs
              unstyled
              defaultValue="autogenerate"
              styles={(theme) => ({
                tab: {
                  ...theme.fn.focusStyles(),
                  color: '#777777',
                  cursor: 'pointer',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontFamily: "Montserrat Variable, sans-serif",
                  fontSize: theme.fontSizes.sm,
                  display: 'flex',
                  alignItems: 'center',

                  '&[data-active]': {
                    backgroundColor: 'white',
                    borderColor: 'white',
                    fontWeight: 600,
                    color: '#FAA61A',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }
                },

                tabsList: {
                  display: 'flex',
                  backgroundColor: '#F4F4F4',
                  borderRadius: '9999px',
                  padding: '5px',
                  height: '50px'
                },
              })}
            >
              <Box className="p-1 w-fit mx-auto">
                <Tabs.List>
                  <Tabs.Tab value="autogenerate">
                    Autogenerate
                  </Tabs.Tab>

                  <Tabs.Tab value="create_manually">
                    Create Manually
                  </Tabs.Tab>
                </Tabs.List>
              </Box>

              <Tabs.Panel className="mt-5 lg:mt-8" value="autogenerate" pt="xs">
                Autogenerate
              </Tabs.Panel>

              <Tabs.Panel className="mt-5 lg:mt-8" value="create_manually" pt="xs">
                create_manually
              </Tabs.Panel>
            </Tabs>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}