import React from "react";
import Head from "next/head";
import ProfileNav from "@/components/nav/ProfileNav";
import PageLayout from "@/layouts/PageLayout";
import { useRouter } from 'next/router';
import { Box, Center, Flex, Text, Grid } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import preview_subject from '../../../../assets/svgs/empty_state.svg'
import backArrow from '../../../../assets/svgs/backarrow_icon.svg'

const StudentScoreCard = () => {
  return (
    <Box>
      <Grid className="py-2 rounded-b-lg mx-auto lg:px-8 w-full">
        <Grid.Col className="" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            01
          </Text>
        </Grid.Col>

        <Grid.Col className="]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            Joshua Micheal 
          </Text>
        </Grid.Col>

        <Grid.Col className="]" span="auto">
          <Text className='text-[#555555] truncate font-semibold'>
            75%
          </Text>
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default function Performance (){
  const router = useRouter();

  return (
    <PageLayout>
      <Head>
        <title>Students Performance</title>
      </Head>

      <ProfileNav />

      <Box className="w-full px-4 sm:px-8 md:px-10 mt-4">
        <Box className="max-w-[40rem] lg:max-w-[62rem] xl:max-w-[75rem] 2xl:max-w-[85rem] mx-auto">
          <Box className='w-fit'>
            <Link href='/dashboard/lessons'>
              <Flex className="max-w-[97rem] mx-auto space-x-2">
                <Center className="bg-[#FEEDD1] rounded-full p-2">
                  <Image
                    src={backArrow}
                    alt='back icon'
                    className="w-2 h-2"
                  />
                </Center>

                <Text className="font-bold">
                  Back
                </Text>
              </Flex>
            </Link>
          </Box>
        </Box>
      </Box>

      <Box className="w-full px-4 sm:px-8 md:px-10 my-10">
        <Text className="text-4xl font-bold text-center">
          {/* {router.query.id} */}
          65%
        </Text>

        <Text className="text-lg mt-3 font-bold text-center">
          Average Assessment Score
        </Text>

        <Box className="mt-10 w-full mx-auto max-w-[40rem] lg:max-w-[62rem] xl:max-w-[75rem] 2xl:max-w-[85rem] py-2 rounded-lg border border-[#E2E2E2]">
          <Grid className="bg-[#FFF6E8] lg:px-8 w-full rounded-t-lg mx-auto py-2">
            <Grid.Col span="auto">
              <Text className='text-[#555555] font-semibold'>
                S/N
              </Text>
            </Grid.Col>

            <Grid.Col span="auto">
              <Text className='text-[#555555] font-semibold'>
                Name
              </Text>
            </Grid.Col>

            <Grid.Col span="auto">
              <Text className='text-[#555555] font-semibold'>
                Score
              </Text>
            </Grid.Col>
          </Grid>

          <Box className="mt-5 space-y-3 overflow-y-auto max-h-[41rem]">
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
            <StudentScoreCard />
          </Box>
        </Box>
      </Box>  

      {/* <Box className="w-full max-w-[50rem] mx-auto mt-10">
        <Center className='h-[35rem] bg-gradient-to-br from-[#FAAB2E] to-[#d9f3f1] rounded-2xl'>
          <Box>
            <Image
              alt='icon'
              priority
              src={preview_subject}
              className='w-[20rem] mx-auto'
            />
            <Text className='text-[#00433F] font-semibold mt-10 text-lg xl:text-2xl text-center'>
              Snap! an error occured. No record found!
            </Text>
          </Box>
        </Center>
      </Box> */}
    </PageLayout>
  )
}