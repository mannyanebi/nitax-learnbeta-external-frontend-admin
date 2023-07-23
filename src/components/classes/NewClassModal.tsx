import React, { useState, useContext } from 'react';
import { Modal, Box, Text, UnstyledButton } from '@mantine/core';
import { Icon } from '@iconify/react';
import { useMutation, useQueryClient } from 'react-query';
import { AdminContext } from '@/contexts/AdminContext';
import Input from '../custom/Input';
import Form from '../custom/Form';
import toast from 'react-hot-toast';
import { addGradeLevel } from '@/services/grades';

interface Props {
  opened: boolean,
  close: () => void
}

export default function NewClassModal({ opened, close }: Props) {
  const { admin } = useContext(AdminContext)
  const queryClient = useQueryClient();
  const token = `bearer ${admin?.data?.access_token}`
  const [newClass, setNewClass] = useState('')
  const [error, setError] = useState<null | string>(null)

  const mutation = useMutation((data: any) => addGradeLevel(data, token), {
    onError: () => {
      toast.error('Failed to add new class')
    },

    onSuccess: () => {
      toast.success('Class added successfully')

      queryClient.invalidateQueries('gradeLevels');

      setNewClass('')
    },
  })

  const handleAddClass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newClass) {
      setError('Class title is required')
    } else {
      const data = {
        name: newClass
      }

      mutation.mutate(data)
    }
  }
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

          <Form className='my-10' onSubmit={handleAddClass}>
            <Box>
              <Input
                type="text"
                error={error}
                value={newClass}
                onChange={({ target }) => {
                  setNewClass(target.value)
                  setError(null)
                }}
                label='Enter Class Title'
                placeholder="Class title"
                disabled={mutation.isLoading}
                className={`w-full ${error ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className="text-center mt-8">
              <UnstyledButton
                disabled={mutation.isLoading}
                type="submit"
                className="px-6 w-52 h-14 disabled:opacity-50 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
              >
                {mutation.isLoading ?
                  <Icon
                    className={`animate-spin mx-auto`}
                    icon="icomoon-free:spinner2"
                    color="#white"
                    width="20"
                    height="20"
                  /> :
                  'Create new class'
                }
              </UnstyledButton>
            </Box>
          </Form>
        </Box>
      </Modal>
    </React.Fragment>
  );
}