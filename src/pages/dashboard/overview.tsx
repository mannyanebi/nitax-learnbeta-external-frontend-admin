import React, { useContext, useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import Head from "next/head";
import hero_banner from '../../assets/svgs/hero_banner.svg'
import { BackgroundImage, Box, Flex, Text } from "@mantine/core";
import Image from "next/image";
import users_group from '../../assets/svgs/users_group.svg'
import users_green from '../../assets/svgs/users_group_green.svg'
import { TotalSkeleton } from "@/components/analytics/TotalSkeleton";
import { useQuery } from 'react-query'
import UserTable, { UserTableEmpty } from "@/components/user/UserTable";
import users_yellow from '../../assets/svgs/users_group_yellow.svg'
import { AdminContext } from "@/contexts/AdminContext";
import { getStudents } from "@/services/students";
import { UserCardSkeleton } from "@/components/user/UserCard";
import RefetchButton from "@/components/lessons/RefetchButton";

const Overview = () => {
  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`
  const students = useQuery('students', () => getStudents(token))

  const [activeSubscribers, setActiveSubscribers] = useState(0);
  const [inactiveSubscribers, setInactiveSubscribers] = useState(0);

  useEffect(() => {
    const activeSubscribersCount = students.data?.data.filter((user: any) => {
      // Check if the user has a subscription and it's not expired
      return user.subscription && !user.subscription.is_expired;
    }).length;

    setActiveSubscribers(activeSubscribersCount);

    const inactiveSubscribersCount = students.data?.data.filter((user: any) => {
      // Check if the user has a subscription, but it's expired or if there's no subscription
      return !user.subscription || user.subscription.is_expired;
    }).length;

    setInactiveSubscribers(inactiveSubscribersCount);
  }, [students.data?.data]);


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
            {students.isLoading &&
              <TotalSkeleton />
            }

            {students.isLoading &&
              <TotalSkeleton />
            }

            {students.isLoading &&
              <TotalSkeleton />
            }

            {students.data &&
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
                    {students.data.data.length > 0 ? 
                      students.data.data.length :
                      '0'
                    }
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
                    {students.data.data.length > 0 ?
                      students.data.data.length :
                      '0'
                    }
                  </Text>
                </Box>
              </Box>
            }

            {students.data &&
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
                    {activeSubscribers}
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
                    {activeSubscribers}
                  </Text>
                </Box>
              </Box>
            }

            {students.data &&
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
                      Inactive Subscribers
                    </Text>
                  </Flex>

                  <Text className="text-[#444444] font-bold text-xl">
                    {inactiveSubscribers}
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
                      Inactive Subscribers
                    </Text>
                  </Flex>

                  <Text className="text-[#444444] text-center font-bold text-2xl">
                    {inactiveSubscribers}
                  </Text>
                </Box>
              </Box>
            }
          </Box>
        </Box>

        {students.data &&
          <Box className="mt-4 lg:mt-7 px-2 py-3 overflow-x-scroll w-full no-scrollbar">
            <UserTable students={students} />
          </Box>
        }

        {students.data &&
          students.data.data.length < 1 &&
            <Box className="mt-4 lg:mt-7 w-full">
              <UserTableEmpty />
            </Box>
        }

        {students.isLoading &&
          <Box className="mt-4 lg:mt-7 rounded-lg space-y-3 py-5 px-3 border-2 border-[#E2E2E2]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num: number) => (
              <UserCardSkeleton key={num} />
            ))
            }
          </Box>  
        }

        {students.isError &&
          <Box className="mt-4 lg:mt-7">
            <RefetchButton
              retry={() => students.refetch()}
              message="Failed to fetch students!"
            />
          </Box>
        }
      </Box>
    </DashboardLayout>
  )
}

export default Overview