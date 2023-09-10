import React, { useState } from "react";
import { Box, Skeleton, Collapse, Flex, Text, UnstyledButton, Modal } from "@mantine/core";
import Image from 'next/image'
import logo_icon from '../../assets/svgs/learnBetaLogo.svg'
import rotate_arrow from '../../assets/svgs/rotate_arrow.svg'
import { useDisclosure } from '@mantine/hooks';
import { formatDate } from "@/helpers/functions/formatDate";

export const VoucherCardSkeleton = () => {
  return <Skeleton className="h-52" />
}

interface Props { style: any; item: any }

const VoucherCard: React.FC<Props> = ({ style, item }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);

  const colors = [
    'red',
    'yellow',
    'green',
    'blue',
    'purple',
    'gray'
  ];

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const [color] = useState(getRandomColor())

  return (
    <Box style={style} className={`bg-${color}-900 h-52 py-4 px-5 overflow-x-hidden`}>
      <Image
        alt="icon"
        src={logo_icon}
        width={93}
        height={29}
      />

      <Flex className="flex justify-center items-center mt-6">
        <Flex className="space-x-2 items-center">
          <Text className="font-bold text-white text-2xl">
            Voucher
          </Text>

          <UnstyledButton onClick={toggle} className={`${opened && 'rotate-180'} transition duration-150 delay-75 ease-linear`}>
            <Image
              alt="icon"
              src={rotate_arrow}
              width={25}
              height={25}
            />
          </UnstyledButton>
        </Flex>
      </Flex>

      <Collapse 
        in={opened} 
        className='mt-3'
        transitionDuration={500} 
        transitionTimingFunction="linear"
      >
        <Box className="text-center">
          <UnstyledButton onClick={openModal} className="hover:brightness-90 transition duration-75 delay-0 ease-linear">
            <Text className="text-white text-center backdrop-blur-lg font-semibold rounded-full bg-neutral-200 bg-opacity-30 w-fit max-w-full backdrop-filter px-5 mx-auto py-4 truncate">
              {item.code}
            </Text>
          </UnstyledButton>
        </Box>
      </Collapse>

      <Box className="hidden">
        <Box className="bg-red-900" />
        <Box className="bg-yellow-900" />
        <Box className="bg-green-900" />
        <Box className="bg-blue-900" />
        <Box className="bg-purple-900" />
        <Box className="bg-gray-900" />
      </Box>

      <Modal 
        opened={openedModal} 
        onClose={closeModal} 
        centered
        withCloseButton={false}
        title={
          <Text className="font-semibold text-lg text-[#444444]">
            Voucher Details
          </Text>
        }
      >
        <Box className="my-4 space-y-3 w-full">
          <Box className="flex justify-between w-full">
            <Box>
              <Text className="font-[500] text-[#444444]">
                ID
              </Text>
            </Box>

            <Box>
              <Text className="text-right font-[600] text-[#00433F]">
                {item.id}
              </Text>
            </Box>
          </Box>

          <Box className="flex justify-between w-full">
            <Box>
              <Text className="font-[500] text-[#444444]">
                Voucher code
              </Text>
            </Box>

            <Box>
              <Text className="text-right font-[600] text-[#00433F]">
                {item.code}
              </Text>
            </Box>
          </Box>

          <Box className="flex justify-between w-full">
            <Box>
              <Text className="font-[500] text-[#444444]">
                Voucher value (₦)
              </Text>
            </Box>

            <Box>
              <Text className="text-right font-[600] text-[#00433F]">
                {item.value}
              </Text>
            </Box>
          </Box>

          <Box className="flex justify-between w-full">
            <Box>
              <Text className="font-[500] text-[#444444]">
                Voucher validity (Days)
              </Text>
            </Box>

            <Box>
              <Text className="text-right font-[600] text-[#00433F]">
                {item.validity}
              </Text>
            </Box>
          </Box>

          <Box className="flex justify-between w-full">
            <Box>
              <Text className="font-[500] text-[#444444]">
                Used
              </Text>
            </Box>

            <Box>
              <Text className="text-right font-[600] text-[#00433F]">
                {item.used ? 'YES' : 'NOT YET'}
              </Text>
            </Box>
          </Box>

          <Box className="flex justify-between w-full">
            <Box>
              <Text className="font-[500] text-[#444444]">
                Expiration date
              </Text>
            </Box>

            <Box>
              <Text className="text-right font-[600] text-[#00433F]">
                {formatDate(item.expiration_date)}
              </Text>
            </Box>
          </Box>

          <Box className="flex justify-between w-full">
            <Box>
              <Text className="font-[500] text-[#444444]">
                Subscription plan
              </Text>
            </Box>

            <Box>
              <Text className="text-right font-[600] text-[#00433F]">
                {item.subscription_plan}
              </Text>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default VoucherCard