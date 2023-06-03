import React from "react";
import NavElement from '../custom/NavElement'
import Logo from "../brand/Logo";
import Image from "next/image";
import noProfile from '../../assets/imgs/no_profile.png'
import { useDisclosure } from '@mantine/hooks';
import { Box, Flex, Text, Burger } from "@mantine/core";
import { SideNavDrawer } from "./SideNavDrawer";
import Link from "next/link";

const ProfileNav = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <React.Fragment>
      <NavElement className="w-full border-b-2 border-[#E2E2E2] h-[70px] md:bg-[#F4F4F9] px-4 sm:px-6 lg:px-8">
        <Flex className="items-center max-w-[97rem] mx-auto h-full justify-between">
          <Link href='/dashboard/overview'>
            <Logo />
          </Link>

          <Burger
            className="md:hidden"
            size='md'
            color="#FAA61A"
            opened={opened}
            onClick={toggle}
          />

          <Box className="hidden md:block">
            <Flex className="items-center space-x-2 font-bold">
              <Link href='/profile'>
                <Image
                  className="rounded-full"
                  width={40}
                  height={40}
                  alt='profile icon'
                  src={noProfile}
                />
              </Link>

              <Text>Emeka Felix</Text>
            </Flex>
          </Box>
        </Flex>
      </NavElement>

      <SideNavDrawer opened={opened} close={toggle} />
    </React.Fragment>
  )
}

export default ProfileNav