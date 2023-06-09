import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Skeleton, Collapse, Popover, Modal,  Flex, Text, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import yellow_arrow from '../../assets/svgs/yellow_arrow_up.svg'
import three_dot from '../../assets/svgs/dot_control.svg'
import archive_icon from '../../assets/svgs/archive_icon.svg'
import edit_icon from '../../assets/svgs/edit-2.svg'
import trash_icon from '../../assets/svgs/trash-2.svg'

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

type Props = { 
  lesson: any
}

const LessonsCard: React.FC<Props> = ({ lesson }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [
    openedDelete,
    { open: openDelete, close: closeDelete }
  ] = useDisclosure(false);
  const [
    openedArchive,
    { open: openArchive, close: closeArchive }
  ] = useDisclosure(false);

  return (
    <React.Fragment>
      <Box>
        <Box className='bg-[#FEEDD1] rounded-2xl p-5 border-2 border-[#FAA61A]'>
          <Flex className='justify-between'>
            <Text className='font-semibold text-[#FAA61A] text-lg truncate'>
              {lesson.name}
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
                onChange={setPopoverOpened}
                shadow="md"
              >
                <Popover.Target>
                  <UnstyledButton onClick={() => setPopoverOpened((v: any) => !v)}>
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
                    <Link href={`/dashboard/lessons/${lesson.id}`}>
                      <UnstyledButton className="hover:bg-[#D9D9D9] py-2 px-4 w-full transition duration-75 delay-75 ease-linear">
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
                    </Link>
                  </Box>

                  <Box>
                    <UnstyledButton
                      onClick={() => {
                        openDelete()
                        setPopoverOpened(false)
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

                        <Text className="text- font-semibold text-[#666666]">
                          Archive Lesson
                        </Text>
                      </Flex>
                    </UnstyledButton>
                  </Box>
                </Popover.Dropdown>
              </Popover>
            </Flex>
          </Flex>

          <Collapse
            in={opened}
            className='my-3'
            transitionDuration={150}
            transitionTimingFunction="linear"
          >
            <Box>
              <Text>
                What is {lesson.name}?
              </Text>

              <Text>
                What is {lesson.name}?
              </Text>

              <Text>
                What is {lesson.name}?
              </Text>

              <Text>
                What is {lesson.name}?
              </Text>
            </Box>

            <Box className='mt-10'>
              <Link className='text-[#444444] hover:underline font-semibold text-sm' href={`/dashboard/lessons/${lesson.id}/performance`}>
                View students’ performance
              </Link>
            </Box>
          </Collapse>
        </Box>
      </Box>

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
              className="px-8 h-12 text-center font-bold transition duration-75 w-full delay-75 ease-linear hover:bg-red-500 rounded-full py-3 bg-[#E2E2E2] text-[#888888] hover:text-white"
            >
              Delete Lesson
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
            Archive Lesson
          </Text>

          <Text className="text-center mt-10">
            This Lesson will be and all content in it will be unavailable to students that offer the subject till it is unarchived by the Admin
          </Text>

          <Flex className="justify-between space-y-3 my-10 sm:space-y-0 sm:space-x-4 sm:flex-row flex-col">
            <UnstyledButton
              className="px-8 h-12 text-center font-bold transition duration-75 w-full delay-75 ease-linear hover:bg-[#FAA61A] text-[#888888] rounded-full py-3 bg-[#E2E2E2] hover:text-white"
            >
              Archive Lesson
            </UnstyledButton>

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