import React from "react"; 
import { Box, Flex, Divider, Text, UnstyledButton } from "@mantine/core";
import minus_icon from '../../assets/svgs/minus.svg'
import Image from 'next/image'

interface Props {
  topic?: {
    title: string;
    videoLink: string;
    transcript: any;
    id: number
  },
  index: number,
  handleRemoveTopic: (delId: number) => void
}

export default function PreviewTopicCard ({ 
  topic,
  index ,
  handleRemoveTopic
}: Props){
  return (
    <Box className='lg:flex lg:items-center lg:space-x-'>
      <Box className='lg:hidden'>
        <Divider
          size="md"
          color='#FAA61A'
          label={
            <Flex className="items-center space-x-2">
              <Box>
                <UnstyledButton
                  type='button'
                  onClick={() => topic?.id && handleRemoveTopic(topic.id)}
                  className='bg-[#00433F] hover:bg-[#00433fcf] px-[0.29rem] py-[0.2rem] rounded-md transition duration-75 delay-75 ease-linear'
                >
                  <Image
                    src={minus_icon}
                    alt='control icon'
                    className='w-[20px] h-[20px]'
                  />
                </UnstyledButton>
              </Box>

              <Text className='font-[500] text-black text-xl truncate'>
                Topic {index + 1}
              </Text>
            </Flex>
          }
        />
      </Box>

      <Box className='hidden mr-8 min-w-[6rem] max-w-[6rem] lg:block'>
        <Box>
          <Text className='font-[500] text-black text-xl truncate'>
            Topic {index + 1}
          </Text>

          <Box className='mt-2'>
            <UnstyledButton 
              type='button' 
              onClick={() => topic?.id && handleRemoveTopic(topic.id)} 
              className='bg-[#00433F] hover:bg-[#00433fcf] px-2 py-[0.2rem] rounded-md transition duration-75 delay-75 ease-linear'
            >
              <Image
                src={minus_icon}
                alt='control icon'
                className='w-[20px] h-[20px]'
              />
            </UnstyledButton>
          </Box>
        </Box>
      </Box>

      <Box className='mt-5 lg:mt-0 w-full lg:border-l-4 border-[#FAA61A] lg:pl-8'>
        <Box className='md:flex md:space-x-6'>
          <Box className='w-full'>
            <Text className="text-sm font-light">
              Title
            </Text>

            <Box className="border-2 rounded-lg mt-2 p-4 border-[#E2E2E2] text-[#555555]">
              <Text className="truncate">
                {topic?.title}
              </Text>
            </Box>
          </Box>

          <Box className='mt-5 md:mt-0 w-full'>
            <Text className="text-sm font-light">
              YouTube Link
            </Text>

            <Box className="border-2 rounded-lg mt-2 p-4 border-[#E2E2E2] text-[#555555]">
              <Text className="truncate">
                {topic?.videoLink}
              </Text>
            </Box>
          </Box>
        </Box>

        <Box className='mt-5'>
          <Text className="text-sm font-light">
            Transcript
          </Text>

          <Box 
            dangerouslySetInnerHTML={{
              __html: topic?.transcript 
            }} 
            className="border-2 font-sans rounded-lg mt-2 p-4 border-[#E2E2E2]" 
          />
        </Box>
      </Box>
    </Box>
  )
}