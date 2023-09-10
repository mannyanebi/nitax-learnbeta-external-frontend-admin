import React, { useContext } from "react";
import Head from "next/head";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import ProfileNav from "@/components/nav/ProfileNav";
import PageLayout from "@/layouts/PageLayout";
import { useQuery } from "react-query";
import { AdminContext } from "@/contexts/AdminContext";
import { Box, Center, Flex, Text, Tabs } from '@mantine/core'
import backArrow from '../../../../../assets/svgs/backarrow_icon.svg'
import { getTheoryAssessments, getQuizAssessments } from "@/services/assessment";
import Image from "next/image";
import EditTheoryAssessmentForm, { EditTheoryAssessmentSkeleton } from "@/components/assessment/EditTheoryAssessmentForm";
import { EmptyState } from "@/components/lessons/EmptyState";
import RefetchButton from "@/components/lessons/RefetchButton";
import EditQuizAssessmentForm, { EditQuizAssessmentSkeleton, QuizQuestion } from "@/components/assessment/EditQuizAssessmentForm";

type TheoryQuestionType = {
  id: number;
  question: string;
  answer: string;
  assessment_type: string;
  lesson_id: number;
};

export default function EditAssessments() {
  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`

  const router = useRouter();

  const lessonId: string = typeof router.query.lessonId === 'string' ? router.query.lessonId : ''

  const theoryAssessments = useQuery(['theoryAssessments', Number(router.query.lessonId)], () => getTheoryAssessments(lessonId, token))

  const quizAssessments = useQuery(['quizAssessments', Number(router.query.lessonId)], () => getQuizAssessments(lessonId, token))

  return (
    <PageLayout>
      <Head>
        <title>
          Edit Assessments
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
                <Box className="space-y-8 lg:space-y-20">
                  {quizAssessments.data &&
                    quizAssessments.data.data.map((question: QuizQuestion, index: number) => (
                      <EditQuizAssessmentForm
                        key={question.id}
                        index={index}
                        question={question}
                      />
                    ))
                  }

                  {quizAssessments.data &&
                    quizAssessments.data.data.length < 1 &&
                    <EmptyState
                      message="No quiz question(s) available"
                    />
                  }

                  {quizAssessments.isLoading &&
                    [1, 2, 3].map((num: number) => (
                      <EditQuizAssessmentSkeleton key={num} />
                    ))
                  }

                  {quizAssessments.isError &&
                    <RefetchButton
                      retry={() => quizAssessments.refetch()}
                      message='Failed to fetch quiz question(s)'
                    />
                  }
                </Box>
              </Tabs.Panel>

              <Tabs.Panel className="mt-5" value="theory" pt="xs">
                <Box className="space-y-8 lg:space-y-20">
                  {theoryAssessments.data &&
                    theoryAssessments.data.data.map((question: TheoryQuestionType, index: number) => (
                      <EditTheoryAssessmentForm
                        index={index}
                        key={question.id}
                        question={question}
                      />
                    ))
                  }

                  {theoryAssessments.data &&
                    theoryAssessments.data.data.length < 1 &&
                    <EmptyState
                      message="No theory question(s) available"
                    />
                  }

                  {theoryAssessments.isLoading &&
                    [1, 2, 3].map((num: number) => (
                      <EditTheoryAssessmentSkeleton key={num} />
                    ))
                  }

                  {theoryAssessments.isError &&
                    <RefetchButton
                      retry={() => theoryAssessments.refetch()}
                      message='Failed to fetch theory question(s)'
                    />
                  }
                </Box>
              </Tabs.Panel>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  )
}