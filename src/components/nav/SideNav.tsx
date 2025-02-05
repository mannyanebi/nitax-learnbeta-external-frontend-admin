import React, { useState, useEffect, useContext } from "react";
import { Box, Center, Flex, Text } from "@mantine/core";
import Logo from "../brand/Logo";
import noProfile from '../../assets/imgs/no_profile.png'
import Link from 'next/link'
import NavLink from "./NavLink";
import Image from 'next/image'
import { useQuery } from "react-query";
import Logout from './Logout'
import { AdminContext } from "@/contexts/AdminContext";
import { getAdminProfile } from "@/services/admin";

type Props = { mobile?: boolean }

const SideNav: React.FC<Props> = ({ mobile }) => {
  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`

  const adminProfile = useQuery('adminProfile', () => getAdminProfile(token))

  mobile = mobile ? mobile : false

  const [activePage, setActivePage] = useState({
    overview: false,
    analytics: false,
    subjects: false,
    classes: false,
    lessons: false,
    subscriptions: false,
    advertisment: false
  })

  useEffect(() => {
    const page = window.location.href.split("?")[0].split("/").pop()
    const url = window.location.href.split("/")

    if (page === "overview") {
      setActivePage({
        ...activePage,
        overview: true,
      })
    }

    if (page === "analytics") {
      setActivePage({
        ...activePage,
        analytics: true,
      })
    }

    if (page === "subjects") {
      setActivePage({
        ...activePage,
        subjects: true,
      })
    }

    if (page === "classes") {
      setActivePage({
        ...activePage,
        classes: true,
      })
    }

    if (page === "lessons") {
      setActivePage({
        ...activePage,
        lessons: true,
      })
    }

    if (page === "subscriptions" || url.includes('subscriptions')) {
      setActivePage({
        ...activePage,
        subscriptions: true,
      })
    }

    if (page === "advertisment") {
      setActivePage({
        ...activePage,
        advertisment: true,
      })
    }
  }, [])

  const linkData = [
    {
      text: 'Dashboard',
      linkTarget: '/dashboard/overview',
      activePage: activePage.overview,
      icon: 'radix-icons:dashboard'
    },

    {
      text: 'Analytics',
      linkTarget: '/dashboard/analytics',
      activePage: activePage.analytics,
      icon: 'majesticons:analytics'
    },

    {
      text: 'Subjects',
      linkTarget: '/dashboard/subjects',
      activePage: activePage.subjects,
      icon: 'jam:document'
    },

    {
      text: 'Classes',
      linkTarget: '/dashboard/classes',
      activePage: activePage.classes,
      icon: 'material-symbols:group'
    },

    {
      text: 'Lessons',
      linkTarget: '/dashboard/lessons',
      activePage: activePage.lessons,
      icon: 'jam:write-f'
    },

    {
      text: 'Subscriptions',
      linkTarget: '/dashboard/subscriptions',
      activePage: activePage.subscriptions,
      icon: 'mdi:dollar'
    },

    {
      text: 'Advertisment',
      linkTarget: '/dashboard/advertisment',
      activePage: activePage.advertisment,
      icon: 'ri:advertisement-line'
    }
  ]

  return (
    <Box className="w-full max-w-[12.6rem] h-[100vh] fixed overflow-y-auto bg-[#00433F]">
      <Box className="relative h-full">
        <Box className={`${mobile && 'hidden'}`}>
          <Center className="w-full h-[56px]">
            <Link href='/dashboard/overview'>
              <Logo variant="white" />
            </Link>
          </Center>
        </Box>

        <Box className={`${mobile ? 'mt-6' : 'mt-14'} space-y-4`}>
          {linkData.map((linkDatum, i) => (
            <NavLink
              key={i}
              icon={linkDatum.icon}
              text={linkDatum.text}
              linkTarget={linkDatum.linkTarget}
              activePage={linkDatum.activePage}
            />
          ))}

          {mobile &&
            <Box className="max-w-[8rem] py-[12px] !mt-4 w-full mx-auto">
              <Link href='/profile'>
                <Flex className="items-center space-x-[6px] font-bold">
                  <Image
                    className="rounded-full"
                    width={18}
                    height={18}
                    alt='profile icon'
                    src={noProfile}
                  />

                  <Text className="truncate font-bold text-white">
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
              </Link>
            </Box>
          }
        </Box>

        <Box className="mt-4 flex justify-center w-full">
          <Logout />
        </Box>
      </Box>
    </Box>
  )
}

export default SideNav