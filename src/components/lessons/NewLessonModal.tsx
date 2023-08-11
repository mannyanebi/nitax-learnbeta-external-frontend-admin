import React, { useContext } from 'react';
import { Modal, Box, Text, UnstyledButton } from '@mantine/core';
import { Icon } from '@iconify/react';
import { useForm } from '@mantine/form';
import Input from '../custom/Input';
import TextArea from '../custom/TextArea';
import Form from '../custom/Form';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { addLesson } from '@/services/lessons';
import { AdminContext } from '@/contexts/AdminContext';

interface Props {
  opened: boolean,
  close: () => void,
  subjectId: number
}

export default function NewLessonModal({ opened, close, subjectId }: Props) {
  const { admin } = useContext(AdminContext)  
  const queryClient = useQueryClient();
  const token = `bearer ${admin?.data?.access_token}`

  const form = useForm({
    initialValues: {
      title: '',
      description: ''
    },

    validate: {
      title: (value) => (
        !value ? 'Lesson title is required' : null
      ),
      description: (value) => (
        !value ? 'Lesson description is required' : null
      )
    },
  });

  const mutation = useMutation((data: any) => addLesson(subjectId.toString(), data, token), {
    onError: () => {
      toast.error('Failed to add new lesson')
    },

    onSuccess: () => {
      toast.success('Lesson added successfully')

      queryClient.invalidateQueries('lessons');

      form.reset()
    },
  })

  const handleAddLesson = async (values: any) => {
    values.subject_id = subjectId

    mutation.mutate(values)
  }

  return (
    <React.Fragment>
      <Modal
        size='lg'
        radius={12}
        opened={opened}
        onClose={close}
        centered>
        <Box className='px-2 sm:px-8 md:px-10'>
          <Text className='font-semibold text-center text-lg'>
            Add New Lesson
          </Text>

          <Form 
            onSubmit={form.onSubmit((values) => handleAddLesson(values))}
            className='my-10'
          >
            <Box>
              <Input
                type="text"
                {...form.getInputProps('title')}
                error={form.errors.title}
                label='Enter Lesson Title'
                placeholder="Lesson title"
                disabled={mutation.isLoading}
                className={`w-full ${form.errors.title ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 text-[#555555] font-sans transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className='mt-5'>
              <TextArea
                maxLength={80}
                {...form.getInputProps('description')}
                error={form.errors.description}
                label='Brief description of lesson'
                placeholder="Enter lesson description"
                disabled={mutation.isLoading}
                className={`w-full ${form.errors.description ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} min-h-[5rem] resize-none border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className="text-center mt-8">
              <UnstyledButton
                disabled={mutation.isLoading}
                type="submit"
                className="px-8 h-14 disabled:opacity-50 w-56 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
              >
                {mutation.isLoading ?
                  <Icon
                    className={`animate-spin mx-auto`}
                    icon="icomoon-free:spinner2"
                    color="#white"
                    width="20"
                    height="20"
                  /> :
                  'Create new lesson'
                }
              </UnstyledButton>
            </Box>
          </Form>
        </Box>
      </Modal>
    </React.Fragment>
  );
}