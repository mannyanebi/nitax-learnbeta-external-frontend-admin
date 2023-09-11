import React, { useContext } from "react";
import Head from "next/head";
import ProfileNav from "@/components/nav/ProfileNav";
import PageLayout from "@/layouts/PageLayout";
import { Box, Center, Flex, Text, Grid } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import preview_subject from '../../../../assets/svgs/empty_state.svg'
import { AdminContext } from "@/contexts/AdminContext";

import backArrow from '../../../../assets/svgs/backarrow_icon.svg'
import { useQuery } from "react-query";
import { getStudentsPerformance } from "@/services/students";
import RefetchButton from "@/components/lessons/RefetchButton";
import { UserCardSkeleton } from "@/components/user/UserCard";

type Props = { index: number; score: any }

const StudentScoreCard: React.FC<Props> = ({ index, score }) => {
  return (
    <Box>
      <Grid className="py-2 rounded-b-lg mx-auto lg:px-8 w-full">
        <Grid.Col className="" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            {index + 1}
          </Text>
        </Grid.Col>

        <Grid.Col className="]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            {score.name}
          </Text>
        </Grid.Col>

        <Grid.Col className="]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            {score.score}%
          </Text>
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default function Performance() {
  const { query } = useRouter()

  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`

  const lessonId = Array.isArray(query.lessonId) ? query.lessonId[0] : query.lessonId;

  const studentsPerformance = useQuery('studentsPerformance', () => getStudentsPerformance(token, lessonId ? lessonId : ''))

  return (
    <PageLayout>
      <Head>
        <title>Students Performance</title>
      </Head>

      <ProfileNav />

      <Box className="w-full px-4 sm:px-8 md:px-10 mt-4">
        <Box className="max-w-[40rem] lg:max-w-[62rem] xl:max-w-[65rem] mx-auto">
          <Box className='w-fit'>
            <Link href='/dashboard/lessons'>
              <Flex className="max-w-[97rem] mx-auto space-x-2">
                <Center className="bg-[#FEEDD1] rounded-full p-2">
                  <Image
                    src={backArrow}
                    alt='back icon'
                    className="w-2 h-2"
                  />
                </Center>

                <Text className="font-bold">
                  Back
                </Text>
              </Flex>
            </Link>
          </Box>
        </Box>
      </Box>

      {studentsPerformance.data && 
        studentsPerformance.data.data.student_scores.length > 0 &&
          <Box className="w-full px-4 sm:px-8 md:px-10 my-10">
            <Text className="text-4xl font-bold text-center">
              {studentsPerformance.data.data.average_score}%
            </Text>

            <Text className="text-lg mt-3 font-bold text-center">
              Average Assessment Score
            </Text>

            <Box className="mt-10 w-full mx-auto max-w-[40rem] lg:max-w-[62rem] xl:max-w-[65rem] py-2 rounded-lg border border-[#E2E2E2]">
              <Grid className="bg-[#FFF6E8] lg:px-8 w-full rounded-t-lg mx-auto py-2">
                <Grid.Col span="auto">
                  <Text className='text-[#555555] font-semibold'>
                    S/N
                  </Text>
                </Grid.Col>

                <Grid.Col span="auto">
                  <Text className='text-[#555555] font-semibold'>
                    Name
                  </Text>
                </Grid.Col>

                <Grid.Col span="auto">
                  <Text className='text-[#555555] font-semibold'>
                    Score
                  </Text>
                </Grid.Col>
              </Grid>

              <Box className="mt-5 space-y-3 overflow-y-auto max-h-[41rem]">
                {studentsPerformance.data &&
                  studentsPerformance.data.data.student_scores.map((score: any, index: number) => (
                    <StudentScoreCard key={index} index={index} score={score} />
                  ))
                }
              </Box>
            </Box>
          </Box>
      }

      {studentsPerformance.isLoading &&
        <Box className="mt-10 rounded-lg mx-auto max-w-[40rem] lg:max-w-[62rem] xl:max-w-[65rem] space-y-3 py-5 px-3 border-2 border-[#E2E2E2]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num: number) => (
              <UserCardSkeleton key={num} />
            ))
          }
        </Box>
      }

      {studentsPerformance.isError &&
        <Box className="mt-10">
          <RefetchButton
            retry={() => studentsPerformance.refetch()}
            message="Failed to fetch students performance!"
          />
        </Box>
      }

      {studentsPerformance.data &&
        studentsPerformance.data.data.student_scores.length < 1 &&
        <Box className="w-full max-w-[50rem] mx-auto mt-10 px-4 sm:px-8">
          <Center className='h-[35rem] bg-gradient-to-br from-[#FAAB2E] to-[#d9f3f1] rounded-2xl'>
            <Box>
              <Image
                alt='icon'
                priority
                src={preview_subject}
                className='w-[20rem] mx-auto'
              />
              <Text className='text-[#00433F] font-semibold mt-10 text-lg xl:text-2xl text-center'>
                No assessment record found!
              </Text>
            </Box>
          </Center>
        </Box>
      }
    </PageLayout>
  )
}