import React from "react";
import Head from "next/head";
import { Box } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import ProfileNav from "@/components/nav/ProfileNav";
import PageLayout from "@/layouts/PageLayout";

export default function EditAssessments() {
  return (
    <PageLayout>
      <Head>
        <title>
          Edit Assessments
        </title>
      </Head>

      <ProfileNav />

      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />

      <Box>

      </Box>
    </PageLayout>
  )
}