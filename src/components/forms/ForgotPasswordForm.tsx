import React from "react";
import { Box, Text, UnstyledButton } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import Form from "../custom/Form";
import Input from "../custom/Input";
import Link from "next/link";
import { UseMutationResult } from "react-query";
import { ForgotPasswordData } from '../../pages/auth/forgot_password'
import { Icon } from '@iconify/react'

interface Props {
  forgotPasswordForm: UseFormReturnType<{
    email: string;
  }, (values: {
    email: string;
  }) => {
    email: string;
  }>,
  handleForgotPassword: (values: ForgotPasswordData) => void,
  forgotPasswordMutation: UseMutationResult<any, any, any, unknown>
}

const ForgotPasswordForm: React.FC<Props> = ({
  forgotPasswordForm,
  handleForgotPassword,
  forgotPasswordMutation
}) => {
  return (
    <Form
      onSubmit={forgotPasswordForm.onSubmit((values) => handleForgotPassword(values))}
    >
      <Text className="mt-3 font-bold text-center text-2xl">
        Forgot Password
      </Text>

      <Text className='text-[#777777] text-center mt-5'>
        Enter the email address used to create your account
      </Text>

      <Box className="mt-8 space-y-6">
        <Box>
          <Input
            {...forgotPasswordForm.getInputProps('email')}
            type="email"
            error={forgotPasswordForm.errors.email}
            placeholder="Email"
            disabled={forgotPasswordMutation.isLoading}
            className={`w-full ${forgotPasswordForm.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 rounded-sm text-[#555555] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>
      </Box>

      <Box className="space-y-4 mt-4">
        <Box>
          <Link
            href='/auth/signin'
            className="text-sm w-fit hover:underline hover:text-[#FAA61A]"
          >
            I remember now. Go back!
          </Link>
        </Box>

        <Box className="text-center mt-6">
          <UnstyledButton
            disabled={forgotPasswordMutation.isLoading}
            type="submit"
            className="px-4 w-40 h-14 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
          >
            {forgotPasswordMutation.isLoading ?
              <Icon 
                className={`animate-spin mx-auto`} 
                icon="icomoon-free:spinner2" 
                color="#white" 
                width="20" 
                height="20" 
              /> :
              'Continue'
            }
          </UnstyledButton>
        </Box>
      </Box>
    </Form>
  )
}

export default ForgotPasswordForm