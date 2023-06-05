import React from "react";
import { Box, Text, Skeleton, UnstyledButton } from "@mantine/core";

export const PlanCardSkeleton = () => {
  return (
    <Box className='w-full border-2 rounded-3xl border-[#E2E2E2] p-6 text-center space-y-5'>
      <Skeleton className="mx-auto w-40 h-3" />
      <Skeleton className="mx-auto w-full h-3" />
      <Skeleton className={`h-3 w-3 rounded-full mx-auto`} />
      <Box className='space-y-2'>
        <Skeleton className="mx-auto rounded-full w-full h-2" />
        <Skeleton className="mx-auto rounded-full w-40 h-2" />
        <Skeleton className="mx-auto rounded-full w-20 h-2" />
      </Box>
      <Skeleton className="mx-auto w-full h-8 rounded-full" />
    </Box>
  )
}

type NoPlanProps = { 
  colorTheme: string
  item: any
}

export const NoPlanCard: React.FC<NoPlanProps> = ({ colorTheme, item }) => {
  return (
    <Box className='w-full border-2 rounded-3xl border-[#E2E2E2] p-6 text-center space-y-5'>
      <Text className={`text-${colorTheme}-500 font-semibold text-lg`}>
        {item.header}
      </Text>

      <Text className="font-bold text-[#666666] text-2xl">
        🤔 🗣️ 😱
      </Text>

      <Box className={`h-3 w-3 bg-${colorTheme}-500 rounded-full mx-auto`} />

      <Text
        className="text-[#666666]"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {item.description}
      </Text>

      <Box className={`w-full h-10 bg-${colorTheme}-500 rounded-full animate-pulse`}/>
    </Box>
  )
}

interface Props {
  style: any
}

const PlanCard: React.FC<Props> = ({ style }) => {
  const colors = [
    'red',
    'yellow',
    'green',
    'blue',
    'purple',
  ];

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const color = getRandomColor()

  return (
    <Box style={style} className='w-full border-2 rounded-3xl border-[#E2E2E2] p-6 text-center space-y-5'>
      <Text className={`text-${color}-500 font-semibold text-lg`}>
        Premium Plan
      </Text>

      <Text className="font-bold text-[#666666] text-2xl">
        #5,000
      </Text>

      <Box className={`h-3 w-3 bg-${color}-500 rounded-full mx-auto`}/>

      <Text 
        className="text-[#666666]"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        Access to just one subjects and its lessons
      </Text>

      <Box className="hidden">
        <Box className="bg-red-500 text-red-500  hover:bg-red-500" />
        <Box className="bg-red-100" />
        <Box className="bg-yellow-500 text-yellow-500  hover:bg-yellow-500" />
        <Box className="bg-yellow-100" />
        <Box className="bg-green-500 text-green-500  hover:bg-green-500" />
        <Box className="bg-green-100" />
        <Box className="bg-blue-500 text-blue-500  hover:bg-blue-500" />
        <Box className="bg-blue-100" />
        <Box className="bg-purple-500 text-purple-500  hover:bg-purple-500" />
        <Box className="bg-purple-100" />
      </Box>


      <UnstyledButton className={`w-full text-center text-${color}-500 py-2 bg-${color}-100  hover:bg-${color}-500 rounded-full font-semibold hover:text-white hover:bg-${color}-400 transition duration-75 delay-75 ease-linear`}>
        Edit Plan
      </UnstyledButton>
    </Box>
  )
}

export default PlanCard