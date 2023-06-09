import React from "react";
import Image from 'next/image'
import { Text, Center, Box } from '@mantine/core'
import preview_subject from '../../assets/svgs/preview_subjects.svg'

export function NoSubjectSelected (){
  return (
    <Box className="xl:mx-10">
      <Center className='h-[35rem] bg-gradient-to-br from-[#FAAB2E] to-[#d9f3f1] rounded-2xl'>
        <Box>
          <Image
            alt='icon'
            src={preview_subject}
            className='w-[20rem] mx-auto'
          />
          <Text className='text-[#00433F] font-semibold mt-10 text-lg xl:text-2xl text-center'>
            Select a Subject and the Lessons will appear here
          </Text>
        </Box>
      </Center>
    </Box>
  )
}