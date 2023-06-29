import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import Head from "next/head";
import hero_banner from '../../assets/svgs/hero_banner.svg'
import { BackgroundImage, Box, Skeleton, Flex, Text } from "@mantine/core";
import Image from "next/image";
import users_group from '../../assets/svgs/users_group.svg'
import users_green from '../../assets/svgs/users_group_green.svg'
import { TotalSkeleton } from "@/components/analytics/TotalSkeleton";
import UserTable from "@/components/user/UserTable";
import users_yellow from '../../assets/svgs/users_group_yellow.svg'

const Overview = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Overview</title>
      </Head>

      <BackgroundImage 
        src={hero_banner.src}
        className="h-40 bg-right md:hidden text-white font-bold px-4 sm:px-8 md:px-10"
      >
        <Flex className="h-full items-center">
          <Box>
            <Text className="text-3xl">
              Here’s what’s going on
            </Text>

            <Text className="mt-2">
              Manage and keep track of all that happens on LearnBeta
            </Text>
          </Box>
        </Flex>
      </BackgroundImage>

      <Box className="px-4 sm:px-8 md:pl-8 md:pr-14 lg:pr-20 mt-5 lg:mt-8">
        <BackgroundImage
          src={hero_banner.src}
          className="h-36 bg-right md:block hidden rounded-xl text-white font-bold px-10"
        >
          <Flex className="h-full items-center">
            <Box>
              <Text className="text-3xl">
                Here’s what’s going on
              </Text>

              <Text className="mt-2">
                Manage and keep track of all that happens on LearnBeta
              </Text>
            </Box>
          </Flex>
        </BackgroundImage>

        <Box className="mt-5 lg:mt-8">
          <Box className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 sm:gap-4 max-w-[57.5rem] sm:grid-cols-2 xl:grid-cols-3">
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
                <Flex className="items-center space-x-8">
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

            {/* <TotalSkeleton />
            <TotalSkeleton />
            <TotalSkeleton /> */}

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
                <Flex className="items-center space-x-8">
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
                <Flex className="items-center space-x-8">
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

        <Box className="mt-4 lg:mt-7 px-2 py-3 overflow-x-scroll w-full no-scrollbar">
          <UserTable />
        </Box>
      </Box>
    </DashboardLayout>
  )
}

export default Overview