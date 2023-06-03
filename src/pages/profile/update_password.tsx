import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Box, Center, Flex, Text } from "@mantine/core";
import PageLayout from "@/layouts/PageLayout";
import ProfileNav from "@/components/nav/ProfileNav";
import backArrow from '../../assets/svgs/backarrow_icon.svg'
import Link from "next/link";

const UpdatePassword = () => {
  const [step, setStep] = useState('old_password')
  return (
    <PageLayout>
      <Head>
        <title>Profile | Update Password</title>
      </Head>

      <ProfileNav />

      <Box className="w-full px-4 sm:px-6 lg:px-8 mt-4 hidden lg:block">
        <Box className='w-fit'>
          <Link href='/profile'>
            <Flex className="max-w-[97rem] mx-auto space-x-2">
              <Center className="bg-[#FEEDD1] rounded-full p-2">
                <Image
                  src={backArrow}
                  alt='back icon'
                  className="w-2 h-2"
                />
              </Center>

              <Text className="font-bold">Account</Text>
            </Flex>
          </Link>
        </Box>
      </Box>

      <Box className="w-full px-4 sm:px-6 lg:px-8 mt-14">
        <Box className="max-w-[97rem] mx-auto">
          {step === 'old_password' &&
            <OldPasswordForm 
            
            />
          }

          {step === 'new_password' &&
            <NewPasswordForm

            />
          }
        </Box>
      </Box>

    </PageLayout>
  )
}

export default UpdatePassword