import React, { useState } from 'react';
import { Modal, Box, Text, Select, Group, useMantineTheme, rem, UnstyledButton } from '@mantine/core';
import Input from '../custom/Input';
import TextArea from '../custom/TextArea';
import Form from '../custom/Form';
import { IconUpload, IconX } from '@tabler/icons-react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Image from 'next/image'
import { Icon } from '@iconify/react';
import upload_cloud from '../../assets/svgs/upload-cloud.svg'

interface Props {
  opened: boolean,
  close: () => void
}

export default function NewSubjectsModal({ opened, close }: Props) {
  const [file, setFile] = useState<FileWithPath[]>([])
  const theme = useMantineTheme();

  const labelStyles = {
    color: '#343434',
    fontSize: '0.875rem',
    fontWeight: 400
  };

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
            Add New Subject
          </Text>

          <Form className='my-10'>
            <Box>
              <Input
                type="text"
                // error={form.errors.email}
                label='Enter Subject Title'
                placeholder="Subject title"
                // disabled={mutation.isLoading}
                // ${form.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'}
                className={`w-full border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className='mt-5'>
              <Text className="text-sm text-[#343434]">
                Upload subject header image
              </Text>

              <Dropzone
                className='mt-[0.2rem] bg-[#F9F9F9]'
                padding={7}
                maxFiles={1}
                onDrop={(files) => setFile(files)}
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
            </Box>

            <Box className='mt-5'>
              <TextArea
                maxLength={80}
                // error={form.errors.email}
                label='Brief description of subject'
                placeholder="Enter subject description"
                // disabled={mutation.isLoading}
                // ${form.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'}
                className={`w-full min-h-[5rem] resize-none border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box>
              <Select
                size='xl'
                radius={8}
                placeholder='Select class'
                data={[
                  { value: '1', label: 'Grade 1' },
                  { value: '2', label: 'Grade 2' },
                  { value: '3', label: 'Grade 3' },
                  { value: '4', label: 'Grade 4' },
                ]}
                label={
                  <span style={labelStyles}>
                    Select class for this subject
                  </span>
                }
                styles={() => ({
                  input: {
                    border: '2px solid #E2E2E2',
                    '&:focus-within': {
                      borderColor: '#FAA61A',
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
                Create new subject
              </UnstyledButton>
            </Box>
          </Form>
        </Box>
      </Modal>
    </React.Fragment>
  );
}