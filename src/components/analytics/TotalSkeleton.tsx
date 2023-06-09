import React from "react"
import { Box, Skeleton, Flex } from "@mantine/core"

export function TotalSkeleton (){
  return (
    <Box className="border-2 rounded-xl border-[#E2E2E2] p-5">
      <Flex className="h-full xl:hidden items-center justify-between">
        <Flex className="items-center space-x-3">
          <Skeleton className="rounded-full h-[40px] w-[40px]" />
          <Skeleton className="rounded-full h-4 w-48" />
        </Flex>
        <Skeleton className="h-5 w-16" />
      </Flex>

      <Box className="hidden xl:block">
        <Flex className="items-center space-x-10">
          <Skeleton className="rounded-full h-[40px] w-[40px]" />
          <Skeleton className="rounded-full h-4 w-48" />
        </Flex>
        <Skeleton className="mx-auto mt-2 h-5 w-16" />
      </Box>
    </Box>
  )
}