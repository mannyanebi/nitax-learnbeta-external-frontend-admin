import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Text, Flex, Modal, UnstyledButton } from "@mantine/core";
import DashboardLayout from "@/layouts/DashboardLayout";
import { NoSubjectSelected } from "@/components/lessons/EmptyState";
import SubjectControl from "@/components/lessons/SubjectControl";
import { SubjectControlSkeleton } from "@/components/lessons/SubjectControl";
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import Image from 'next/image'
import plus_icon from '../../../assets/svgs/plus_icon.svg'
import LessonsCard, { LessonsCardSkeleton } from "@/components/lessons/LessonsCard";
import NewLessonModal from "@/components/lessons/NewLessonModal";

const Lessons = () => {
  const { width } = useViewportSize();
  const [activeLessons, setActiveLessons] = useState<any>(null)
  const [
    openedMobile,
    { open: openMobile, close: closeMobile }
  ] = useDisclosure(false);
  const [
    openedNewLessonModal,
    { open: openNewLessonModal, close: closeNewLessonModal }
  ] = useDisclosure(false);

  useEffect(() => {
    width > 1024 && closeMobile()
    activeLessons && width < 1024 && openMobile()
  }, [width])

  const subjectsArray = [
    {
      id: 1,
      name: 'Mathematics',
      lessons: [
        {
          id: 2342145,
          name: 'Lesson 1'
        }, 
        {
          id: 3456543,
          name: 'Lesson 2'
        }
      ]
    },
    {
      id: 2,
      name: 'Physics',
      lessons: [
        {
          id: 7842145,
          name: 'Lesson 1'
        },
        {
          id: 3776543,
          name: 'Lesson 2'
        },
        {
          id: 1276543,
          name: 'Lesson 3'
        },
        {
          id: 3700543,
          name: 'Lesson 4'
        }
      ]
    },
    {
      id: 3,
      name: 'English',
      lessons: [
        {
          id: 7800145,
          name: 'Lesson 1'
        },
      ]
    },
    {
      id: 4,
      name: 'Chemistry',
      lessons: [
        {
          id: 7845145,
          name: 'Lesson 1'
        },
        {
          id: 3726543,
          name: 'Lesson 2'
        },
        {
          id: 1216543,
          name: 'Lesson 3'
        },
        {
          id: 3709543,
          name: 'Lesson 4'
        }
      ]
    }
  ]
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Lessons</title>
      </Head>

      <Box>
        <Box className="w-full lg:h-[100%] lg:max-w-[14rem] lg:fixed no-scrollbar overflow-y-auto">
          <Box className="pb-20 lg:pb-40 px-4 sm:px-8 md:pl-6 md:pr-14 lg:pr-6 space-y-4 w-full lg:border-r-2 border-[#E2E2E2] pt-5">
            <Text className='text-[#444444] font-semibold text-lg'>Subjects</Text>

            {subjectsArray.map((item) => (
              <SubjectControl
                key={item.id}
                setActiveLessons={setActiveLessons}
                activeLessons={activeLessons}
                openMobile={openMobile}
                item={item}
              />
            ))}

            <SubjectControlSkeleton />
            <SubjectControlSkeleton />
            <SubjectControlSkeleton />
            <SubjectControlSkeleton />
          </Box>
        </Box>

        {/* Preview Lessons Mobile Modal start */}
        <Modal
          fullScreen
          padding={0}
          opened={openedMobile}
          onClose={() => {
            closeMobile()
            setActiveLessons(null)
          }}
          size='lg'
          radius={12}
        >
          {activeLessons &&
            <Box className="px-4 sm:px-8 pb-20 md:px-10">
              <Box className="max-w-[40rem] lg:max-w-[62rem] xl:max-w-[75rem] 2xl:max-w-[85rem] mx-auto ">
                <Box className='w-fit mx-auto mt-4'>
                  <UnstyledButton onClick={openNewLessonModal}>
                    <Box className="border-2 w-[285px] rounded-2xl flex items-center h-full border-[#E2E2E2] border-dashed p-5">
                      <Box className="w-full">
                        <Flex className="justify-center">
                          <Box>
                            <Text className="text-[#777777] font-semibold">
                              Add New Lesson
                            </Text>

                            <Flex className="justify-center mt-4">
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
                  </UnstyledButton>
                </Box>

                <Text className='text-[#444444] mt-7 font-semibold text-lg'>
                  Lessons
                </Text>

                <Box className="space-y-4 mt-7">
                  <LessonsCardSkeleton />
                  <LessonsCardSkeleton />

                  {activeLessons.lessons.map((lesson: any, index: number) => (
                    <LessonsCard
                      key={index}
                      lesson={lesson}
                    />
                  ))}
                </Box>

                <Text className='text-[#444444] mt-10 font-semibold text-lg'>
                  Archived Lessons
                </Text>

                <Box className="space-y-4 mt-7">
                  {activeLessons.lessons.map((lesson: any, index: number) => (
                    <LessonsCard
                      key={index}
                      lesson={lesson}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          }
        </Modal>
        {/* Preview Lessons Mobile Modal end */}

        <Box className="ml-[14rem] hidden lg:block px-4 sm:px-8 md:pl-8 md:pr-14 lg:pr-20 space-y-8 pt-5">
          {activeLessons &&
            <Box>
              <Text className='text-[#444444] font-semibold text-lg'>
                Lessons
              </Text>

              <Box className='w-fit mx-auto mt-4'>
                <UnstyledButton onClick={openNewLessonModal}>
                  <Box className="border-2 w-[285px] rounded-2xl flex items-center h-full border-[#E2E2E2] border-dashed p-5">
                    <Box className="w-full">
                      <Flex className="justify-center">
                        <Box>
                          <Text className="text-[#777777] font-semibold">
                            Add New Lesson
                          </Text>

                          <Flex className="justify-center mt-4">
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
                </UnstyledButton>
              </Box>

              <Box className="space-y-4 mt-7">
                <LessonsCardSkeleton />
                <LessonsCardSkeleton />

                {activeLessons.lessons.map((lesson: any, index: number) => (
                  <LessonsCard
                    key={index}
                    lesson={lesson}
                  />
                ))}
              </Box>

              <Text className='text-[#444444] mt-10 font-semibold text-lg'>
                Archived Lessons
              </Text>

              <Box className="space-y-4 mt-7">
                {activeLessons.lessons.map((lesson: any, index: number) => (
                  <LessonsCard
                    key={index}
                    lesson={lesson}
                  />
                ))}
              </Box>
            </Box>
          }

          {!activeLessons &&
            <Box className="mt-10">
              <NoSubjectSelected />
            </Box>
          }
        </Box>
      </Box>

      <NewLessonModal 
        opened={openedNewLessonModal} 
        close={closeNewLessonModal} 
      />
    </DashboardLayout>
  )
}

export default Lessons