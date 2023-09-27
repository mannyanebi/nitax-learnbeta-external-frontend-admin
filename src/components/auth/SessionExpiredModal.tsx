import React, { useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { Text, Modal, UnstyledButton } from "@mantine/core";
import { AdminContext } from "@/contexts/AdminContext";
import { Icon } from "@iconify/react";
import { logoutAdmin, refreshToken } from "@/services/auth";
import { useMutation } from "react-query";
import toast from 'react-hot-toast';
import cookie from "cookiejs";
import { getCookieItem, setCookieItem } from "@/helpers/functions/cookie";

export default function SessionExpiredModal() {
  const Router = useRouter();
  const { admin, setAdmin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`
  const refresh_token = `Bearer ${admin?.data?.refresh_token}`
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (admin) {
        const now = new Date().getTime();
        const expiryTime = admin.expiry - now;
        const twoHrs = 7200000;

        if (expiryTime > 0 && expiryTime < twoHrs) {
          renewAccessToken();
        }
      }
    }, 30000); // 30 seconds interval

    return () => {
      clearInterval(interval)
    };
  }, []);

  useEffect(() => {
    if (admin) {
      const now = new Date().getTime();
      const expiryTime = admin.expiry - now;

      if (expiryTime <= 0) {
        open(); // token expired, trigger signin modal
      }
    }
  }, []);

  const mutation = useMutation(() => logoutAdmin(token), {
    onError: () => {
      toast.error('Snap! Try again')
    },

    onSuccess: () => {
      cookie.remove('learnbeta_admin')
      setAdmin(null)
      Router.push('/auth/signin')
    }
  })

  const refreshTokenMutation = useMutation(() => refreshToken(refresh_token), {
    onError: () => {
      renewAccessToken() // retry operation
    },

    onSuccess: (data) => {
      let admin = getCookieItem('learnbeta_admin')

      admin.data.access_token = data.access_token
      admin.data.refresh_token = data.refresh_token

      setCookieItem('learnbeta_admin', admin) // update cookies with new data
      setAdmin(admin)
    }
  })

  const renewAccessToken = () => {
    refreshTokenMutation.mutate()
  };

  const sessionOverSignin = async () => {
    mutation.mutate()
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      trapFocus={false}
      withCloseButton={false}
      closeOnClickOutside={false}
      title={
        <Text className="font-[500] text-lg">
          Your session has expired
        </Text>
      }
      overlayProps={{
        color: 'black',
        blur: 5
      }}
      transitionProps={{
        duration: 100,
        timingFunction: 'linear'
      }}
    >
      <UnstyledButton
        disabled={mutation.isLoading}
        onClick={sessionOverSignin}
        className='bg-[#00433F] disabled:opacity-50 px-6 py-3 transition duration-75 delay-75 ease-linear font-semibold text-white w-28 h-12 rounded-md hover:bg-[#00433fc5]'>
        {mutation.isLoading ?
          <Icon
            className={`animate-spin mx-auto`}
            icon="icomoon-free:spinner2"
            color="#white"
            width="20"
            height="20"
          /> :
          "Sign in"
        }
      </UnstyledButton>
    </Modal>
  )
}