import React from "react";
import Head from "next/head";
import PageLayout from "@/layouts/PageLayout";
import ProfileNav from "@/components/nav/ProfileNav";

const Profile = () => {
  return (
    <PageLayout>
      <Head>
        <title>Dashboard | Profile</title>
      </Head>

      <ProfileNav />
    </PageLayout>
  )
}

export default Profile