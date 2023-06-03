import React from "react";
import { Box, Text, List, UnstyledButton } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import Form from "../custom/Form";
import Input from "../custom/Input";
import { UseMutationResult } from "react-query";
import { NewPasswordData } from "@/pages/profile/update_password";
import { Icon } from '@iconify/react'

interface Props {
  newPasswordForm: UseFormReturnType<{
    new_password: string;
  }, (values: {
    new_password: string;
  }) => {
    new_password: string;
  }>,
  newPasswordMutation: UseMutationResult<any, any, any, unknown>,
  handleNewPassword: (values: NewPasswordData) => void;
}

const NewPasswordForm: React.FC<Props> = ({
  newPasswordForm,
  newPasswordMutation,
  handleNewPassword
}) => {
  return (
    <Form
      className="w-full max-w-sm mx-auto"
      onSubmit={newPasswordForm.onSubmit((values) => handleNewPassword(values))}
    >
      <Text className="mt-3 font-bold text-center text-2xl">
        Enter New Password
      </Text>

      <Box className="mt-8 space-y-6">
        <Box>
          <Input
            {...newPasswordForm.getInputProps('new_password')}
            type="password"
            error={newPasswordForm.errors.new_password}
            placeholder="Password"
            disabled={newPasswordMutation.isLoading}
            className={`w-full ${newPasswordForm.errors.new_password ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 rounded-sm text-[#555555] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>

        <Box>
          {newPasswordForm.values.new_password.length < 8 || !/\d/.test(newPasswordForm.values.new_password) || !/[A-Z]/.test(newPasswordForm.values.new_password) ?
            <Text className='text-[#777777] mt-5'>
              Your password must meet the specified requirements.
            </Text> : null
          }

          <List className="mt-5" withPadding>
            {newPasswordForm.values.new_password.length < 8 &&
              <List.Item>
                <Text className='text-[#777777]'>
                  Be eight (8) characters long
                </Text>
              </List.Item>
            }

            {!/\d/.test(newPasswordForm.values.new_password) &&
              <List.Item>
                <Text className='text-[#777777]'>
                  Contain at least one number
                </Text>
              </List.Item>
            }

            {!/[A-Z]/.test(newPasswordForm.values.new_password) &&
              <List.Item>
                <Text className='text-[#777777]'>
                  Contain at least one uppercase letter
                </Text>
              </List.Item>
            }
          </List>
        </Box>

        <Box className="space-y-4 mt-4 lg:!mt-28">
          <Box className="text-center mt-6">
            <UnstyledButton
              disabled={newPasswordMutation.isLoading}
              type="submit"
              className="px-12 h-14 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
            >
              {newPasswordMutation.isLoading ?
                <Icon
                  className={`animate-spin mx-auto`}
                  icon="icomoon-free:spinner2"
                  color="#white"
                  width="20"
                  height="20"
                /> :
                'Update Password'
              }
            </UnstyledButton>
          </Box>
        </Box>
      </Box>
    </Form>
  )
}

export default NewPasswordForm