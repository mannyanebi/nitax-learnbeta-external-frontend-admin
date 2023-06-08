import { UnstyledButton, Box, Skeleton } from "@mantine/core";
import React from "react";

export function SubjectControlSkeleton (){
  return (
    <Box className='border rounded-md border-[#BFD0CF] px-3 py-4'>
      <Skeleton className="rounded-full w-32 h-4" />
    </Box>
  )
}

interface Props {
  setActiveSubject: React.Dispatch<React.SetStateAction<number | null>>,
  activeSubject: number | null
  item: any
}

export default function SubjectControl({ 
  setActiveSubject, 
  activeSubject,
  item
}: Props){
  return (
    <UnstyledButton style={{ border: '1px solid #BFD0CF' }} onClick={() => setActiveSubject(item)} className={`w-full py-4 px-3 text-[#777777] truncate font-semibold hover:text-[#00433F] rounded-md hover:bg-[#BFD0CF] ${activeSubject === item && 'text-[#00433F] rounded-md bg-[#BFD0CF]'} transform duration-75 delay-[50ms] ease-linear`}>
      {item}
    </UnstyledButton>
  )
}