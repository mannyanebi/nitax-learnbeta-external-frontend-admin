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
                  justifyContent: 'center',
                  width: '160px',

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
                <Text className='text-2xl font-bold text-center text-[#444444]'>
                  LB - 57wA490G
                </Text>

                <Box className="text-center my-20">
                  <UnstyledButton
                    // disabled={mutation.isLoading}
                    type="submit"
                    className="px-8 h-14 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
                  >
                    {/* {mutation.isLoading ?
                  <Icon
                    className={`animate-spin mx-auto`}
                    icon="icomoon-free:spinner2"
                    color="#white"
                    width="20"
                    height="20"
                  /> :
                  'Sign In'
                } */}
                    Generate Voucher
                  </UnstyledButton>
                </Box>
              </Tabs.Panel>

              <Tabs.Panel className="mt-5 lg:mt-8" value="create_manually" pt="xs">
                <Box>
                  <Input
                    type="number"
                    // error={form.errors.email}
                    label='Enter Voucher Code'
                    placeholder="Voucher Code"
                    // disabled={mutation.isLoading}
                    // ${form.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'}
                    className={`w-full border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
                  />
                </Box>

                <Box className="text-center my-20">
                  <UnstyledButton
                    // disabled={mutation.isLoading}
                    type="submit"
                    className="px-12 h-14 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
                  >
                    {/* {mutation.isLoading ?
                      <Icon
                        className={`animate-spin mx-auto`}
                        icon="icomoon-free:spinner2"
                        color="#white"
                        width="20"
                        height="20"
                      /> :
                      'Sign In'
                    } */}
                    Creater Voucher
                  </UnstyledButton>
                </Box>
              </Tabs.Panel>
            </Tabs>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}