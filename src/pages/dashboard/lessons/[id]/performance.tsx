import React from "react";
import Head from "next/head";
import ProfileNav from "@/components/nav/ProfileNav";
import PageLayout from "@/layouts/PageLayout";
import { useRouter } from 'next/router';

export default function Performance (){
  const router = useRouter();

  return (
    <PageLayout>
      <Head>
        <title>Students Performance</title>
      </Head>

      <ProfileNav />

      {router.query.id}
    </PageLayout>
  )
}