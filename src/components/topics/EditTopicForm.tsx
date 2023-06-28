import React from 'react';
import { Box, Divider, Text } from '@mantine/core';
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

interface Props {
  topic: {
    id: number;
    title: string;
    videoLink: string;
    transcript: string;
  },
  index: number
  handleUpdateTitle: (value: any, id: number) => void,
  handleUpdateVideoLink: (value: any, id: number) => void,
  handleUpdateTranscript: (value: any, id: number) => void,
}

export default function EditTopicForm({
  topic,
  index,
  handleUpdateTitle,
  handleUpdateVideoLink,
  handleUpdateTranscript
}: Props) {
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
    content: topic.transcript,
    onUpdate: (e) => {
      handleUpdateTranscript(e.editor.getHTML(), topic.id);
    },
  });

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

      <Box className='mt-5 lg:mt-0 w-full lg:border-l-4 border-[#FAA61A] lg:pl-8'>
        <Box className='md:flex md:space-x-6'>
          <Box className='w-full'>
            <Input
              type="text"
              label='Title'
              value={topic.title}
              onChange={({ target }) => handleUpdateTitle(target.value, topic.id)}
              placeholder="Enter Topic title"
              className={`w-full border-2 border-[#E2E2E2] focus:outline-[#FAA61A] px-3 py-5 text-[#555555] transition font-sans duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
            />
          </Box>

          <Box className='mt-5 md:mt-0 w-full'>
            <Input
              type="text"
              label='YouTube Link'
              value={topic.videoLink}
              onChange={({ target }) => handleUpdateVideoLink(target.value, topic.id)}
              placeholder="Enter YouTube Link"
              className={`w-full border-[#E2E2E2] focus:outline-[#FAA61A] border-2 px-3 py-5 text-[#555555] transition font-sans duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
            />
          </Box>
        </Box>

        <Box className='mt-5'>
          <TextEditor editor={editor} />
        </Box>
      </Box>
    </Box>
  )
}