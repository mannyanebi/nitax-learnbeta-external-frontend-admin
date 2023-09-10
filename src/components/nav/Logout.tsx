import React, { useContext } from "react";
import { Icon } from '@iconify/react';
import { Center, Text, Box, Flex, UnstyledButton } from '@mantine/core'
import cookie from "cookiejs";
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { logoutAdmin } from "@/services/auth";
import { AdminContext } from "@/contexts/AdminContext";

const Logout: React.FC = () => {
  const { admin, setAdmin } = useContext(AdminContext)
  const Router = useRouter();
  const token = `Bearer ${admin?.data?.access_token}`

  const mutation = useMutation(() => logoutAdmin(token))

  const handleLogout = () => {
    mutation.mutate()

    cookie.remove('learnbeta_admin')
    setAdmin(null)
    Router.push('/auth/signin')
  }

  return (
    <Center className="h-[60px] w-full">
      <UnstyledButton onClick={handleLogout} className='w-[160px] text-left rounded-xl transition duration-75 delay-50 ease-linear px-[15px] py-[12px] text-white text-sm font-[600]'>
        <Flex className="items-center space-x-[6px]">
          <Box className="w-[18px] h-[18px]">
            <Icon
              icon='heroicons-outline:logout' color='white'
              width="18" height="18"
            />
          </Box>

          <Text>Logout</Text>
        </Flex>
      </UnstyledButton>
    </Center>
  )
}

export default Logout