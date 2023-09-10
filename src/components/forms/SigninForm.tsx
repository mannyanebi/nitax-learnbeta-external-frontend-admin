import React from "react";
import { Box, Text, Checkbox, UnstyledButton } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import Form from "../custom/Form";
import Input from "../custom/Input";
import Link from "next/link";
import { UseMutationResult } from "react-query";
import { SigninData } from '../../pages/auth/signin'
import { Icon } from '@iconify/react'

interface Props {
  form: UseFormReturnType<{
    email: string;
    password: string;
  }, (values: {
    email: string;
    password: string;
  }) => {
    email: string;
    password: string;
  }>, 
  checked: boolean,
  mutation: UseMutationResult<any, any, any, unknown>,
  handleSignin: (values: SigninData) => void;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>
}
 
const SigninForm: React.FC<Props> = ({
  form,
  checked,
  mutation,
  setChecked,
  handleSignin
}) => {
  return (
    <Form
      onSubmit={form.onSubmit((values) => handleSignin(values))}
    >
      <Text className='text-[#777777]'>Sign in</Text>

      <Text className="mt-3 font-bold text-2xl">
        Welcome Back Admin!
      </Text>

      <Box className="mt-8 space-y-6">
        <Box>
          <Input 
            {...form.getInputProps('email')}
            type="email"
            error={form.errors.email}
            placeholder="Email"
            disabled={mutation.isLoading}
            className={`w-full ${form.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 rounded-sm text-[#555555] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>

        <Box>
          <Input
            {...form.getInputProps('password')}
            type="password"
            error={form.errors.password}
            placeholder="Password"
            disabled={mutation.isLoading}
            className={`w-full ${form.errors.password ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 rounded-sm text-[#555555] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>
      </Box>

      <Box className="space-y-4 mt-4">
        {/* <Box>
          <Link
            href='/auth/forgot_password'
            className="text-sm w-fit hover:underline hover:text-[#FAA61A]"
          >
            Forgot Password?
          </Link>
        </Box> */}

        <Box>
          <Checkbox
            size='sm'
            color="yellow"
            label="Remember me"
            disabled={mutation.isLoading}
            checked={checked} 
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        </Box>

        <Box className="text-center mt-6">
          <UnstyledButton
            disabled={mutation.isLoading}
            type="submit"
            className="px-4 w-40 h-14 disabled:opacity-50 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
          >
            {mutation.isLoading ?
              <Icon
                className={`animate-spin mx-auto`}
                icon="icomoon-free:spinner2"
                color="#white"
                width="20"
                height="20"
              /> :
              'Sign In'
            }
          </UnstyledButton>
        </Box>
      </Box>
    </Form>
  )
}

export default SigninForm