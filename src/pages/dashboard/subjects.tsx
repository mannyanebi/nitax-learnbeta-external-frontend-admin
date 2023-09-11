import React, { useContext } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import Head from "next/head";
import { Box, Flex, Text, UnstyledButton, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import record_icon from '../../assets/svgs/subjects_icon.svg'
import plus_icon from '../../assets/svgs/plus_icon.svg'
import NewSubjectsModal from "@/components/subjects/NewSubjectsModal";
import SubjectCard, { SubjectCardSkeleton } from "@/components/subjects/SubjectCard";
import { useQuery } from 'react-query'
import { getSubjects } from "@/services/subjects";
import { AdminContext } from "@/contexts/AdminContext";
import { EmptyState } from "@/components/lessons/EmptyState";
import RefetchButton from "@/components/lessons/RefetchButton";
import { TotalSkeleton } from "@/components/analytics/TotalSkeleton";

export type SubjectType = {
  id: number;
  name: string;
  description: string;
  image: string;
  grade_level_name: string;
  created_at: string;
  updated_at: string;
};

const Subjects = () => {
  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`
  const [opened, { open, close }] = useDisclosure(false);
  const subjects = useQuery('subjects', () => getSubjects(token))

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Subjects</title>
      </Head>

      <Box className="px-4 sm:px-8 md:pl-8 md:pr-14 lg:pr-20 mt-5 lg:mt-8">
        <Box className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 sm:gap-4 max-w-[57.5rem] xl:grid-cols-3">
          <Box className="hidden xl:block" />

          {subjects.isLoading &&
            <TotalSkeleton />
          }

          {subjects.data &&
            <Box className="border-2 rounded-xl border-[#E2E2E2] p-5">
              <Flex className="h-full xl:hidden items-center justify-between">
                <Flex className="items-center space-x-3">
                  <Box className="h-[40px] w-[40px]">
                    <Image
                      alt='display icon'
                      src={record_icon}
                      className='rounded-full h-[40px] w-[40px]'
                    />
                  </Box>

                  <Text className="text-[#777777] font-semibold text-lg">
                    Total Number of Subjects
                  </Text>
                </Flex>

                <Text className="text-[#444444] font-bold text-xl">
                  {subjects.data.data.length > 0 ?
                    subjects.data.data.length : 0
                  }
                </Text>
              </Flex>

              <Box className="hidden xl:block">
                <Flex className="items-center space-x-8">
                  <Box className="h-[40px] w-[40px]">
                    <Image
                      alt='display icon'
                      src={record_icon}
                      className='rounded-full h-[40px] w-[40px]'
                    />
                  </Box>

                  <Text className="text-[#777777] font-semibold">
                    Total No of Subjects
                  </Text>
                </Flex>

                <Text className="text-[#444444] text-center font-bold text-2xl">
                  {subjects.data.data.length > 1 ?
                    subjects.data.data.length : 0
                  }
                </Text>
              </Box>
            </Box>
          }

          {subjects.isError &&
            <Box className="border-2 rounded-xl border-[#E2E2E2] p-5">
              <Flex className="h-full xl:hidden items-center justify-between">
                <Flex className="items-center space-x-3">
                  <Box className="h-[40px] w-[40px]">
                    <Image
                      alt='display icon'
                      src={record_icon}
                      className='rounded-full h-[40px] w-[40px]'
                    />
                  </Box>

                  <Text className="text-[#777777] font-semibold text-lg">
                    Total Number of Subjects
                  </Text>
                </Flex>

                <Text className="text-[#444444] font-bold text-xl">
                  0
                </Text>
              </Flex>

              <Box className="hidden xl:block">
                <Flex className="items-center space-x-8">
                  <Box className="h-[40px] w-[40px]">
                    <Image
                      alt='display icon'
                      src={record_icon}
                      className='rounded-full h-[40px] w-[40px]'
                    />
                  </Box>

                  <Text className="text-[#777777] font-semibold">
                    Total No of Subjects
                  </Text>
                </Flex>

                <Text className="text-[#444444] text-center font-bold text-2xl">
                  0
                </Text>
              </Box>
            </Box>
          }

          <UnstyledButton onClick={open} className="h-full">
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
                      Add New Subject
                    </Text>
                  </Flex>
                </Box>

                <Box className="hidden xl:block">
                  <Flex className="justify-center">
                    <Box>
                      <Text className="text-[#777777] font-semibold">
                        Add New Subjects
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

        <NewSubjectsModal
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
          label="Subject"
        />

        <Box className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 sm:gap-4 max-w-[57.5rem] sm:grid-cols-2 xl:grid-cols-3">
          {subjects.isLoading &&
            [1, 2, 3, 4, 5, 6].map((num: any) => (
              <SubjectCardSkeleton key={num} />
            ))
          }

          {subjects.data &&
            subjects.data.data.map((subject: SubjectType) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
              />
            ))
          }
        </Box>

        {subjects.data &&
          subjects.data.data.length < 1 &&
          <EmptyState
            message="No subjects available"
          />
        }

        {subjects.isError &&
          <RefetchButton
            retry={() => subjects.refetch()}
            message="Failed to fetch subjects!"
          />
        }
      </Box>
    </DashboardLayout>
  )
}

export default Subjects