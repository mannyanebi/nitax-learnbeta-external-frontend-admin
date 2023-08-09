import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Skeleton, Collapse, Popover, Modal,  Flex, Text, UnstyledButton, List } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import yellow_arrow from '../../assets/svgs/yellow_arrow_up.svg'
import { useQuery } from 'react-query';
import { useForm } from '@mantine/form';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { Icon } from '@iconify/react';
import Input from '../custom/Input';
import TextArea from '../custom/TextArea';
import Form from '../custom/Form';
import three_dot from '../../assets/svgs/dot_control.svg'
import archive_icon from '../../assets/svgs/archive_icon.svg'
import edit_icon from '../../assets/svgs/edit-2.svg'
import trash_icon from '../../assets/svgs/trash-2.svg'
import { deleteLesson, editLesson } from '@/services/lessons';
import { AdminContext } from '@/contexts/AdminContext';
import { getLessonTopics } from '@/services/topics';

export const LessonsCardSkeleton = () => {
  return (
    <Box>
      <Box className='rounded-2xl p-5 border-2 border-[#E2E2E2]'>
        <Flex className='justify-between items-center'>
          <Skeleton className='w-20 md:w-72 h-3'/>
          <Flex className='items-center space-x-2'>
            <Skeleton className='w-7 h-7 rounded-full' />
            <Skeleton className='w-7 h-7 rounded-full' />
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

type Props = { lesson: any, subjectId: number }

export type TopicObjType = {
  id: number;
  title: string;
  content: string;
  video_url: string;
};

const LessonsCard: React.FC<Props> = ({ lesson, subjectId }) => {
  const { admin } = useContext(AdminContext)
  const queryClient = useQueryClient();
  const token =  `bearer ${admin?.data?.access_token}`

  const topics = useQuery(['topics', lesson.id], () => getLessonTopics(lesson.id.toString(), token))

  const [opened, { toggle }] = useDisclosure(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [
    openedDelete,
    { open: openDelete, close: closeDelete }
  ] = useDisclosure(false);
  const [
    openedEdit,
    { open: openEdit, close: closeEdit }
  ] = useDisclosure(false);
  const [
    openedArchive,
    { open: openArchive, close: closeArchive }
  ] = useDisclosure(false);
  const [archived, setArchived] = useState(lesson.is_archived)

  const editForm = useForm({
    initialValues: {
      title: lesson.title,
      description: lesson.description
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

  const editMutation = useMutation((data: any) => editLesson(subjectId.toString(), lesson.id, data, token), {
    onError: () => {
      toast.error('Failed to update new lesson')
    },

    onSuccess: () => {
      toast.success('Lesson updated successfully')

      queryClient.invalidateQueries('lessons');

      editForm.reset()

      closeEdit()
    },
  })

  const archiveMutation = useMutation((data: any) => editLesson(subjectId, lesson.id, data, token), {
    onError: () => {
      toast.error('Failed to update archive status')
    },

    onSuccess: () => {
      toast.success('Successfully updated archive status')

      queryClient.invalidateQueries('lessons');

      closeArchive()
    }
  })

  const deleteMutation = useMutation(() => deleteLesson(subjectId, lesson.id, token), {
    onError: () => {
      toast.error('Failed to delete lesson')
    },

    onSuccess: () => {
      toast.success('Lesson deleted')

      queryClient.invalidateQueries('lessons');

      closeDelete()
    }
  })

  const handleEditLesson = async (values: any) => {
    editMutation.mutate(values)
  }

  const handleArchive = (status: boolean) => {
    const payload = { is_archived: status }

    archiveMutation.mutate(payload)
  }

  const handleLessonDelete = () => {
    deleteMutation.mutate()
  }
  
  return (
    <React.Fragment>
      <Box>
        <Box className={`bg-[#FEEDD1] ${archived && 'opacity-50'} rounded-2xl p-5 border-2 border-[#FAA61A]`}>
          <Flex className='justify-between'>
            <Text className='font-semibold text-[#FAA61A] text-lg truncate'>
              {lesson.title}
            </Text>

            <Flex className='items-center space-x-2'>
              <UnstyledButton onClick={toggle} className={`${opened && 'rotate-180'} transition duration-150 delay-75 ease-linear`}>
                <Image
                  alt="icon"
                  src={yellow_arrow}
                  width={25}
                  height={25}
                />
              </UnstyledButton>

              <Popover
                width={190}
                position="bottom"
                withArrow
                opened={popoverOpened}
                onChange={() => {
                  setPopoverOpened((v) => !v)
                  lesson.is_archived === true && setArchived(true)
                }}
                shadow="md"
              >
                <Popover.Target>
                  <UnstyledButton 
                    onClick={() => {
                      setPopoverOpened((v: any) => !v)
                      lesson.is_archived === true && setArchived(!archived)
                    }}               
                  >
                    <Image
                      alt="icon"
                      src={three_dot}
                      width={25}
                      height={25}
                    />
                  </UnstyledButton>
                </Popover.Target>

                <Popover.Dropdown className="!px-0 py-3">
                  <Box>
                    <Link href={`/dashboard/lessons/${lesson.id}/topics/new`}>
                      <UnstyledButton className="hover:bg-[#D9D9D9] py-2 px-4 w-full transition duration-75 delay-75 ease-linear">
                        <Flex className='items-center space-x-2'>
                          <Box>
                            <Icon icon="ic:round-plus" color="#666" width="18" height="18" />

                          </Box>

                          <Text className="text- font-semibold text-[#666666]">
                            Add Topic
                          </Text>
                        </Flex>
                      </UnstyledButton>
                    </Link>
                  </Box>

                  <Box>
                    <Link href={`/dashboard/lessons/${lesson.id}/topics/edit`}>
                      <UnstyledButton className="hover:bg-[#D9D9D9] py-2 px-4 w-full transition duration-75 delay-75 ease-linear">
                        <Flex className='items-center space-x-2'>
                          <Box>
                            <Icon icon="lucide:edit" color="#666" width="16" height="16" />
                          </Box>

                          <Text className="text- font-semibold text-[#666666]">
                            Edit Topics
                          </Text>
                        </Flex>
                      </UnstyledButton>
                    </Link>
                  </Box>

                  <Box>
                    <UnstyledButton 
                      onClick={() => {
                        openEdit()
                        setPopoverOpened(false)
                        lesson.is_archived === true && setArchived(true)
                      }}
                      className="hover:bg-[#D9D9D9] py-2 px-4 w-full transition duration-75 delay-75 ease-linear"
                    >
                      <Flex className='items-center space-x-2'>
                        <Box>
                          <Image
                            alt="control icon"
                            src={edit_icon}
                            className='h-[16px] w-[16px]'
                          />
                        </Box>

                        <Text className="text- font-semibold text-[#666666]">
                          Edit Lesson
                        </Text>
                      </Flex>
                    </UnstyledButton>
                  </Box>

                  <Box>
                    <UnstyledButton
                      onClick={() => {
                        openDelete()
                        setPopoverOpened(false)
                        lesson.is_archived === true && setArchived(true)
                      }}
                      className="hover:bg-[#ffd7d7] text-[#FF0000] py-2 px-4 w-full transition duration-75 delay-75 ease-linear">
                      <Flex className='items-center space-x-2'>
                        <Box>
                          <Image
                            alt="control icon"
                            src={trash_icon}
                            className='h-[16px] w-[16px]'
                          />
                        </Box>

                        <Text className="text- font-semibold">
                          Delete Lesson
                        </Text>
                      </Flex>
                    </UnstyledButton>
                  </Box>

                  <Box>
                    <UnstyledButton 
                      onClick={() => {
                        openArchive()
                        setPopoverOpened(false)
                        lesson.is_archived === true && setArchived(true)
                      }}
                      className="hover:bg-[#D9D9D9] py-2 px-4 w-full transition duration-75 delay-75 ease-linear"
                    >
                      <Flex className='items-center space-x-2'>
                        <Box>
                          <Image
                            alt="control icon"
                            src={archive_icon}
                            className='h-[16px] w-[16px]'
                          />
                        </Box>

                        {lesson.is_archived ?
                          <Text className="text- font-semibold text-[#666666]">
                            Unarchive
                          </Text> : 
                          <Text className="text- font-semibold text-[#666666]">
                            Archive Lesson
                          </Text>
                        }
                      </Flex>
                    </UnstyledButton>
                  </Box>
                </Popover.Dropdown>
              </Popover>
            </Flex>
          </Flex>

          <Collapse
            in={opened}
            className='py-3'
            transitionDuration={150}
            transitionTimingFunction="linear"
          >
            <Box>
              {topics.data &&
                <List className='list-disc'>
                  {topics.data.data.map((topic: TopicObjType) => (
                    <List.Item key={topic.id}>
                      <Text className='font-[450] truncate'>
                        {topic.title}
                      </Text>
                    </List.Item>
                  ))
                  }
                </List>
              }

              <Text className='font-[500] mt-3 truncate'>
                Lesson Description
              </Text>

              <Text className='mt-2'>
                {lesson.description}
              </Text>
            </Box>

            <Flex className='mt-10 justify-end'>
              <Link className='text-[#444444] hover:underline font-semibold text-sm' href={`/dashboard/lessons/${lesson.id}/performance`}>
                View students’ performance
              </Link>
            </Flex>
          </Collapse>
        </Box>
      </Box>

      {/* Edit lesson modal start */}
      <Modal
        size='lg'
        radius={12}
        opened={openedEdit}
        onClose={closeEdit}
        centered>
        <Box className='px-2 sm:px-8 md:px-10'>
          <Text className='font-semibold text-center text-lg'>
            Edit Lesson
          </Text>

          <Form 
            onSubmit={editForm.onSubmit((values) => handleEditLesson(values))}
            className='my-10'
          >
            <Box>
              <Input
                type="text"
                {...editForm.getInputProps('title')}
                error={editForm.errors.title}
                label='Enter Lesson Title'
                placeholder="Lesson title"
                disabled={editMutation.isLoading}
                className={`w-full ${editForm.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className='mt-5'>
              <TextArea
                maxLength={80}
                {...editForm.getInputProps('description')}
                error={editForm.errors.description}
                label='Brief description of lesson'
                placeholder="Enter lesson description"
                disabled={editMutation.isLoading}
                className={`w-full ${editForm.errors.email ? 'border-red-500 focus:outline-red-500' : 'border-[#E2E2E2] focus:outline-[#FAA61A]'} min-h-[5rem] resize-none border-2 px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className="text-center mt-8">
              <UnstyledButton
                disabled={editMutation.isLoading}
                type="submit"
                className="px-8 h-14 w-56 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
              >
                {editMutation.isLoading ?
                  <Icon
                    className={`animate-spin mx-auto`}
                    icon="icomoon-free:spinner2"
                    color="#white"
                    width="20"
                    height="20"
                  /> :
                  'Save changes'
                }
              </UnstyledButton>
            </Box>
          </Form>
        </Box>
      </Modal>
      {/* Edit lesson modal start */}

      {/* Delete lesson modal start */}
      <Modal
        opened={openedDelete}
        onClose={closeDelete}
        size='lg'
        radius={12}
      >
        <Box className='px-2 sm:px-8 md:px-10'>
          <Text className='font-semibold text-center text-lg'>
            Delete Lesson
          </Text>

          <Text className="text-center mt-10">
            This Lesson will be deleted and all content in it will be lost and no longer accessible to students that offer the subject
          </Text>

          <Flex className="justify-between space-y-3 my-10 sm:space-y-0 sm:space-x-4 sm:flex-row flex-col">
            <UnstyledButton
              onClick={handleLessonDelete}
              disabled={deleteMutation.isLoading}
              className="px-8 h-12 disabled:opacity-50 text-center font-bold transition duration-75 w-full delay-75 ease-linear hover:bg-red-500 rounded-full py-3 bg-[#E2E2E2] text-[#888888] hover:text-white"
            >
              {deleteMutation.isLoading ?
                <Icon
                  className={`animate-spin mx-auto`}
                  icon="icomoon-free:spinner2"
                  color="#white"
                  width="20"
                  height="20"
                /> :
                'Delete Lesson'
              }
            </UnstyledButton>

            <UnstyledButton
              onClick={closeDelete}
              className="px-8 h-12 text-center font-bold transition duration-75 w-full delay-75 ease-linear hover:bg-[#da9217] rounded-full py-3 bg-[#FAA61A] text-white"
            >
              Cancel
            </UnstyledButton>
          </Flex>
        </Box>
      </Modal>
      {/* Delete lesson modal end */}

      {/* Archive lesson modal start */}
      <Modal
        opened={openedArchive}
        onClose={closeArchive}
        size='lg'
        radius={12}
      >
        <Box className='px-2 sm:px-8 md:px-10'>
          <Text className='font-semibold text-center text-lg'>
            {lesson.is_archived ? 
              'Unarchive Lesson' : 
              'Archive Lesson'
            }
          </Text>

          <Text className="text-center mt-10">
            {lesson.is_archived ?
              'This Lesson will be and all content in it will be available to students that offer the subject till it is archived again by the Admin' :
              'This Lesson will be and all content in it will be unavailable to students that offer the subject till it is unarchived by the Admin'
            }
          </Text>

          <Flex className="justify-between space-y-3 my-10 sm:space-y-0 sm:space-x-4 sm:flex-row flex-col">
            {lesson.is_archived ?
              <UnstyledButton
                disabled={archiveMutation.isLoading}
                onClick={() => handleArchive(false)}
                className="px-8 disabled:opacity-50 h-12 text-center font-bold transition duration-75 w-full delay-75 ease-linear hover:bg-[#FAA61A] text-[#888888] rounded-full py-3 bg-[#E2E2E2] hover:text-white"
              >
                {archiveMutation.isLoading ?
                  <Icon
                    className={`animate-spin mx-auto`}
                    icon="icomoon-free:spinner2"
                    color="#white"
                    width="20"
                    height="20"
                  /> :
                  'Unarchive Lesson'
                }
              </UnstyledButton> :
              <UnstyledButton
                disabled={archiveMutation.isLoading}
                onClick={() => handleArchive(true)}
                className="px-8 disabled:opacity-50 h-12 text-center font-bold transition duration-75 w-full delay-75 ease-linear hover:bg-[#FAA61A] text-[#888888] rounded-full py-3 bg-[#E2E2E2] hover:text-white"
              >
                {archiveMutation.isLoading ?
                  <Icon
                    className={`animate-spin mx-auto`}
                    icon="icomoon-free:spinner2"
                    color="#white"
                    width="20"
                    height="20"
                  /> :
                  'Archive Lesson'
                }
              </UnstyledButton>
            }

            <UnstyledButton
              onClick={closeArchive}
              className="px-8 h-12 text-center font-bold transition duration-75 w-full delay-75 ease-linear hover:bg-[#da9217] rounded-full py-3 bg-[#FAA61A] text-white"
            >
              Cancel
            </UnstyledButton>
          </Flex>
        </Box>
      </Modal>
      {/* Archive lesson modal end */}
    </React.Fragment>
  )
}

export default LessonsCard