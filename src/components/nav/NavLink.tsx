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
      <Link className={`${activePage && 'ml-2 lg:ml-4'}`} href={linkTarget}>
        <UnstyledButton ref={ref} className={`w-[160px] text-left text-sm rounded-xl transition duration-75 delay-50 ease-linear px-[15px] py-[12px] ${activePage ? 'bg-[#FEEDD1] text-[#FAA61A] font-[600]' : 'text-white hover:bg-[#FEEDD1] font-[600] hover:text-[#FAA61A]'}`}>
          <Flex className="items-center space-x-[5px]">
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