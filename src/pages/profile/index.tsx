import React from "react";
import Head from "next/head";
import { Box } from "@mantine/core";
import PageLayout from "@/layouts/PageLayout";
import ProfileNav from "@/components/nav/ProfileNav";
import ProfileBanner from "@/components/profile/ProfileBanner";
import AppLayout from "@/layouts/AppLayout";
import { Toaster } from 'react-hot-toast';


const Profile = () => {
  return (
    <PageLayout>
      <AppLayout>
        <Head>
          <title>Profile</title>
        </Head>

        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />

        <ProfileNav />

        <Box className='mt-5 lg:mt-8 pb-20'>
          <ProfileBanner />
        </Box>
      </AppLayout>
    </PageLayout>
  )
}

export default Profile