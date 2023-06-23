import React from "react";
import { Box } from "@mantine/core";
import Image from "next/image";
import logo_black from '../../assets/svgs/logo_black.svg'
import logo_white from '../../assets/svgs/logo_white.svg'

interface Props {
  variant?: string
}

export default function Logo({ variant }: Props) {
  const logo = variant === 'black' ? logo_black : variant === 'white' ? logo_white : !variant && logo_black

  return (
    <Box>
      <Image 
        className="w-[139px] h-[45px]"
        alt="logo icon"
        src={logo}
      />
    </Box>
  )
}