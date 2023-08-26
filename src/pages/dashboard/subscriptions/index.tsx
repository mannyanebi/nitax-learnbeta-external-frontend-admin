import React from "react";
import Head from "next/head";
import { Box, Tabs, Text, Flex, Center, Grid, UnstyledButton, Select } from "@mantine/core";
import chevron_down from '../../../assets/svgs/chevron-down.svg'
import Image from "next/image";
import seetings_icon from '../../../assets/svgs/settings-18.svg'
import emptyState from '../../../assets/svgs/empty_state.svg'
import DashboardLayout from "@/layouts/DashboardLayout";
import Link from "next/link";
import UserSubscriptionCard from "@/components/subscriptions/UserSubscriptionCard";

const Subscriptions = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Subscriptions</title>
      </Head>

      <Box className="px-4 sm:px-8 md:pl-8 md:pr-14 lg:pr-20 mt-5 lg:mt-8">
        <Flex className="items-center flex-col sm:flex-row justify-center text-center sm:justify-start sm:space-x-6">
          <Flex className="items-center sm:space-x-2">
            <Text className="font-semibold text-sm sm:text-base">
              Revenue Generated
            </Text>

            <Image
              alt='icon'
              width={20}
              height={20}
              src={chevron_down}
            />
          </Flex>

          <Text className="font-bold text-2xl mt-2 sm:mt-0">
            N12,000,000
          </Text>
        </Flex>

        <Flex className="mt-4 justify-end space-x-4 sm:hidden">
          <Box>
            <Select
              placeholder='Status'
              data={[
                { value: 'paid', label: 'Paid' },
                { value: 'expired', label: 'Expired' },
                { value: 'canceled', label: 'Canceled' },
              ]}
              styles={() => ({
                input: {
                  border: '2px solid #E9E5E5',
                  '&:focus-within': {
                    borderColor: '#FAA61A',
                  },
                  borderRadius: '0.5rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  width: '7.5rem',
                  color: "#483D3D",
                  fontWeight: 500,
                  height: '2.5rem',
                  "::placeholder": {
                    color: "#483D3D",
                    fontWeight: 500,
                  },
                },
                item: {
                  '&[data-selected]': {
                    '&, &:hover': {
                      backgroundColor: '#FAA61A',
                      color: 'white',
                    },
                  }
                },
              })}
            />
          </Box>

          <Link href='/dashboard/subscriptions/new'>
            <UnstyledButton style={{ border: '2px solid #E9E5E5' }} className='bg-white rounded-lg py-2 h-10 px-5'>
              <Image
                alt='icon'
                width={20}
                height={20}
                src={seetings_icon}
              />
            </UnstyledButton>
          </Link>
        </Flex>

        <Flex className="mt-4 justify-end space-x-4 md:space-x-1 lg:space-x-4 items-center">
          <Box>
            <Select
              placeholder='Billing Method'
              data={[
                { value: 'airtime', label: 'Airtime' },
                { value: 'psp', label: 'PSP' },
              ]}
              styles={() => ({
                input: {
                  border: '2px solid #E9E5E5',
                  '&:focus-within': {
                    borderColor: '#FAA61A',
                  },
                  borderRadius: '0.5rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  width: '9.5rem',
                  color: "#483D3D",
                  fontWeight: 500,
                  height: '2.5rem',
                  "::placeholder": {
                    color: "#483D3D",
                    fontWeight: 500,
                  },
                },
                item: {
                  '&[data-selected]': {
                    '&, &:hover': {
                      backgroundColor: '#FAA61A',
                      color: 'white',
                    },
                  }
                },
              })}
            />
          </Box>

          <Box>
            <Select
              placeholder='Plan'
              data={[
                { value: 'premium', label: 'Premium' },
                { value: 'free', label: 'Free' },
              ]}
              styles={() => ({
                input: {
                  border: '2px solid #E9E5E5',
                  '&:focus-within': {
                    borderColor: '#FAA61A',
                  },
                  borderRadius: '0.5rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  width: '7.5rem',
                  color: "#483D3D",
                  fontWeight: 500,
                  height: '2.5rem',
                  "::placeholder": {
                    color: "#483D3D",
                    fontWeight: 500,
                  },
                },
                item: {
                  '&[data-selected]': {
                    '&, &:hover': {
                      backgroundColor: '#FAA61A',
                      color: 'white',
                    },
                  }
                },
              })}
            />
          </Box>

          <Box className="hidden sm:block">
            <Select
              placeholder='Status'
              data={[
                { value: 'paid', label: 'Paid' },
                { value: 'expired', label: 'Expired' },
                { value: 'canceled', label: 'Canceled' },
              ]}
 
            />
          </Box>

          <Box className="hidden sm:block">
            <Link href='/dashboard/subscriptions/new'>
              <UnstyledButton style={{ border: '2px solid #E9E5E5' }} className='bg-white rounded-lg py-2 px-5'>
                <Image
                  alt='icon'
                  width={20}
                  height={20}
                  src={seetings_icon}
                />
              </UnstyledButton>
            </Link>
          </Box>
        </Flex>

        <Box>
          {/* Empty state start */}
          {/* <Box className="mt-10 sm:mt-16">
            <Center>
              <Box>
                <Image
                  alt='empty state icon'
                  src={emptyState}
                  className='w-60 h-60 animate-pulse mx-auto'
                />

                <Text className='text-[#555555] text-center text-xl mt-5 font-semibold'>
                  No Subscriptions Yet
                </Text>
              </Box>
            </Center>
          </Box> */}
          {/* Empty state end */}

          <Box className="mt-8 px-2 overflow-x-scroll w-full max-h-[48.7rem] pb-4 no-scrollbar border-2 border-[#E2E2E2] rounded-lg">
            <Box className="w-full min-w-[75rem] rounded-t-lg sticky top-0">
              <Grid className="bg-[#FFF6E8] rounded-t-lg px-4 py-3">
                <Grid.Col className="3xl:max-w-none max-w-[18rem]" span="auto">
                  <Text className='text-[#555555] font-semibold'>
                    User
                  </Text>
                </Grid.Col>

                <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
                  <Text className='text-[#555555] font-semibold'>
                    Plan
                  </Text>
                </Grid.Col>

                <Grid.Col className="3xl:max-w-none max-w-[15rem]" span="auto">
                  <Text className='text-[#555555] font-semibold'>
                    Billing Method
                  </Text>
                </Grid.Col>

                <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
                  <Text className='text-[#555555] font-semibold'>
                    Start Date
                  </Text>
                </Grid.Col>

                <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
                  <Text className='text-[#555555] font-semibold'>
                    End Date
                  </Text>
                </Grid.Col>

                <Grid.Col className="3xl:max-w-none max-w-[6rem]" span="auto">
                  <Flex className='justify-between mr-5'>
                    <Text className='text-[#555555] font-semibold'>
                      Status
                    </Text>
                  </Flex>
                </Grid.Col>
              </Grid>
            </Box>

            <Box className="w-full min-w-[75rem] mt-4 space-y-3">
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
              <UserSubscriptionCard />
            </Box>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  )
}

export default Subscriptions