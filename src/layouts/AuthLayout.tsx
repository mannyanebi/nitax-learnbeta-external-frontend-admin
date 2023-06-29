import React from "react";
import PageLayout from "./PageLayout";
import { Box, BackgroundImage } from '@mantine/core'
import Logo from "@/components/brand/Logo";
import kid_hero from '../assets/svgs/kid_hero.svg'

type Props = { children: React.ReactNode }

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <PageLayout>
      <Box>
        <Box className="hidden lg:block">
          <BackgroundImage src={kid_hero.src} className="w-[55%] h-[100vh] bg-cover bg-center bg-no-repeat fixed bg-[#F4F4F9]">
          </BackgroundImage>
        </Box>

        <Box className="lg:ml-[55%]">
          <Box className="hidden lg:block">
            <Box className="lg:flex justify-end px-6 sm:px-10 py-6 w-full max-w-xl mx-auto">
              <Logo />
            </Box>
          </Box>

          <Box className="px-6 sm:px-8 md:px-10 py-16 sm:py-20 w-full max-w-lg 2xl:max-w-[34rem] mx-auto">
            {children}
          </Box>
        </Box>
      </Box>
    </PageLayout>
  )
}

export default AuthLayout