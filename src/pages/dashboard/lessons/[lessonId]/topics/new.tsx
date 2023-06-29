import React, { useState } from 'react'
import { Box, Center, Flex, Text, UnstyledButton } from '@mantine/core'
import backArrow from '../../../../../assets/svgs/backarrow_icon.svg'
import Head from 'next/head'
import { useRouter } from 'next/router';
import ProfileNav from '@/components/nav/ProfileNav'
import PageLayout from '@/layouts/PageLayout'
import Image from 'next/image';
import NextLink from 'next/link';
import plus_icon from '../../../../../assets/svgs/plus_icon.svg'
import TopicForm from '@/components/topics/TopicForm';
import { Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import PreviewTopicCard from '@/components/topics/PreviewTopicCard';

const defaultTranscript = '<h4>You can <em>type</em> and <u>edit</u> your <strong>lesson</strong> <mark>material</mark> here. Enjoy!</h4>'

const AddTopics = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('')
  const [topicsArray, setTopicsArray] = useState<any>([])
  const [videoLink, setVideoLink] = useState<string>('')
  const [transcript, setTranscript] = useState<any>(defaultTranscript)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: transcript,
    onUpdate: (e) => {
      setTranscript(e.editor.getHTML());
    },
  });

  const handleNewTopic = () => {
    const topic = {
      id: Math.floor(1000 + Math.random() * 9000),
      title,
      videoLink,
      transcript
    }

    setTopicsArray((prevTopics: any) => [...prevTopics, topic]);
    setTitle('')
    setVideoLink('')
    setTranscript(defaultTranscript)
  }

  const handleRemoveTopic = (delId: number) => {
    const newTopicsArray = topicsArray.filter((i: any) => i.id !== delId);
    setTopicsArray(newTopicsArray);
  }

  return (
    <PageLayout>
      <Head>
        <title>Add Topics</title>
      </Head>

      <ProfileNav />

      <Box className="w-full px-4 sm:px-8 md:px-10 mt-4">
        <Box className='w-full max-w-[40rem] lg:max-w-[62rem] xl:max-w-[75rem] 2xl:max-w-[85rem] mx-auto pb-20'>
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
              <PreviewTopicCard 
                key={index}
                handleRemoveTopic={handleRemoveTopic}
                index={index}
                topic={topic}
              />
            ))}
          </Box>

          <Box className='mt-8'>
            <TopicForm 
              title={title}
              setTitle={setTitle}
              videoLink={videoLink}
              setVideoLink={setVideoLink}
              editor={editor}
            />
          </Box>

          <Box className='max-w-[20rem] mt-10 mx-auto'>
            <UnstyledButton
              disabled={!title || !videoLink || transcript.length < 8}
              onClick={handleNewTopic}
              className="h-full w-full disabled:opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg border-[#777777] border-2 border-dashed"
            >
              <Box className="rounded-xl flex items-center h-full p-5">
                <Box className="w-full">
                  <Flex className="justify-center">
                    <Box>
                      <Text className="text-[#777777] font-semibold">
                        Add Topic
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
            </UnstyledButton>
          </Box>

          <Flex className='mt-20 justify-end'>
            <UnstyledButton
              disabled={topicsArray.length < 1 && true}
              type="submit"
              className="px-10 h-14 disabled:opacity-50 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-2xl py-4 bg-[#FAA61A] text-white"
            >
              Submit Topics
            </UnstyledButton>
          </Flex>
        </Box>
      </Box>
    </PageLayout>
  )
}

export default AddTopics