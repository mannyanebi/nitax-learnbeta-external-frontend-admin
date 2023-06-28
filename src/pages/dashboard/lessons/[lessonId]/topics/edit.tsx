import React, { useState } from "react";
import Head from "next/head";
import { Box, Center, Text, Flex, UnstyledButton } from "@mantine/core";
import ProfileNav from "@/components/nav/ProfileNav";
import PageLayout from "@/layouts/PageLayout";
import { useRouter } from 'next/router';
import NextLink from 'next/link'
import backArrow from '../../../../../assets/svgs/backarrow_icon.svg'
import EditTopicForm from "@/components/topics/EditTopicForm";
import Image from "next/image";

const data = [
  {
    id: 1,
    title: 'Numbers',
    videoLink: 'youtube.com',
    transcript: '<h4>Numbers youtube.com</h4>'
  },

  {
    id: 2,
    title: 'Sets',
    videoLink: 'facebook.com',
    transcript: '<h4>Sets facebook.com</h4>'
  },

  {
    id: 3,
    title: 'Metrics',
    videoLink: 'instagram.com',
    transcript: '<h4>Metrics instagram.com</h4>'
  },
]

export default function Performance() {
  const router = useRouter();
  const [isDirty ,setIsDirty] = useState(false)
  const [topicsArray, setTopicsArray] = useState<any>(data)

  const handleUpdateTitle = (value: any, id: number) => {
    setTopicsArray((prevTopicsArray: any) =>
      prevTopicsArray.map((topic: any) =>
        topic.id === id ? { ...topic, title: value } : topic
      )
    );

    setIsDirty(true)
  };

  const handleUpdateVideoLink = (value: any, id: number) => {
    setTopicsArray((prevTopicsArray: any) =>
      prevTopicsArray.map((topic: any) =>
        topic.id === id ? { ...topic, videoLink: value } : topic
      )
    );

    setIsDirty(true)
  };

  const handleUpdateTranscript = (value: any, id: number) => {
    setTopicsArray((prevTopicsArray: any) =>
      prevTopicsArray.map((topic: any) =>
        topic.id === id ? { ...topic, transcript: value } : topic
      )
    );

    setIsDirty(true)
  };


  return (
    <PageLayout>
      <Head>
        <title>
          Edit Topics
        </title>
      </Head>

      <ProfileNav />

      <Box className="w-full px-4 sm:px-6 lg:px-8 mt-4">
        <Box className='w-full max-w-[63rem] xl:max-w-[75rem] 2xl:max-w-[85rem] mx-auto pb-20'>
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
            {topicsArray.map((topic: any, index: number) => (
              <EditTopicForm
                key={topic.id}
                index={index}
                topic={topic}
                handleUpdateTitle={handleUpdateTitle}
                handleUpdateVideoLink={handleUpdateVideoLink}
                handleUpdateTranscript={handleUpdateTranscript}
              />
            ))}
          </Box>

          <Flex className='mt-20 justify-end'>
            <UnstyledButton
              disabled={!isDirty}
              type="submit"
              className="px-10 h-14 disabled:opacity-50 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-2xl py-4 bg-[#FAA61A] text-white"
            >
              Save changes
            </UnstyledButton>
          </Flex>
        </Box>
      </Box>  
    </PageLayout>
  )
}