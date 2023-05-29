import React from "react";
import { Box, Text, Checkbox, UnstyledButton } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import Form from "../custom/Form";
import Input from "../custom/Input";
import Link from "next/link";
import { SigninData } from '../../pages/auth/signin'

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
  handleSignin: (values: SigninData) => void;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>
}

const SigninForm: React.FC<Props> = ({
  form,
  checked,
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
            className={`w-full ${form.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 rounded-sm text-[#555555] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>

        <Box>
          <Input
            {...form.getInputProps('password')}
            type="password"
            error={form.errors.password}
            placeholder="Password"
            className={`w-full ${form.errors.password ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 rounded-sm text-[#555555] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>
      </Box>

      <Box className="space-y-4 mt-4">
        <Box>
          <Checkbox
            size='sm'
            color="yellow"
            label="Remember me"
            checked={checked} 
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        </Box>

        <Box>
          <Link
            href='/auth/forgot_password'
            className="text-sm w-fit hover:underline hover:text-[#FAA61A]"
          >
            Forgot Password?
          </Link>
        </Box>

        <Box className="text-center mt-6">
          <UnstyledButton
            type="submit"
            className="px-4 w-40 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
          >
            Sign In
          </UnstyledButton>
        </Box>
      </Box>
    </Form>
  )
}

export default SigninForm