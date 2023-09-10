import React, { useContext, useState } from 'react';
import { Modal, Box, Text, Flex, Select, Group, useMantineTheme, rem, UnstyledButton } from '@mantine/core';
import Input from '../custom/Input';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import TextArea from '../custom/TextArea';
import Form from '../custom/Form';
import { IconUpload, IconX } from '@tabler/icons-react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Image from 'next/image'
import { Icon } from '@iconify/react';
import upload_cloud from '../../assets/svgs/upload-cloud.svg'
import { AdminContext } from '@/contexts/AdminContext';
import toast from 'react-hot-toast';
import { addSubject } from '@/services/subjects'
import { getGradeLevels } from '@/services/grades'

interface Props {
  opened: boolean,
  close: () => void
}

type ErrorStateType = {
  name: string | null;
  description: string | null;
  class: string | null;
  bannerImg: string | null;
};

type ValueType = {
  name: string
  description: string
  class: string | null
};

export default function NewSubjectsModal({ opened, close }: Props) {
  const theme = useMantineTheme();
  const { admin } = useContext(AdminContext)
  const queryClient = useQueryClient();
  const token = `Bearer ${admin?.data?.access_token}`

  const gradeLevels = useQuery('gradeLevels', () => getGradeLevels(token))

  const [file, setFile] = useState<FileWithPath[]>([])
  const [error, setError] = useState<ErrorStateType>({
    name: null,
    description: null,
    class: null,
    bannerImg: null
  });
  const [value, setValue] = useState<ValueType>({
    name: '',
    description: '',
    class: ''
  });

  const labelStyles = {
    color: '#343434',
    fontSize: '0.875rem',
    fontWeight: 400
  };

  const mutation = useMutation((data: any) => addSubject(data, token), {
    onError: () => {
      toast.error('Failed to add new subject')
    },

    onSuccess: () => {
      toast.success('Subject added successfully')

      queryClient.invalidateQueries('subjects');

      setFile([])
      setValue({
        name: '',
        description: '',
        class: ''
      })
    },
  })

  const handleAddSubject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!value.name) {
      setError({
        ...error,
        name: 'Subject title is required'
      })
    } else if (file.length < 1) {
      setError({
        ...error,
        bannerImg: 'Subject header image is required'
      })
    } else if (!value.description) {
      setError({
        ...error,
        description: 'Subject description is required'
      })
    } else if (!value.class) {
      setError({
        ...error,
        class: 'Subject class is required'
      })
    } else {
      const data = {
        name: value.name,
        img: file,
        description: value.description,
        grade_level_id: Number(value.class)
      }

      mutation.mutate(data)
    }
  }

  const gradeLevelsState = gradeLevels?.data?.data.map((level: any) => ({
    value: level.id.toString(),
    label: level.name
  })) || []

  return (
    <React.Fragment>
      <Modal
        size='lg'
        radius={12}
        opened={opened}
        onClose={close}
        centered
      >
        <Box className='px-2 sm:px-8 md:px-10'>
          <Text className='font-semibold text-center text-lg'>
            Add New Subject
          </Text>

          <Form className='my-10' onSubmit={handleAddSubject}>
            <Box>
              <Input
                type="text"
                error={error.name}
                value={value.name}
                onChange={({ target }) => {
                  setError({
                    ...error,
                    name: null
                  })
                  setValue({
                    ...value,
                    name: target.value
                  })
                }}
                label='Enter Subject Title'
                placeholder="Subject title"
                disabled={mutation.isLoading}
                className={`w-full border-2 px-3 py-5 ${error.name ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} font-sans text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className='mt-5'>
              <Text className="text-sm text-[#343434]">
                Upload subject header image
              </Text>

              <Dropzone
                className={`mt-[0.2rem] bg-[#F9F9F9] ${error.bannerImg && 'border-red-500'}`}
                padding={7}
                disabled={mutation.isLoading}
                maxFiles={1}
                onDrop={(files) => {
                  setError({
                    ...error,
                    bannerImg: null
                  })
                  setFile(files)
                }
                }
                onReject={() => null}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
              >
                <Group position="center" spacing="xl" style={{ minHeight: rem(120), pointerEvents: 'none' }}>
                  <Dropzone.Accept>
                    <Box className='w-full'>
                      <IconUpload
                        size="3.2rem"
                        stroke={1.5}
                        color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                        className='mx-auto'
                      />

                      <Box className='text-center mt-4'>
                        <Text
                          inline
                          color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                          className='font-semibold'
                          size="md"
                        >
                          Release to drop file
                        </Text>
                      </Box>
                    </Box>
                  </Dropzone.Accept>

                  <Dropzone.Reject>
                    <Box className='w-full'>
                      <IconX
                        size="40px"
                        stroke={1.5}
                        color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                        className='mx-auto'
                      />

                      <Box className='text-center'>
                        <Text className='font-semibold' size="lg">
                          Invalid File
                        </Text>

                        <Text inline className='text-[#777777] mt-1 text-sm'>
                          Unsupported or too large
                        </Text>
                      </Box>
                    </Box>
                  </Dropzone.Reject>

                  <Box>
                    <Dropzone.Idle>
                      {file.length > 0 ?
                        <Box>
                          <Icon
                            icon="teenyicons:tick-circle-solid"
                            color="#777777"
                            width="40"
                            height="40"
                            className='mx-auto'
                          />


                          <Box className='mt-2'>
                            <Text className='text-center text-[#777777] font-semibold' size="lg">
                              File Selected
                            </Text>

                            <Text inline className='text-[#777777] text-center mt-1 truncate text-sm'>
                              {file[0].path}
                            </Text>
                          </Box>
                        </Box> :
                        <Box>
                          <Image
                            alt='upload icon'
                            src={upload_cloud}
                            width={40}
                            className='mx-auto'
                          />

                          <Box className='mt-2'>
                            <Text className='font-semibold text-center' size="lg">
                              Browse File
                            </Text>

                            <Text inline className='text-[#777777] mt-1 text-sm'>
                              Drag and Drop File (1)
                            </Text>
                          </Box>
                        </Box>
                      }
                    </Dropzone.Idle>
                  </Box>
                </Group>
              </Dropzone>

              <Box className="mt-[0.3rem]">
                {error.bannerImg &&
                  <Text className="text-red-500 font-sans text-sm">
                    {error.bannerImg}
                  </Text>
                }
              </Box>
            </Box>

            <Box className='mt-5'>
              <TextArea
                maxLength={80}
                disabled={mutation.isLoading}
                value={value.description}
                onChange={({ target }) => {
                  setError({
                    ...error,
                    description: null
                  })
                  setValue({
                    ...value,
                    description: target.value
                  })
                }}
                label='Brief description of subject'
                placeholder="Enter subject description"
                className={`w-full min-h-[5rem] ${error.description ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} font-sans resize-none border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />

              <Box className="mt-[-0.3rem]">
                {error.description &&
                  <Text className="text-red-500 font-sans text-sm">
                    {error.description}
                  </Text>
                }
              </Box>
            </Box>

            <Box>
              <Select
                size='xl'
                radius={8}
                disabled={mutation.isLoading}
                placeholder='Select class'
                value={value.class}
                onChange={(val) => {
                  setError({
                    ...error,
                    class: null
                  })
                  setValue({
                    ...value,
                    class: val
                  })
                }}
                data={gradeLevelsState}
                label={
                  <span style={labelStyles}>
                    Select class for this subject
                  </span>
                }
                styles={() => ({
                  input: {
                    border: error.class ? '2px solid red' : '2px solid #E2E2E2',
                    '&:focus-within': {
                      borderColor: error.class ? 'red' : '#FAA61A',
                    },
                    color: '#555555'
                  },
                  item: {
                    '&[data-selected]': {
                      '&, &:hover': {
                        backgroundColor: '#FAA61A',
                        color: 'white',
                      },
                    }
                  },
                })}
              />

              <Box className="mt-[0.3rem]">
                {gradeLevels.isError &&
                  <Flex className='space-x-1'>
                    <Text className="text-orange-800 animate-pulse font-sans text-sm">
                      Failed to fetch classes.
                    </Text>

                    <Text onClick={() => gradeLevels.refetch()} className="text-orange-800 hover:underline hover:cursor-pointer animate-pulse font-sans text-sm">
                      Retry
                    </Text>
                  </Flex>
                }

                {gradeLevels.isLoading &&
                  <Flex className='animate-pulse items-center space-x-1'>
                    <Icon icon="eos-icons:loading" color="#555555" width="18" height="18" />

                    <Text className="text-[#555555] font-sans text-sm">
                      Loading
                    </Text>
                  </Flex>
                }
              </Box>

              <Box className="mt-[0.3rem]">
                {error.class &&
                  <Text className="text-red-500 font-sans text-sm">
                    {error.class}
                  </Text>
                }
              </Box>
            </Box>

            <Box className="text-center mt-8">
              <UnstyledButton
                disabled={mutation.isLoading}
                type="submit"
                className="px-8 h-14 disabled:opacity-50 w-60 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
              >
                {mutation.isLoading ?
                  <Icon
                    className={`animate-spin mx-auto`}
                    icon="icomoon-free:spinner2"
                    color="#white"
                    width="20"
                    height="20"
                  /> :
                  'Create new subject'
                }
              </UnstyledButton>
            </Box>
          </Form>
        </Box>
      </Modal>
    </React.Fragment>
  );
}