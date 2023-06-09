import React, { useState, useEffect } from "react";
import { Box, Center, Flex, Text } from "@mantine/core";
import Logo from "../brand/Logo";
import noProfile from '../../assets/imgs/no_profile.png'
import Link from 'next/link'
import NavLink from "./NavLink";
import Image from 'next/image'
import Logout from './Logout'

type Props = { mobile?: boolean }

const SideNav: React.FC<Props> = ({ mobile }) => {
  mobile = mobile ? mobile : false

  const [activePage, setActivePage] = useState({
    overview: false,
    analytics: false,
    subjects: false,
    classes: false,
    lessons: false,
    subscriptions: false
  })

  useEffect(() => {
    const page = window.location.href.split("/").pop()

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

    if (page === "subscriptions") {
      setActivePage({
        ...activePage,
        subscriptions: true,
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
    }
  ]

  return (
    <Box className="w-full max-w-[14rem] lg:max-w-[15rem] h-[100vh] fixed overflow-y-auto bg-[#00433F]">
      <Box className="relative h-full">
        <Box className={`${mobile && 'hidden'}`}>
          <Center className="w-full h-[70px]">
            <Link href='/dashboard/overview'>
              <Logo variant="white" />
            </Link>
          </Center>
        </Box>

        <Box className={`${mobile ? 'mt-6' : 'mt-16'} space-y-4`}>
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
            <Box className="max-w-[8rem] !mt-10 w-full mx-auto">
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
                    Emeka Felix Uzodinma
                  </Text>
                </Flex>
              </Link>
            </Box>
          }
        </Box>

        <Box className="mt-4 absolute bottom-[10%] flex justify-center w-full">
          <Logout />
        </Box>
      </Box>
    </Box>
  )
}

export default SideNav