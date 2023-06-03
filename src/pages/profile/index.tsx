import React from "react";
import Head from "next/head";
import { Box } from "@mantine/core";
import PageLayout from "@/layouts/PageLayout";
import ProfileNav from "@/components/nav/ProfileNav";
import ProfileBanner from "@/components/profile/ProfileBanner";

const Profile = () => {
  return (
    <PageLayout>
      <Head>
        <title>Profile</title>
      </Head>

      <ProfileNav />

      <Box className='mt-5 lg:mt-8'>
        <ProfileBanner />
      </Box>
    </PageLayout>
  )
}

export default Profile