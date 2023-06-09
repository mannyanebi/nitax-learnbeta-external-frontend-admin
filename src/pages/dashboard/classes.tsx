import React from "react";
import { Box, Flex, Text, UnstyledButton, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Head from "next/head";
import DashboardLayout from "@/layouts/DashboardLayout";
import people_group from '../../assets/svgs/users_group.svg'
import plus_icon from '../../assets/svgs/plus_icon.svg'
import NewClassModal from "@/components/classes/NewClassModal";
import Image from "next/image";
import ClassCard, { ClassCardSkeleton } from "@/components/classes/ClassCard";

const Classes = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Classes</title>
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
                    src={people_group}
                    className='rounded-full h-[40px] w-[40px]'
                  />
                </Box>

                <Text className="text-[#777777] font-semibold text-lg">
                  Total Number of Classes
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
                    src={people_group}
                    className='rounded-full h-[40px] w-[40px]'
                  />
                </Box>

                <Text className="text-[#777777] font-semibold">
                  Total Number of Classes
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
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />

          <ClassCardSkeleton />
          <ClassCardSkeleton />
          <ClassCardSkeleton />
          <ClassCardSkeleton />
          <ClassCardSkeleton />
          <ClassCardSkeleton />
          <ClassCardSkeleton />
          <ClassCardSkeleton />
        </Box>
      </Box>
    </DashboardLayout>
  )
}

export default Classes