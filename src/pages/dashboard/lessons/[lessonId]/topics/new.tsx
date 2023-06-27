import React from 'react'
import { Box, Skeleton } from '@mantine/core'
import Head from 'next/head'
import { useRouter } from 'next/router';
import ProfileNav from '@/components/nav/ProfileNav'
import PageLayout from '@/layouts/PageLayout'

const AddTopics = () => {
  const router = useRouter();

  console.log(router.query)
  return (
    <PageLayout>
      <Head>
        <title>Add Topics</title>
      </Head>

      <ProfileNav />

      <Box>
      </Box>
    </PageLayout>
  )
}

export default AddTopics