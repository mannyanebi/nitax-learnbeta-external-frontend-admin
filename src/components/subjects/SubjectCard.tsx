import React from "react";
import { Box, Flex, Text, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import dot_control from '../../assets/svgs/dot_control.svg'
import subjectIcon from '../../assets/svgs/subject_icon.svg'

const SubjectCard = () => {
  return (
    <Box className="border-2 rounded-xl border-[#E2E2E2] p-5 h-[18.5rem] flex flex-col">
      <Box className="w-full h-[127px] rounded-xl overflow-hidden">
        <Image
          alt="subject banner"
          src={subjectIcon}
          className='w-full h-[127px] object-cover object-center rounded-xl hover:brightness-75 hover:scale-125 transition duration-200 delay-75 ease-linear'
        />
      </Box>

      <Text className='font-semibold text-lg mt-3'>
        Health Science
      </Text>

      <Text
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        className="text-[#888888] text-sm font-semibold mt-1"
      >
        The study of healthy living. study of healthy living study of healthy living study of healthy living study of healthy living study of healthy living
      </Text>

      <Flex className="mt-auto justify-end">
        <UnstyledButton>
          <Image
            alt="subject banner"
            src={dot_control}
            className='w-[32px] h-[32px] rounded-full hover:brightness-75 transition duration-200 delay-75 ease-linear'
          />
        </UnstyledButton>
      </Flex>
    </Box>
  );
}

export default SubjectCard;