import React from "react";
import { Icon } from '@iconify/react';
import { Center, Text, Box, Flex, UnstyledButton } from '@mantine/core'
import Link from "next/link"; 
import { useHover } from '@mantine/hooks';

type Props = {
  activePage: boolean,
  text: string,
  icon: string,
  linkTarget: string
} 

const NavLink: React.FC<Props> = ({
  activePage, 
  linkTarget, 
  text, 
  icon
}) => {
  const { hovered, ref }: any = useHover();

  return (
    <Center className="h-[60px] w-full">
      <Link className={`${activePage && 'ml-4 lg:ml-6'}`} href={linkTarget}>
        <UnstyledButton ref={ref} className={`w-[170px] text-left rounded-xl transition duration-75 delay-50 ease-linear px-[20px] py-[12px] ${activePage ? 'bg-[#FEEDD1] text-[#FAA61A] font-bold' : 'text-white hover:bg-[#FEEDD1] font-bold hover:text-[#FAA61A]'}`}>
          <Flex className="items-center space-x-[6px]">
            <Box className="w-[18px] h-[18px]">
              <Icon
                icon={icon} color={hovered || activePage ? '#FAA61A' : 'white'}
                width="18" height="18"
              />
            </Box>

            <Text>{text}</Text>
          </Flex>
        </UnstyledButton>
      </Link>
    </Center>
  )
}

export default NavLink