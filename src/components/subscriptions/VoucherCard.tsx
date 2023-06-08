import React, { useState } from "react";
import { Box, Skeleton, Collapse, Flex, Text, UnstyledButton } from "@mantine/core";
import Image from 'next/image'
import logo_icon from '../../assets/svgs/learnBetaLogo.svg'
import rotate_arrow from '../../assets/svgs/rotate_arrow.svg'
import { useDisclosure } from '@mantine/hooks';

export const VoucherCardSkeleton = () => {
  return <Skeleton className="h-52" />
}

interface Props {
  style: any
}

const VoucherCard: React.FC<Props> = ({ style }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const colors = [
    'red',
    'yellow',
    'green',
    'blue',
    'purple',
    'gray'
  ];

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const [color] = useState(getRandomColor())

  return (
    <Box style={style} className={`bg-${color}-900 h-52 py-4 px-5 overflow-x-hidden`}>
      <Image
        alt="icon"
        src={logo_icon}
        width={93}
        height={29}
      />

      <Flex className="flex justify-center items-center mt-6">
        <Flex className="space-x-2 items-center">
          <Text className="font-bold text-white text-2xl">
            Voucher
          </Text>

          <UnstyledButton onClick={toggle} className={`${opened && 'rotate-180'} transition duration-150 delay-75 ease-linear`}>
            <Image
              alt="icon"
              src={rotate_arrow}
              width={25}
              height={25}
            />
          </UnstyledButton>
        </Flex>
      </Flex>

      <Collapse 
        in={opened} 
        className='mt-3'
        transitionDuration={800} 
        transitionTimingFunction="linear"
      >
        <Text className="text-white text-center backdrop-blur-lg font-semibold rounded-full bg-neutral-200 bg-opacity-30 w-fit max-w-full backdrop-filter px-5 mx-auto py-4 truncate">
          LB-57wA490G
        </Text>
      </Collapse>

      <Box className="hidden">
        <Box className="bg-red-900" />
        <Box className="bg-yellow-900" />
        <Box className="bg-green-900" />
        <Box className="bg-blue-900" />
        <Box className="bg-purple-900" />
        <Box className="bg-gray-900" />
      </Box>
    </Box>
  )
}

export default VoucherCard