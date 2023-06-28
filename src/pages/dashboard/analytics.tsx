import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import Head from "next/head";
import { Box, Flex, Text, UnstyledButton, Select, RingProgress, Tabs } from "@mantine/core";
import Image from "next/image";
import { Icon } from '@iconify/react';
import globe from '../../assets/svgs/globe.svg'
import spotify from '../../assets/svgs/spotify-logo.svg'
import airtel from '../../assets/svgs/airtel-ad.svg'
import mtn from '../../assets/svgs/mtn-ad.svg'
import psp from '../../assets/svgs/psp-ad.svg'
import tel_phone from '../../assets/svgs/airtime-billing.svg'
import renewals from '../../assets/svgs/renewals-icon.svg'
import dropoff_icon from '../../assets/svgs/drop-off.svg'
import users_group from '../../assets/svgs/users_group_yellow.svg'
import LineChart from "@/components/analytics/Chart";

const Analytics = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Analytics</title>
      </Head>

      <Box className="px-4 sm:px-6 lg:px-8 mt-5 lg:mt-6">
        <Flex className="justify-end">
          <UnstyledButton className="bg-[#E0E8E8] hover:bg-[#e0e8e8ac] px-5 rounded-lg py-3 transition duration-75 delay-75 ease-linear hover:shadow-sm">
            <Flex className="items-center space-x-2">
              <Text className="text-[#00433f] font-semibold text-sm">
                Export as CSV
              </Text>

              <Icon icon="uil:upload" color="#00433f" width="18" height="18" />
            </Flex>
          </UnstyledButton>
        </Flex>

        <Box className="mt-4 lg:flex lg:items-center lg:space-x-6">
          <Box className="rounded-lg border-2 border-[#E2E2E2] h-[17rem] lg:w-2/3 xl:w-3/4">
            <Flex className="bg-[#FCFCFC] rounded-t-lg items-center justify-between px-4 h-16 py-2 border-b-2 border-[#E2E2E2]">
              <Flex className="items-center space-x-2">
                <Image 
                  alt='icon'
                  src={globe}
                  className='w-6 h-6 rounded-full'
                />

                <Text className="font-bold truncate">
                  Marketer Conversions
                </Text>
              </Flex>

              <Box>
                <Select
                  placeholder='Company'
                  data={[
                    { value: 'spotify', label: 'Spotify' },
                    { value: 'youtube', label: 'YouTube' },
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
            </Flex>

            <Box className="px-4 py-4">
              <Flex className="items-center space-x-2">
                <Image
                  alt='icon'
                  src={spotify}
                  className='w-6 h-6 rounded-full'
                />

                <Text className="font-bold truncate">
                  Spotify
                </Text>
              </Flex>

              <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] justify-between rounded-lg mt-4 py-5 overflow-x-scroll no-scrollbar space-x-2">
                <Box className="min-w-[16rem] w-full pl-4 pr-8 border-r-2 border-[#E2E2E2]">
                  <Flex className="justify-between items-center">
                    <Flex className="items-center space-x-3">
                      <Image
                        alt='icon'
                        src={airtel}
                        className='w-5 h-5 rounded-full'
                      />

                      <Text className="text-[#777777] font-[500] text-sm truncate">
                        Airtel
                      </Text>
                    </Flex>

                    <Flex className="items-center space-x-2">
                      <Text className="font-semibold text-[#555555] truncate">
                        840
                      </Text>

                      <Text className="font-[500] truncate text-sm text-[#555555]">
                        Clicks
                      </Text>
                    </Flex>
                  </Flex>

                  <Box className="mt-3 space-y-2">
                    <Flex className="items-center space-x-2 justify-between">
                      <Text className="font-semibold text-[#555555] truncate text-sm">
                        Succesful
                      </Text>

                      <Text className="font-[700] truncate text-sm text-right text-[#555555]">
                        324
                      </Text>
                    </Flex>

                    <Flex className="items-center space-x-2 justify-between">
                      <Text className="font-[600] truncate text-sm text-[#555555]">
                        Unsuccesful
                      </Text>

                      <Text className="font-[700] truncate text-sm text-right text-[#555555]">
                        324
                      </Text>
                    </Flex>
                  </Box>
                </Box>

                <Box className="min-w-[16rem] w-full pl-4 pr-8 border-r-2 border-[#E2E2E2]">
                  <Flex className="justify-between items-center">
                    <Flex className="items-center space-x-3">
                      <Image
                        alt='icon'
                        src={mtn}
                        className='w-5 h-5 rounded-full'
                      />

                      <Text className="text-[#777777] font-[500] text-sm truncate">
                        MTN
                      </Text>
                    </Flex>

                    <Flex className="items-center space-x-2 text-[#555555]">
                      <Text className="font-semibold truncate">
                        840
                      </Text>

                      <Text className="font-[500] text-sm truncate">
                        Clicks
                      </Text>
                    </Flex>
                  </Flex>

                  <Box className="mt-3 space-y-2 text-[#555555]">
                    <Flex className="items-center space-x-2 justify-between">
                      <Text className="font-[600] text-sm truncate">
                        Succesful
                      </Text>

                      <Text className="font-[700] text-sm truncate text-right">
                        324
                      </Text>
                    </Flex>

                    <Flex className="items-center space-x-2 justify-between">
                      <Text className="font-[600] text-sm truncate">
                        Unsuccesful
                      </Text>

                      <Text className="font-[700] text-sm truncate text-right">
                        324
                      </Text>
                    </Flex>
                  </Box>
                </Box>

                <Box className="min-w-[16rem] w-full px-4 border-[#E2E2E2]">
                  <Flex className="justify-between items-center">
                    <Flex className="items-center space-x-3">
                      <Image
                        alt='icon'
                        src={psp}
                        className='w-5 h-5 rounded-full'
                      />

                      <Text className="text-[#777777] font-[500] text-sm truncate">
                        PSPs
                      </Text>
                    </Flex>

                    <Flex className="items-center space-x-2 text-[#555555]">
                      <Text className="font-semibold truncate">
                        840
                      </Text>

                      <Text className="font-[500] text-sm truncate">
                        Clicks
                      </Text>
                    </Flex>
                  </Flex>

                  <Box className="mt-3 space-y-2 text-[#555555]">
                    <Flex className="items-center space-x-2 justify-between">
                      <Text className="font-[600] text-sm truncate">
                        Succesful
                      </Text>

                      <Text className="font-[700] text-sm truncate text-right">
                        324
                      </Text>
                    </Flex>

                    <Flex className="items-center space-x-2 justify-between">
                      <Text className="font-[600] text-sm">
                        Unsuccesful
                      </Text>

                      <Text className="font-[700] text-sm text-right">
                        324
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Box>

          <Box className="rounded-lg mt-6 lg:mt-0 border-2 border-[#E2E2E2] h-[17rem] lg:w-1/3 xl:w-1/4">
            <Flex className="bg-[#FCFCFC] rounded-t-lg items-center justify-between px-4 p-2 h-16 border-b-2 border-[#E2E2E2]">
              <Flex className="items-center space-x-2">
                <Image
                  alt='icon'
                  src={tel_phone}
                  className='w-6 h-6 rounded-full'
                />

                <Text className="font-bold">
                  Airtime Billing
                </Text>
              </Flex>
            </Flex>

            <Box className="px-4 py-4">
              <Text className="font-semibold text-sm text-center">
                Total: &#x20A6;5,230,200
              </Text>

              <Box className="w-fit mx-auto">
                <RingProgress
                  size={130}
                  thickness={35}
                  sections={[
                    { value: 40, color: '#73B6F4', tooltip: 'Operators' },
                    { value: 60, color: '#FCDE6B', tooltip: 'LearnBeta' },
                  ]}
                />
              </Box>

              <Flex className="space-x-4 justify-center mt-[-1rem]">
                <Flex className="items-center space-x-3">
                  <Box className="w-2 h-2 bg-[#73B6F4] rounded-full"/>
                  <Box className="text-xs">
                    <Text className="text-[#555555]">
                      Operators
                    </Text>

                    <Text className="text-[#555555] font-semibold">
                      &#x20A6; 1,270,760
                    </Text>
                  </Box>
                </Flex>

                <Flex className="items-center space-x-3">
                  <Box className="w-2 h-2 bg-[#FCDE6B] rounded-full" />
                  <Box className="text-xs">
                    <Text className="text-[#555555]">
                      LearnBeta
                    </Text>

                    <Text className="text-[#555555] font-semibold">
                      &#x20A6; 1,270,760
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Box>

        <Box className="mt-6 lg:flex lg:justify-between lg:space-x-6">
          <Box className="rounded-lg border-2 border-[#E2E2E2] h-[17rem] lg:w-1/3">
            <Flex className="bg-[#FCFCFC] rounded-t-lg items-center justify-between px-4 h-16 py-2 border-b-2 border-[#E2E2E2]">
              <Flex className="items-center space-x-2">
                <Image
                  alt='icon'
                  src={renewals}
                  className='w-6 h-6 rounded-full'
                />

                <Text className="font-bold truncate">
                  Renewals
                </Text>
              </Flex>

              <Text className="font-bold text-lg truncate">
                840
              </Text>
            </Flex>

            <Box className="mt-5 px-4 space-y-3">
              <Flex className="justify-between bg-[#FDE5E5] px-4 py-[0.9rem] rounded-xl">
                <Flex className="items-center space-x-3">
                  <Image
                    alt='icon'
                    src={airtel}
                    className='w-5 h-5 rounded-full'
                  />

                  <Text className="font-semibold text-[#555555] text-sm truncate">
                    Airtel
                  </Text>
                </Flex>

                <Text className="text-sm font-semibold">
                  510
                </Text>
              </Flex>

              <Flex className="justify-between bg-[#F9F2D6] px-4 py-[0.9rem] rounded-xl">
                <Flex className="items-center space-x-3">
                  <Image
                    alt='icon'
                    src={mtn}
                    className='w-5 h-5 rounded-full'
                  />

                  <Text className="font-semibold text-[#555555] text-sm truncate">
                    MTN
                  </Text>
                </Flex>

                <Text className="text-sm font-semibold">
                  510
                </Text>
              </Flex>

              <Flex className="justify-between bg-[#D4E8FA] px-4 py-[0.9rem] rounded-xl">
                <Flex className="items-center space-x-3">
                  <Image
                    alt='icon'
                    src={psp}
                    className='w-5 h-5 rounded-full'
                  />

                  <Text className="font-semibold text-[#555555] text-sm truncate">
                    PSPs
                  </Text>
                </Flex>

                <Text className="text-sm font-semibold">
                  510
                </Text>
              </Flex>
            </Box>
          </Box>

          <Box className="rounded-lg border-2 border-[#E2E2E2] h-[17rem] mt-6 lg:mt-0 lg:w-2/3">
            <Flex className="bg-[#FCFCFC] rounded-t-lg items-center justify-between px-4 h-16 py-2 border-b-2 border-[#E2E2E2]">
              <Flex className="items-center space-x-2">
                <Image
                  alt='icon'
                  src={dropoff_icon}
                  className='w-6 h-6 rounded-full'
                />

                <Text className="font-bold truncate">
                  Drop Offs
                </Text>

                <Text className="text-sm text-[#777777]">
                  (In persons)
                </Text>
              </Flex>

              <Box>
                <Select
                  placeholder='Telecom'
                  data={[
                    { value: 'mtn', label: 'MTN' },
                    { value: 'airtel', label: 'Airtel' },
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
            </Flex>

            <Box className="py-4 px-4 ">
              <LineChart />
            </Box>
          </Box>
        </Box>

        <Box className="mt-6">
          <Box className="rounded-lg border-2 border-[#E2E2E2] pb-4 mt-6">
            <Flex className="bg-[#FCFCFC] rounded-t-lg items-center justify-between px-4 h-16 py-2 border-b-2 border-[#E2E2E2]">
              <Flex className="items-center space-x-2">
                <Image
                  alt='icon'
                  src={users_group}
                  className='w-6 h-6 rounded-full'
                />

                <Text className="font-bold truncate">
                  Subscriptions
                </Text>
              </Flex>
            </Flex>

            <Box className="mt-3">
              <Tabs defaultValue="planA" color="yellow">
                <Tabs.List className="px-5">
                  <Tabs.Tab value="planA">
                    <Flex className="space-x-2">
                      <Text className="font-bold truncate">
                        Plan A
                      </Text>

                      <Text className="text-sm text-[#777777]">
                        (220)
                      </Text>
                    </Flex>
                  </Tabs.Tab>

                  <Tabs.Tab value="planB">
                    <Flex className="space-x-2">
                      <Text className="font-bold truncate">
                        Plan B
                      </Text>

                      <Text className="text-sm text-[#777777]">
                        (220)
                      </Text>
                    </Flex>
                  </Tabs.Tab>

                  <Tabs.Tab value="planC">
                    <Flex className="space-x-2">
                      <Text className="font-bold truncate">
                        Plan C
                      </Text>

                      <Text className="text-sm text-[#777777]">
                        (220)
                      </Text>
                    </Flex>
                  </Tabs.Tab>
                </Tabs.List>

                <Box className="px-5 mt-3">
                  <Tabs.Panel value="planA" pt="xs">
                    <Flex className="space-x-6 overflow-x-auto w-full no-scrollbar">
                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                    </Flex>
                  </Tabs.Panel>

                  <Tabs.Panel value="planB" pt="xs">
                    <Flex className="space-x-6 overflow-x-auto w-full no-scrollbar">
                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                    </Flex>
                  </Tabs.Panel>

                  <Tabs.Panel value="planC" pt="xs">
                    <Flex className="space-x-6 overflow-x-auto w-full no-scrollbar">
                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>

                      <Box className="py-4 min-w-[14rem] space-y-4">
                        <Flex className="items-center space-x-2">
                          <Image
                            alt='icon'
                            src={spotify}
                            className='w-6 h-6 rounded-full'
                          />

                          <Text className="font-semibold truncate text-sm">
                            Spotify
                          </Text>

                          <Text className="text-sm text-[#777777]">
                            (220)
                          </Text>
                        </Flex>

                        <Flex className="bg-[#FCFCFC] border-2 border-[#E2E2E2] rounded-lg p-4">
                          <Box className="w-full space-y-3">
                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={airtel}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  Airtel
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={mtn}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  MTN
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex className="justify-between items-center">
                              <Flex className="items-center space-x-3">
                                <Image
                                  alt='icon'
                                  src={psp}
                                  className='w-5 h-5 rounded-full'
                                />

                                <Text className="text-[#777777] font-[500] text-sm truncate">
                                  PSPs
                                </Text>
                              </Flex>

                              <Flex className="items-center space-x-2">
                                <Text className="font-semibold truncate">
                                  50
                                </Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                    </Flex>
                  </Tabs.Panel>
                </Box>
              </Tabs>
            </Box>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  )
}

export default Analytics