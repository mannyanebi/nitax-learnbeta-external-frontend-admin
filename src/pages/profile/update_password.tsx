import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Box, Center, Flex, Text } from "@mantine/core";
import PageLayout from "@/layouts/PageLayout";
import ProfileNav from "@/components/nav/ProfileNav";
import backArrow from '../../assets/svgs/backarrow_icon.svg'
import Link from "next/link";
import { useMutation } from "react-query";
import OldPasswordForm from "@/components/forms/OldPasswordForm";
import NewPasswordForm from "@/components/forms/NewPasswordForm";
import { verifyOldPassword } from "@/services/admin";
import { useForm } from '@mantine/form';
import { updatePassword } from "@/services/auth";

export type OldPasswordData = { old_password: string }
export type NewPasswordData = { new_password: string }

const UpdatePassword = () => {
  const [step, setStep] = useState('old_password')

  const oldPasswordForm = useForm({
    initialValues: {
      old_password: ''
    },

    validate: {
      old_password: (value) => (
        !value ? 'Password is required' : null
      )
    },
  });

  const newPasswordForm = useForm({
    initialValues: {
      new_password: ''
    },

    validate: {
      new_password: (value) => (
        !value ? 
        'Password is required' : 
        value.length < 8 ? 
        'Password must be at least 8 characters long' : 
        !/\d/.test(value) ? 
        'Password must contain at least one number' : 
        !/[A-Z]/.test(value) ? 
        'Password must contain at least one uppercase letter' : null
      )
    },
  });

  const oldPasswordMutation = useMutation((data: any) => verifyOldPassword(data), {
    onError: (error: any) => {
      oldPasswordForm.setErrors({
        old_password: error.response.data.message
      })
    },

    onSuccess: (data) => {
      // set step to new_password
    }
  })

  const newPasswordMutation = useMutation((data: any) => updatePassword(data), {
    onError: (error: any) => {
      newPasswordForm.setErrors({
        new_password: error.response.data.message
      })
    },

    onSuccess: (data) => {
      // set step to old_password
      // redirect to profile
    }
  })

  const handleOldPassword = async (values: OldPasswordData) => {
    oldPasswordMutation.mutate(values)
  }

  const handleNewPassword = async (values: NewPasswordData) => {
    newPasswordMutation.mutate(values)
  }

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

      <Box className="w-full px-4 sm:px-6 lg:px-8 mt-14 lg:mt-24">
        <Box className="max-w-[97rem] mx-auto">
          {step === 'old_password' &&
            <OldPasswordForm 
              oldPasswordForm={oldPasswordForm}
              oldPasswordMutation={oldPasswordMutation}
              handleOldPassword={handleOldPassword}
            />
          }

          {step === 'new_password' &&
            <NewPasswordForm
              newPasswordForm={newPasswordForm}
              newPasswordMutation={newPasswordMutation}
              handleNewPassword={handleNewPassword}
            />
          }
        </Box>
      </Box>

    </PageLayout>
  )
}

export default UpdatePassword