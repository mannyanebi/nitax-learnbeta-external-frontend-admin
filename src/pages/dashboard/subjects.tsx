import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import Head from "next/head";
import { Box, Flex, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import record_icon from '../../assets/svgs/subjects_icon.svg'
import plus_icon from '../../assets/svgs/plus_icon.svg'
import NewSubjectsModal from "@/components/subjects/NewSubjectsModal";

const Subjects = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Subjects</title>
      </Head>
      
      <Box className="px-4 sm:px-6 lg:px-8 mt-5 lg:mt-8">
        <Box className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 sm:gap-4 max-w-[70rem] sm:grid-cols-2 xl:grid-cols-3">
          <Box className="hidden xl:block" />

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
                12
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
                  Total Number of Subjects
                </Text>
              </Flex>

              <Text className="text-[#444444] text-center font-bold text-2xl">
                12
              </Text>
            </Box>
          </Box>

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
      </Box>
    </DashboardLayout>
  )
}

export default Subjects