import React from 'react'
import { Box, Skeleton } from '@mantine/core'
import Head from 'next/head'
import ProfileNav from '@/components/nav/ProfileNav'
import PageLayout from '@/layouts/PageLayout'

const NewLesson = () => {
  return (
    <PageLayout>
      <Head>
        <title>Add Lesson</title>
      </Head>

      <ProfileNav />

      <Box>

      </Box>
    </PageLayout>
  )
}

export default NewLesson