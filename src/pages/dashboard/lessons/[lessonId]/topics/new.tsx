import React, { useContext, useState } from 'react'
import { Box, Center, Flex, Text, UnstyledButton } from '@mantine/core'
import backArrow from '../../../../../assets/svgs/backarrow_icon.svg'
import Head from 'next/head'
import { useRouter } from 'next/router';
import ProfileNav from '@/components/nav/ProfileNav'
import PageLayout from '@/layouts/PageLayout'
import Image from 'next/image';
import NextLink from 'next/link';
import plus_icon from '../../../../../assets/svgs/plus_icon.svg'
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from 'react-query';
import TopicForm from '@/components/topics/TopicForm';
import { Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { addNewTopic, TopicPayloadType } from '@/services/topics';
import { AdminContext } from '@/contexts/AdminContext';

const defaultTranscript = '<h4>You can <em>type</em> and <u>edit</u> your <strong>lesson</strong> <mark>material</mark> here. Enjoy!</h4>'

const AddTopics = () => {
  const { admin } = useContext(AdminContext)
  const token = `bearer ${admin?.data?.access_token}`

  const router = useRouter();
  const [title, setTitle] = useState<string>('')
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

  const lessonId: string = typeof router.query.lessonId === 'string' ? router.query.lessonId : ''

  const mutation = useMutation((data: TopicPayloadType) => addNewTopic(lessonId, token, data), {
    onError: () => {
      toast.error('Failed to add new topic')
    },

    onSuccess: () => {
      toast.success('New topic added')

      setTitle('')
      setVideoLink('')
      setTranscript('defaultTranscript')
    },
  })

  const handleAddTopic = () => {
    const topicPayload: TopicPayloadType = {
      lesson_id: Number(router.query.lessonId),
      title,
      content: transcript,
      video_url: videoLink
    }

    mutation.mutate(topicPayload)
  }

  return (
    <PageLayout>
      <Head>
        <title>Add Topic</title>
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

          <Box className='mt-8'>
            <TopicForm
              title={title}
              setTitle={setTitle}
              videoLink={videoLink}
              setVideoLink={setVideoLink}
              editor={editor}
            />
          </Box>

          <Flex className='mt-20 justify-end'>
            <UnstyledButton
              disabled={!title || !videoLink || !transcript}
              onClick={handleAddTopic}
              type="submit"
              className="px-10 h-14 disabled:opacity-50 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-2xl py-4 bg-[#FAA61A] text-white"
            >
              Add Topic
            </UnstyledButton>
          </Flex>
        </Box>
      </Box>
    </PageLayout>
  )
}

export default AddTopics