import React, { useContext } from "react";
import { Box, Flex, Text, UnstyledButton, Divider } from "@mantine/core";
import { useQuery } from "react-query";
import { useDisclosure } from "@mantine/hooks";
import Head from "next/head";
import DashboardLayout from "@/layouts/DashboardLayout";
import people_group from '../../assets/svgs/users_group.svg'
import plus_icon from '../../assets/svgs/plus_icon.svg'
import NewClassModal from "@/components/classes/NewClassModal";
import { AdminContext } from "@/contexts/AdminContext";
import { getGradeLevels } from "@/services/grades";
import Image from "next/image";
import ClassCard, { ClassCardSkeleton } from "@/components/classes/ClassCard";
import { EmptyState } from "@/components/lessons/EmptyState";
import RefetchButton from "@/components/lessons/RefetchButton";
import { TotalSkeleton } from "@/components/analytics/TotalSkeleton";

type GradeLevelType = {
  id: number;
  name: string
}

const Classes = () => {
  const { admin } = useContext(AdminContext)
  const token = `bearer ${admin?.data?.access_token}`
  const [opened, { open, close }] = useDisclosure(false);

  const gradeLevels = useQuery('gradeLevels', () => getGradeLevels(token))

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Classes</title>
      </Head>
      
      <Box className="px-4 sm:px-8 md:pl-8 md:pr-14 lg:pr-20 mt-5 lg:mt-8">
        <Box className="lg:flex lg:justify-between space-y-3 lg:space-y-0 lg:space-x-6 sm:space-y-4 xl:max-w-[45rem] mx-auto">
          {gradeLevels.isLoading &&
            <TotalSkeleton />
          }

          {gradeLevels.data || gradeLevels.isError &&
            <Box className="border-2 w-full rounded-xl border-[#E2E2E2] p-5">
              <Flex className="h-full xl:hidden items-center justify-between">
                <Flex className="items-center space-x-3">
                  <Box className="h-[40px] w-[40px]">
                    <Image
                      alt='display icon'
                      src={people_group}
                      className='rounded-full h-[40px] w-[40px]'
                    />
                  </Box>

                  <Text className="text-[#777777] font-semibold text-lg">
                    Total Number of Classes
                  </Text>
                </Flex>

                <Text className="text-[#444444] font-bold text-xl">
                  {gradeLevels?.data?.data?.length > 1 ?
                    gradeLevels?.data?.data?.length : 0
                  }
                </Text>
              </Flex>

              <Box className="hidden xl:block">
                <Flex className="items-center space-x-8">
                  <Box className="h-[40px] w-[40px]">
                    <Image
                      alt='display icon'
                      src={people_group}
                      className='rounded-full h-[40px] w-[40px]'
                    />
                  </Box>

                  <Text className="text-[#777777] font-semibold">
                    Total Number of Classes
                  </Text>
                </Flex>

                <Text className="text-[#444444] text-center font-bold text-2xl">
                  {gradeLevels?.data?.data?.length > 1 ?
                    gradeLevels?.data?.data?.length : 0
                  }
                </Text>
              </Box>
            </Box>
          }

          <UnstyledButton onClick={open} className="h-full w-full">
            <Box className="border-2 rounded-xl flex items-center h-full border-[#E2E2E2] border-dashed p-5">
              <Box className="w-full">
                <Box className="h-full xl:hidden">
                  <Flex className="items-center space-x-3">
                    <Box className="h-[40px] w-[40px]">
                      <Image
                        alt='display icon'
                        src={plus_icon}
                        className='rounded-full h-[40px] w-[40px]'
                      />
                    </Box>

                    <Text className="text-[#777777] font-semibold text-lg">
                      Add New Class
                    </Text>
                  </Flex>
                </Box>

                <Box className="hidden xl:block">
                  <Flex className="justify-center">
                    <Box>
                      <Text className="text-[#777777] font-semibold">
                        Add New Class
                      </Text>

                      <Flex className="justify-center mt-2">
                        <Box className="h-[40px] w-[40px]">
                          <Image
                            alt='display icon'
                            src={plus_icon}
                            className='rounded-full h-[40px] w-[40px]'
                          />
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </UnstyledButton>
        </Box>

        <NewClassModal
          close={close}
          opened={opened}
        />

        <Divider
          className="mt-5 lg:mt-8"
          my="xs"
          size='sm'
          labelProps={{
            style: {
              fontSize: '1.125rem',
              fontWeight: 600
            }
          }}
          label="Classes"
        />

        <Box className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
          {gradeLevels.isLoading &&
            [1, 2, 3, 4, 5, 6, 7, 8].map((num: any) => (
              <ClassCardSkeleton key={num} />
            ))
          }

          {gradeLevels.data &&
            gradeLevels.data.data.map((gradeLevel: GradeLevelType) => (
              <ClassCard
                key={gradeLevel.id}
                gradeLevel={gradeLevel}
              />
            ))
          }
        </Box>

        {gradeLevels.data &&
          gradeLevels.data.data.length < 1 &&
          <EmptyState
            message="No classes available"
          />
        }

        {gradeLevels.isError &&
          <RefetchButton
            retry={() => gradeLevels.refetch()}
            message="Failed to fetch classes!"
          />
        }
      </Box>
    </DashboardLayout>
  )
}

export default Classes