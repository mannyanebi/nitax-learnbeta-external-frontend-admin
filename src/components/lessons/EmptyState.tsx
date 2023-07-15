import React from "react";
import Image from 'next/image'
import { Text, Center, Box } from '@mantine/core'
import preview_subject from '../../assets/svgs/preview_subjects.svg'

type Props = {
  message: string
}

export function EmptyState({ message }: Props){
  return (
    <Box>
      <Center className='h-[30rem] px-5 bg-gradient-to-br from-[#FAAB2E] to-[#d9f3f1] rounded-2xl'>
        <Box>
          <Image
            alt='icon'
            priority
            src={preview_subject}
            className='w-[20rem] mx-auto'
          />
          <Text className='text-[#00433F] font-semibold max-w-[30rem] px-5 mx-auto mt-10 text-lg xl:text-2xl text-center'>
            {message}
          </Text>
        </Box>
      </Center>
    </Box>
  )
}