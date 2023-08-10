import React from "react";
import Head from "next/head";
import { Box, Center, Flex, Text, Tabs } from '@mantine/core'
import backArrow from '../../../../../assets/svgs/backarrow_icon.svg'
import { useRouter } from "next/router";
import Image from "next/image";
import NextLink from 'next/link';
import { Toaster } from "react-hot-toast";
import ProfileNav from "@/components/nav/ProfileNav";
import PageLayout from "@/layouts/PageLayout";
import NewQuizAssessmentForm from "@/components/assessment/NewQuizAssessmentForm";

export default function AddAssessment() {
  const router = useRouter();

  const lessonId: string = typeof router.query.lessonId === 'string' ? router.query.lessonId : ''

  return (
    <PageLayout>
      <Head>
        <title>
          Add Assessment
        </title>
      </Head>

      <ProfileNav />

      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />

      <Box className="w-full px-4 sm:px-8 md:px-10 mt-4">
        <Box className='w-full max-w-[40rem] lg:max-w-[62rem] xl:max-w-[65rem] mx-auto pb-20'>
          <Box className="w-fit">
            <NextLink href='/dashboard/lessons'>
              <Flex className=" mx-auto space-x-2">
                <Center className="bg-[#FEEDD1] rounded-full p-2">
                  <Image
                    src={backArrow}
                    alt='back icon'
                    className="w-2 h-2"
                  />
                </Center>

                <Text className="font-bold">Back</Text>
              </Flex>
            </NextLink>
          </Box>

          <Box className='mt-5 lg:mt-8'>
            <Tabs
              unstyled
              defaultValue="quiz"
              styles={(theme) => ({
                tab: {
                  ...theme.fn.focusStyles(),
                  color: '#777777',
                  cursor: 'pointer',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  fontFamily: "Montserrat Variable, sans-serif",
                  fontSize: theme.fontSizes.sm,
                  display: 'flex',
                  alignItems: 'center',
                  width: '130px',
                  justifyContent: 'center',

                  '&[data-active]': {
                    backgroundColor: 'white',
                    borderColor: 'white',
                    fontWeight: 600,
                    color: '#FAA61A',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }
                },

                tabsList: {
                  display: 'flex',
                  backgroundColor: '#F4F4F4',
                  borderRadius: '9999px',
                  padding: '5px',
                  height: '50px'
                },
              })}
            >
              <Box className="p-1 w-fit mx-auto mt-3">
                <Tabs.List>
                  <Tabs.Tab value="quiz">
                    Quiz
                  </Tabs.Tab>

                  <Tabs.Tab value="theory">
                    Theory
                  </Tabs.Tab>
                </Tabs.List>
              </Box>

              <Tabs.Panel className="mt-5" value="quiz" pt="xs">
                <NewQuizAssessmentForm 
                  lesson_id={Number(lessonId)}
                />
              </Tabs.Panel>

              <Tabs.Panel className="mt-5" value="theory" pt="xs">
                <Box>
                  theory
                </Box>
              </Tabs.Panel>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  )
}