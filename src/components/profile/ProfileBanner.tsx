import React from "react";
import { BackgroundImage, Box, Flex, Text, UnstyledButton } from "@mantine/core";
import yellowBg from '../../assets/svgs/yellow_bg.svg'
import Image from "next/image";
import noProfile from '../../assets/imgs/no_profile.png'
import editIcon from '../../assets/svgs/edit_icon.svg'
import Link from "next/link";

const ProfileBanner = () => {
  return (
    <Box className="mx-4 sm:mx-6 lg:px-8">
      <BackgroundImage className="rounded-xl py-6 px-4 max-w-[85rem] mx-auto" src={yellowBg.src}>
        <Text className="font-bold text-white text-3xl">
          Emeka Francis
        </Text>
      </BackgroundImage>

      <Box className="flex justify-center">
        <Box className="mt-10 relative w-fit">
          <Image
            src={noProfile}
            alt='profile icon'
            className="w-[6rem] h-[6rem] shadow-sm rounded-full mx-auto"
          />

          <UnstyledButton className="absolute flex justify-center p-2 bg-[#FEEDD1] hover:brightness-75 rounded-full bottom-2 right-[-4px] items-center z-10 transition duration-75 delay-75 ease-linear">
              <Image
                src={editIcon}
                alt='edit icon'
                className="w-3 h-3"
              />
          </UnstyledButton>
        </Box>
      </Box>

      <Box className="space-y-4 mx-auto max-w-sm mt-6">
        <Box>
          <Text className="text-sm font-light truncate">Full Name</Text>

          <Flex className="border-2 rounded-lg mt-2 p-4 border-[#E2E2E2] text-[#555555]">
            <Text>
              Emeka Francis
            </Text>
          </Flex>
        </Box>

        <Box>
          <Text className="text-sm font-light">Email</Text>

          <Flex className="border-2 rounded-lg mt-2 p-4 border-[#E2E2E2] text-[#555555]">
            <Text className="truncate">
              emekafrancis@gmail.com
            </Text>
          </Flex>
        </Box>

        <Box>
          <Text className="text-sm font-light">Password</Text>

          <Flex className="border-2 items-center justify-between rounded-lg mt-2 p-4 border-[#E2E2E2] text-[#555555]">
            <Text className="truncate">
              ******
            </Text>

            <Link href='/profile/update_password' className="w-fit">
              <UnstyledButton className="h-fit w-fit text-[#FAA61A] font-semibold">
                Update
              </UnstyledButton>
            </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileBanner