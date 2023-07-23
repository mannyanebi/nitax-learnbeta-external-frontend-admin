import React, { useState, useContext } from 'react';
import { Box, Flex, Text, UnstyledButton, Popover, Skeleton, Modal } from "@mantine/core";
import { AdminContext } from '@/contexts/AdminContext';
import { Icon } from '@iconify/react';
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { deleteGradeLevel } from '@/services/grades';
import dot_control from '../../assets/svgs/dot_control.svg'
import trash_icon from '../../assets/svgs/trash-2.svg'
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

export const ClassCardSkeleton = () => {
  return (
    <Box className="border-2 rounded-xl border-[#E2E2E2] p-5">
      <Flex className="justify-between items-center space-x-4">
        <Skeleton className='rounded-md h-3 w-40' />
        <Skeleton className='w-[32px] h-[32px] rounded-full' />
      </Flex>
    </Box>
  );
}

interface Props {
  gradeLevel: {
    id: number,
    name: string
  }
}

const ClassCard: React.FC<Props> = ({ gradeLevel }) => {
  const { admin } = useContext(AdminContext)
  const token = `beearer ${admin?.data?.access_token}`
  const queryClient = useQueryClient();
  const [popoverOpened, setPopoverOpened] = useState(false);

  const [
    openedDelete,
    { open: openDelete, close: closeDelete }
  ] = useDisclosure(false);

  const deleteMutation = useMutation((id: any) => deleteGradeLevel(id, token), {
    onError: () => {
      toast.error('Failed to delete class')
    },

    onSuccess: () => {
      toast.success('Class deleted')

      queryClient.invalidateQueries('gradeLevels');

      closeDelete()
    }
  })

  const handleClassDelete = () => {
    deleteMutation.mutate(gradeLevel.id)
  }

  return (
    <React.Fragment>
      <Box className="border-2 rounded-xl border-[#E2E2E2] p-5">
        <Flex className="justify-between items-center space-x-4">
          <Text className="text-[#888888] text-sm truncate w-full font-semibold mt-1">
            {gradeLevel.name}
          </Text>

          <Popover
            width={190}
            position="bottom"
            withArrow
            opened={popoverOpened}
            onChange={setPopoverOpened}
            shadow="md"
          >
            <Popover.Target>
              <Box className='w-1/3 h-[32px] text-right'>
                <UnstyledButton onClick={() => setPopoverOpened((v: any) => !v)}>
                  <Image
                    alt="subject banner"
                    src={dot_control}
                    className='w-[32px] h-[32px] rounded-full hover:brightness-75 transition duration-200 delay-75 ease-linear'
                  />
                </UnstyledButton>
              </Box>
            </Popover.Target>

            <Popover.Dropdown className="!px-0 py-3">
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
                      Delete Grade
                    </Text>
                  </Flex>
                </UnstyledButton>
              </Box>
            </Popover.Dropdown>
          </Popover>
        </Flex>
      </Box>

      {/* Delete Class modal start */}
      <Modal
        opened={openedDelete}
        onClose={closeDelete}
        size='lg'
        radius={12}
      >
        <Box className='px-2 sm:px-8 md:px-10'>
          <Text className='font-semibold text-center text-lg'>
            Delete Class
          </Text>

          <Text className="text-center mt-8">
            This class will be deleted and all content in it will be lost and students in this class will be removed
          </Text>

          <Flex className="justify-between space-y-3 my-10 sm:space-y-0 sm:space-x-4 sm:flex-row flex-col">
            <UnstyledButton
              onClick={handleClassDelete}
              disabled={deleteMutation.isLoading}
              className="px-8 h-12 w-full  text-center font-bold transition disabled:opacity-50 duration-75 delay-75 ease-linear hover:bg-red-500 rounded-full py-3 bg-[#E2E2E2] text-[#888888] hover:text-white"
            >
              {deleteMutation.isLoading ?
                <Icon
                  className={`animate-spin mx-auto`}
                  icon="icomoon-free:spinner2"
                  color="#white"
                  width="20"
                  height="20"
                /> :
                'Delete Class'
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
      {/* Delete Class modal end */}
    </React.Fragment>
  );
}

export default ClassCard;