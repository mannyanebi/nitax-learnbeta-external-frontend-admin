import React from 'react';
import { Modal, Box, Text, UnstyledButton } from '@mantine/core';
import Input from '../custom/Input';
import Form from '../custom/Form';

interface Props {
  opened: boolean,
  close: () => void
}

export default function NewClassModal({ opened, close }: Props) {
  return (
    <React.Fragment>
      <Modal
        size='lg'
        radius={12}
        opened={opened}
        onClose={close}
      >
        <Box className='px-2 sm:px-8 md:px-10'>
          <Text className='font-semibold text-center text-lg'>
            Add New Class
          </Text>

          <Form className='my-10'>
            <Box>
              <Input
                type="text"
                // error={form.errors.email}
                label='Enter Class Title'
                placeholder="Class title"
                // disabled={mutation.isLoading}
                // ${form.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'}
                className={`w-full border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className="text-center mt-8">
              <UnstyledButton
                // disabled={mutation.isLoading}
                type="submit"
                className="px-8 h-14 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
              >
                {/* {mutation.isLoading ?
                  <Icon
                    className={`animate-spin mx-auto`}
                    icon="icomoon-free:spinner2"
                    color="#white"
                    width="20"
                    height="20"
                  /> :
                  'Sign In'
                } */}
                Create new class
              </UnstyledButton>
            </Box>
          </Form>
        </Box>
      </Modal>
    </React.Fragment>
  );
}