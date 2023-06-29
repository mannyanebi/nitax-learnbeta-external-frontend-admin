import { UnstyledButton, Box, Skeleton } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';
import React from "react";

export function SubjectControlSkeleton (){
  return (
    <Box className='border w-full rounded-md border-[#BFD0CF] px-3 py-4'>
      <Skeleton className="rounded-full w-32 h-4" />
    </Box>
  )
}

interface Props {
  setActiveLessons: React.Dispatch<any>,
  activeLessons: any,
  openMobile: () => void,
  item: any
}

export default function SubjectControl({ 
  setActiveLessons, 
  activeLessons,
  openMobile,
  item
}: Props){
  const { width } = useViewportSize();

  return (
    <Box className="w-full">
      <UnstyledButton
        style={{ border: '1px solid #BFD0CF' }}
        onClick={() => {
          setActiveLessons(item)
          width < 1024 && openMobile()
        }}
        className={`py-4 w-full px-3 text-[#777777] truncate ${activeLessons?.id === item.id && 'text-[#00433F] bg-[#BFD0CF]'} font-semibold hover:text-[#00433F] rounded-md hover:bg-[#BFD0CF] transform duration-75 delay-[50ms] ease-linear`}
      >
        {item.name}
      </UnstyledButton>
    </Box>
  )
}