import React from "react";
import { Box, Text, List, UnstyledButton } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import Form from "../custom/Form";
import Input from "../custom/Input";
import { UseMutationResult } from "react-query";
import { ResetPasswordData } from "@/pages/auth/forgot_password";
import { Icon } from '@iconify/react'

interface Props {
  resetPasswordForm: UseFormReturnType<{
    new_password: string;
    confirm_password: string;
  }, (values: {
    new_password: string;
    confirm_password: string;
  }) => {
    new_password: string;
    confirm_password: string;
  }>,
  resetPasswordMutation: UseMutationResult<any, any, any, unknown>,
  handleResetPassword: (values: ResetPasswordData) => void;
}

const ResetPasswordForm: React.FC<Props> = ({
  resetPasswordForm,
  resetPasswordMutation,
  handleResetPassword
}) => {
  return (
    <Form
      onSubmit={resetPasswordForm.onSubmit((values) => handleResetPassword(values))}
    >
      <Text className="mt-3 font-bold text-center text-2xl">
        Create New Password
      </Text>

      <Box>
        {resetPasswordForm.values.new_password.length < 8 || !/\d/.test(resetPasswordForm.values.new_password) || !/[A-Z]/.test(resetPasswordForm.values.new_password) ?
          <Text className='text-[#777777] mt-5'>
            Your password must meet the specified requirements.
          </Text> : null
        }

        <List className="mt-5 list-disc" withPadding>
          {resetPasswordForm.values.new_password.length < 8 &&
            <List.Item>
              <Text className='text-[#777777]'>
                Be eight (8) characters long
              </Text>
            </List.Item>
          }

          {!/\d/.test(resetPasswordForm.values.new_password) &&
            <List.Item>
              <Text className='text-[#777777]'>
                Contain at least one number
              </Text>
            </List.Item>
          }

          {!/[A-Z]/.test(resetPasswordForm.values.new_password) &&
            <List.Item>
              <Text className='text-[#777777]'>
                Contain at least one uppercase letter
              </Text>
            </List.Item>
          }
        </List>
      </Box>

      <Box className="mt-8 space-y-6">
        <Box>
          <Input
            {...resetPasswordForm.getInputProps('new_password')}
            type="password"
            error={resetPasswordForm.errors.new_password}
            placeholder="Password"
            disabled={resetPasswordMutation.isLoading}
            className={`w-full ${resetPasswordForm.errors.new_password ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 rounded-sm text-[#555555] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>

        <Box>
          <Input
            {...resetPasswordForm.getInputProps('confirm_password')}
            type="password"
            disabled={resetPasswordMutation.isLoading}
            error={resetPasswordForm.errors.confirm_password}
            placeholder="Password"
            className={`w-full ${resetPasswordForm.errors.confirm_password ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 rounded-sm text-[#555555] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>
      </Box>

      <Box className="space-y-4 mt-4">
        <Box className="text-center mt-6">
          <UnstyledButton
            disabled={resetPasswordMutation.isLoading}
            type="submit"
            className="px-4 w-40 h-14 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
          >
            {resetPasswordMutation.isLoading ?
              <Icon
                className={`animate-spin mx-auto`}
                icon="icomoon-free:spinner2"
                color="#white"
                width="20"
                height="20"
              /> :
              'Save Password'
            }
          </UnstyledButton>
        </Box>
      </Box>
    </Form>
  )
}

export default ResetPasswordForm