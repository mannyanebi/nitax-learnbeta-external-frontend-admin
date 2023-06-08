import React, { useState } from "react";
import Head from "next/head";
import { Box, Text } from "@mantine/core";
import DashboardLayout from "@/layouts/DashboardLayout";
import { NoSubjectSelected } from "@/components/lessons/EmptyState";
import SubjectControl from "@/components/lessons/SubjectControl";
import { SubjectControlSkeleton } from "@/components/lessons/SubjectControl";

const Lessons = () => {
  const [activeSubject, setActiveSubject] = useState<number | null>(null)

  console.log(activeSubject)
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Lessons</title>
      </Head>

      <Box>
        <Box className="w-full md:pr-[15rem] lg:pr-6 lg:max-w-[15rem] h-[100%] pb-[85px] fixed space-y-4 overflow-y-auto border-r-2 border-[#E2E2E2] no-scrollbar px-4 sm:px-6 pt-5">
          <Text className='text-[#444444] font-semibold text-lg'>Subjects</Text>

          {[1,2,3,4].map((item, index) => (
            <SubjectControl 
              key={index}
              setActiveSubject={setActiveSubject}
              activeSubject={activeSubject}
              item={item}
            />
          ))}

          <SubjectControlSkeleton />
          <SubjectControlSkeleton />
          <SubjectControlSkeleton />
          <SubjectControlSkeleton />
        </Box>

        <Box className="ml-[15rem] hidden lg:block px-4 space-y-8 pt-5 max-w-[70rem]">
          {activeSubject &&
            <Text className="text-5xl">{activeSubject}</Text>
          }

          {!activeSubject &&
            <Box className="mt-10">
              <NoSubjectSelected />
            </Box>
          }
        </Box>
      </Box>
    </DashboardLayout>
  )
}

export default Lessons