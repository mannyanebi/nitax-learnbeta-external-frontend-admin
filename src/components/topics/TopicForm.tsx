import React from 'react';
import { Box, Divider, Text, Flex } from '@mantine/core';
import { Icon } from '@iconify/react';
import TextEditor from '../custom/RichEditor';
import Input from '../custom/Input';

interface Props {
  editor: any,
  title: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  videoLink: string,
  setVideoLink: React.Dispatch<React.SetStateAction<string>>
}

export default function TopicForm ({ 
  editor,
  title,
  setTitle,
  videoLink,
  setVideoLink
}: Props){
  return (
    <Box className='lg:flex lg:items-center lg:space-x-'>
      <Box className='lg:hidden'>
        <Divider
          size="md"
          color='#FAA61A'
          label={
            <Flex className='items-center space-x-2'>
              <Box className='bg-[#FEEDD1] rounded-full p-1'>
                <Icon icon="ic:round-plus" color="#faa61a" width="18" height="18" />
              </Box>

              <Text className='font-[500] text-black text-xl truncate'>
                New
              </Text>
            </Flex>
          }
        />
      </Box>

      <Box className='hidden mr-8 max-w-[8rem] lg:block'>
        <Flex className='items-center space-x-2 min-w-[6rem] max-w-[6rem]'>
          <Box className='bg-[#fef7ee] rounded-full p-1'>
            <Icon icon="ic:round-plus" color="#faa61a" width="18" height="18" />
          </Box>

          <Text className='font-[500] text-black text-xl truncate'>
            New
          </Text>
        </Flex>
      </Box>

      <Box className='mt-5 lg:mt-0 w-full lg:border-l-4 border-[#FAA61A] lg:pl-8'>
        <Box className='md:flex md:space-x-6'>
          <Box className='w-full'>
            <Input
              type="text"
              label='Title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="Enter Topic title"
              className={`w-full border-2 border-[#E2E2E2] focus:outline-[#FAA61A] px-3 py-5 text-[#555555] transition font-sans duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
            />
          </Box>

          <Box className='mt-5 md:mt-0 w-full'>
            <Input
              type="text"
              label='YouTube Link'
              value={videoLink}
              onChange={({ target }) => setVideoLink(target.value)}
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