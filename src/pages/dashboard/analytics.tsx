import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import Head from "next/head";
import { Box, Flex, Text } from "@mantine/core";
import Image from "next/image";
import users_group from '../../assets/svgs/users_group.svg'
import users_green from '../../assets/svgs/users_group_green.svg'
import users_yellow from '../../assets/svgs/users_group_yellow.svg'

const Analytics = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Analytics</title>
      </Head>

      <Box className="px-4 sm:px-6 lg:px-8 mt-5 lg:mt-8">
        <Box className="mt-5 lg:mt-8">
          <Box className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 sm:gap-4 max-w-[70rem] sm:grid-cols-2 xl:grid-cols-3">
            <Box className="border-2 rounded-xl border-[#E2E2E2] p-5">
              <Flex className="h-full xl:hidden items-center justify-between">
                <Flex className="items-center space-x-3">
                  <Box className="h-[40px] w-[40px]">
                    <Image
                      alt='display icon'
                      src={users_group}
                      className='rounded-full h-[40px] w-[40px]'
                    />
                  </Box>

                  <Text className="text-[#777777] font-semibold text-lg">
                    Total Users
                  </Text>
                </Flex>

                <Text className="text-[#444444] font-bold text-xl">
                  2,000
                </Text>
              </Flex>

              <Box className="hidden xl:block">
                <Flex className="items-center space-x-16">
                  <Box className="h-[40px] w-[40px]">
                    <Image
                      alt='display icon'
                      src={users_group}
                      className='rounded-full h-[40px] w-[40px]'
                    />
                  </Box>

                  <Text className="text-[#777777] font-semibold">
                    Total Users
                  </Text>
                </Flex>

                <Text className="text-[#444444] text-center font-bold text-2xl">
                  2,000
                </Text>
              </Box>
            </Box>

            <Box className="border-2 rounded-xl border-[#E2E2E2] p-5">
              <Flex className="h-full xl:hidden items-center justify-between">
                <Flex className="items-center space-x-3">
                  <Box className="h-[40px] w-[40px]">
                    <Image
                      alt='display icon'
                      src={users_green}
                      className='rounded-full h-[40px] w-[40px]'
                    />
                  </Box>

                  <Text className="text-[#777777] font-semibold text-lg">
                    Active Subscribers
                  </Text>
                </Flex>

                <Text className="text-[#444444] font-bold text-xl">
                  500
                </Text>
              </Flex>

              <Box className="hidden xl:block">
                <Flex className="items-center space-x-16">
                  <Box className="h-[40px] w-[40px]">
                    <Image
                      alt='display icon'
                      src={users_green}
                      className='rounded-full h-[40px] w-[40px]'
                    />
                  </Box>

                  <Text className="text-[#777777] font-semibold">
                    Active Subscribers
                  </Text>
                </Flex>

                <Text className="text-[#444444] text-center font-bold text-2xl">
                  500
                </Text>
              </Box>
            </Box>

            <Box className="border-2 rounded-xl border-[#E2E2E2] p-5">
              <Flex className="h-full xl:hidden items-center justify-between">
                <Flex className="items-center space-x-3">
                  <Box className="h-[40px] w-[40px]">
                    <Image
                      alt='display icon'
                      src={users_yellow}
                      className='rounded-full h-[40px] w-[40px]'
                    />
                  </Box>

                  <Text className="text-[#777777] font-semibold text-lg">
                    Unsubscribed Users
                  </Text>
                </Flex>

                <Text className="text-[#444444] font-bold text-xl">
                  1,500
                </Text>
              </Flex>

              <Box className="hidden xl:block">
                <Flex className="items-center space-x-16">
                  <Box className="h-[40px] w-[40px]">
                    <Image
                      alt='display icon'
                      src={users_yellow}
                      className='rounded-full h-[40px] w-[40px]'
                    />
                  </Box>

                  <Text className="text-[#777777] font-semibold">
                    Unsubscribed Users
                  </Text>
                </Flex>

                <Text className="text-[#444444] text-center font-bold text-2xl">
                  1,500
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  )
}

export default Analytics