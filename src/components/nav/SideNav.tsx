import React, { useState, useEffect } from "react";
import { Box, Center } from "@mantine/core";
import Logo from "../brand/Logo";
import Link from 'next/link'
import NavLink from "./NavLink";

const SideNav = () => {
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
      <Center className="w-full h-[70px]">
        <Link href='/dashboard/overview'>
          <Logo variant="white" />
        </Link>
      </Center>

      <Box className="mt-16 space-y-4">
        {linkData.map((linkDatum, i) => (
          <NavLink
            key={i}
            icon={linkDatum.icon}
            text={linkDatum.text}
            linkTarget={linkDatum.linkTarget}
            activePage={linkDatum.activePage}
          />
        ))}
      </Box>
    </Box>
  )
}

export default SideNav