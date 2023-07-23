import { SubjectType } from "@/pages/dashboard/subjects";
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
  setActiveSubject: React.Dispatch<any>,
  activeSubject: any,
  openMobile: () => void,
  subject: SubjectType
}

export default function SubjectControl({ 
  setActiveSubject, 
  activeSubject,
  openMobile,
  subject
}: Props){
  const { width } = useViewportSize();

  return (
    <Box className="w-full">
      <UnstyledButton
        style={{ border: '1px solid #BFD0CF' }}
        onClick={() => {
          setActiveSubject(subject)
          width < 1024 && openMobile()
        }}
        className={`py-4 w-full px-3 text-[#777777] truncate ${activeSubject?.id === subject.id && 'text-[#00433F] bg-[#BFD0CF]'} font-semibold hover:text-[#00433F] text-sm rounded-md hover:bg-[#BFD0CF] transform duration-75 delay-[50ms] ease-linear`}
      >
        {subject.name}
      </UnstyledButton>
    </Box>
  )
}