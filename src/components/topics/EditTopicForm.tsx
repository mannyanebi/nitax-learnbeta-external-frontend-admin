import React, { useState, useContext } from 'react';
import { Box, Divider, Text, Flex, UnstyledButton, Skeleton } from '@mantine/core';
import TextEditor from '../custom/RichEditor';
import Input from '../custom/Input';
import { Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { TopicObjType } from '../lessons/LessonsCard';
import { AdminContext } from '@/contexts/AdminContext';
import { TopicPayloadType, updateTopic } from '@/services/topics';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

export function EditTopicFormSkeleton() {
  return (
    <Box className='lg:flex lg:items-center lg:space-x-'>
      <Box className='lg:hidden'>
        <Divider
          size="md"
          color='#E7EAED'
          className='animate-pulse'
          label={
            <Skeleton className='w-16 h-5 rounded-md'/>
          }
        />
      </Box>

      <Box className='hidden mr-8 min-w-[6rem] max-w-[6rem] lg:block'>
        <Box>
          <Skeleton className='w-16 h-5 rounded-md' />
        </Box>
      </Box>

      <Box className='w-full'>
        <Box className='mt-5 lg:mt-0 w-full lg:border-l-4 border-[#E7EAED] animate-pulse lg:pl-8'>
          <Box className='md:flex md:space-x-6'>
            <Box className='w-full'>
              <Skeleton className='w-full h-14' />
            </Box>

            <Box className='mt-5 md:mt-0 w-full'>
              <Skeleton className='w-full h-14' />
            </Box>
          </Box>

          <Box className='mt-5'>
            <Skeleton className='w-full h-72' />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

interface Props {
  topic: TopicObjType,
  lessonId: string,
  index: number
}

export default function EditTopicForm({
  topic,
  lessonId,
  index
}: Props) {
  const { admin } = useContext(AdminContext)
  const token = `bearer ${admin?.data?.access_token}`

  const [title, setTitle] = useState<string>(topic.title)
  const [videoLink, setVideoLink] = useState<string>(topic.video_url)
  const [transcript, setTranscript] = useState<any>(topic.content)

  const [isDirty, setIsDirty] = useState(false)

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
      setIsDirty(true)
      setTranscript(e.editor.getHTML());
    },
  });
  
  const mutation = useMutation((data: TopicPayloadType) => updateTopic(lessonId, topic.id.toString(), token, data), {
    onError: () => {
      toast.error(`Failed to update topic ${topic.id.toString()}`)
    },

    onSuccess: () => {
      toast.success(`Topic ${topic.id.toString()} updated successfully`)

      setIsDirty(false)
    },
  })

  const handleUpdateTopic = () => {
    const topicPayload: TopicPayloadType = {
      lesson_id: Number(lessonId),
      title,
      content: transcript,
      video_url: videoLink
    }

    mutation.mutate(topicPayload)
  }

  return (
    <Box className='lg:flex lg:items-center lg:space-x-'>
      <Box className='lg:hidden'>
        <Divider
          size="md"
          color='#FAA61A'
          label={
            <Text className='font-[500] text-black text-xl truncate'>
              Topic {index + 1}
            </Text>
          }
        />
      </Box>

      <Box className='hidden mr-8 min-w-[6rem] max-w-[6rem] lg:block'>
        <Box>
          <Text className='font-[500] text-black text-xl truncate'>
            Topic {index + 1}
          </Text>
        </Box>
      </Box>

      <Box className='w-full'>
        <Box className='mt-5 lg:mt-0 w-full lg:border-l-4 border-[#FAA61A] lg:pl-8'>
          <Box className='md:flex md:space-x-6'>
            <Box className='w-full'>
              <Input
                type="text"
                label='Title'
                value={title}
                onChange={({ target }) => {
                  setTitle(target.value)
                  setIsDirty(true)
                }}
                placeholder="Enter Topic title"
                className={`w-full border-2 border-[#E2E2E2] focus:outline-[#FAA61A] px-3 py-5 text-[#555555] transition font-sans duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className='mt-5 md:mt-0 w-full'>
              <Input
                type="text"
                label='YouTube Link'
                value={videoLink}
                onChange={({ target }) => {
                  setVideoLink(target.value)
                  setIsDirty(true)
                }}
                placeholder="Enter YouTube Link"
                className={`w-full border-[#E2E2E2] focus:outline-[#FAA61A] border-2 px-3 py-5 text-[#555555] transition font-sans duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>
          </Box>

          <Box className='mt-5'>
            <TextEditor editor={editor} />
          </Box>
        </Box>
      
        {isDirty &&
          <Flex className='mt-5 justify-end'>
            <UnstyledButton
              disabled={mutation.isLoading}
              onClick={handleUpdateTopic}
              type="submit"
              className="px-8 text-sm h-12 disabled:opacity-50 w-44 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-2xl py-2 bg-[#FAA61A] text-white"
            >
              {mutation.isLoading ?
                <Icon
                  className={`animate-spin mx-auto`}
                  icon="icomoon-free:spinner2"
                  color="#white"
                  width="20"
                  height="20"
                /> :
                'Update Topic'
              }
            </UnstyledButton>
          </Flex>
        }
      </Box>
    </Box>
  )
}