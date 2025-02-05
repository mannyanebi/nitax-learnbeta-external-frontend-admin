import React, { useContext } from "react";
import NavElement from '../custom/NavElement'
import Logo from "../brand/Logo";
import Image from "next/image";
import noProfile from '../../assets/imgs/no_profile.png'
import { useDisclosure } from '@mantine/hooks';
import { Box, Flex, Text, Burger } from "@mantine/core";
import { SideNavDrawer } from "./SideNavDrawer";
import Link from "next/link";
import { useQuery } from "react-query";
import { getAdminProfile } from "@/services/admin";
import { AdminContext } from "@/contexts/AdminContext";

const TopNav = () => {
  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`

  const adminProfile = useQuery('adminProfile', () => getAdminProfile(token))

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <React.Fragment>
      <NavElement className="w-full z-50 sticky bg-white top-0 h-[56px] md:bg-[#F4F4F9] px-4 sm:px-8 md:pl-8 md:pr-14 lg:pr-20 border-b-2 border-[#E2E2E2]">
        <Flex className="items-center h-full justify-between md:justify-end">
          <Box className="md:hidden">
            <Link href='/dashboard/overview'>
              <Logo />
            </Link>
          </Box>

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

              <Text>
                {adminProfile.data &&
                  adminProfile.data.data.name
                }

                {adminProfile.isLoading &&
                  'Admin'
                }

                {adminProfile.isError && adminProfile.refetch()
                }
              </Text>
            </Flex>
          </Box>
        </Flex>
      </NavElement>

      <SideNavDrawer opened={opened} close={toggle} />
    </React.Fragment>
  )
}

export default TopNav