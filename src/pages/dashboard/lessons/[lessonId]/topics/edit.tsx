import React, { useState, useContext } from "react";
import Head from "next/head";
import { Box, Center, Text, Flex, UnstyledButton } from "@mantine/core";
import ProfileNav from "@/components/nav/ProfileNav";
import PageLayout from "@/layouts/PageLayout";
import { useRouter } from 'next/router';
import NextLink from 'next/link'
import backArrow from '../../../../../assets/svgs/backarrow_icon.svg'
import { Toaster } from "react-hot-toast";
import { AdminContext } from "@/contexts/AdminContext";
import EditTopicForm, { EditTopicFormSkeleton } from "@/components/topics/EditTopicForm";
import { useQuery } from "react-query";
import { getLessonTopics } from "@/services/topics";
import Image from "next/image";
import { TopicObjType } from "@/components/lessons/LessonsCard";
import RefetchButton from "@/components/lessons/RefetchButton";
import { EmptyState } from "@/components/lessons/EmptyState";

export default function EditTopics() {
  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`

  const router = useRouter();

  const lessonId: string = typeof router.query.lessonId === 'string' ? router.query.lessonId : ''

  const topics = useQuery(['topics', Number(router.query.lessonId)], () => getLessonTopics(lessonId, token))

  return (
    <PageLayout>
      <Head>
        <title>
          Edit Topics
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

          <Box className='mt-8 space-y-10 lg:space-y-14'>
            {topics.data &&
              topics.data.data.map((topic: TopicObjType, index: number) => (
                <EditTopicForm
                  key={topic.id}
                  index={index}
                  lessonId={lessonId}
                  topic={topic}
                />
              ))
            }

            {topics.data &&
              topics.data.data.length < 1 &&
              <EmptyState
                message="No topics available"
              />
            }

            {topics.isLoading &&
              [1, 2, 3].map((num: number) => (
                <EditTopicFormSkeleton key={num} />
              ))
            }

            {topics.isError &&
              <RefetchButton
                retry={() => topics.refetch()}
                message='Failed to fetch topics'
              />
            }
          </Box>
        </Box>
      </Box>
    </PageLayout>
  )
}