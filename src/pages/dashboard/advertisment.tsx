import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import Head from "next/head";
import Image from "next/image";
import { Select, Box, Flex, Grid, Text, Center } from "@mantine/core";
import emptyState from "../../assets/svgs/empty_state.svg";
import AdvertCompanyCard from "@/components/advertisment/AdvertCompanyCard";
import { get_advertisement } from "@/services/advertisement";
import { useAppDispatch, useAppSelector } from "@/store";
import { setFilter } from "@/store/slices/advertisement";

const Advertisment = () => {
  const dispatch = useAppDispatch();
  const adverts = useAppSelector(({ advertisement }) => advertisement.search);
  const onLoad = React.useCallback(() => {
    get_advertisement(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Advertisment</title>
      </Head>

      <Box className="px-4 sm:px-8 md:pl-8 md:pr-14 lg:pr-20 mt-5 lg:mt-8">
        <Flex className="mt-10 justify-end space-x-4">
          <Box>
            <Select
              placeholder="All"
              onChange={(value) => dispatch(setFilter(value || ""))}
              data={[
                { value: "", label: "All" },
                { value: "youtube", label: "YouTube" },
                { value: "spotify", label: "Spotify" },
                { value: "airtel", label: "Airtel" },
              ]}
              styles={() => ({
                input: {
                  border: "2px solid #E9E5E5",
                  "&:focus-within": {
                    borderColor: "#FAA61A",
                  },
                  borderRadius: "0.5rem",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  width: "7.5rem",
                  color: "#483D3D",
                  fontWeight: 500,
                  height: "2.5rem",
                  "::placeholder": {
                    color: "#483D3D",
                    fontWeight: 500,
                  },
                },
                item: {
                  "&[data-selected]": {
                    "&, &:hover": {
                      backgroundColor: "#FAA61A",
                      color: "white",
                    },
                  },
                },
              })}
            />
          </Box>
        </Flex>

        <Box className="mt-4">
          <Box className="px-2 overflow-x-scroll w-full max-h-[48.7rem] pb-4 no-scrollbar border-2 border-[#E2E2E2] rounded-lg">
            <Box className="w-full min-w-[75rem] rounded-t-lg sticky top-0">
              <Grid className="bg-[#FFF6E8] rounded-t-lg px-4 py-3">
                <Grid.Col className="3xl:max-w-none max-w-[18rem]" span="auto">
                  <Text className="text-[#555555] font-semibold">Company</Text>
                </Grid.Col>

                <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
                  <Text className="text-[#555555] font-semibold">Duration</Text>
                </Grid.Col>

                <Grid.Col className="3xl:max-w-none max-w-[15rem]" span="auto">
                  <Text className="text-[#555555] font-semibold">
                    Projected Reach
                  </Text>
                </Grid.Col>

                <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
                  <Text className="text-[#555555] font-semibold">Reach</Text>
                </Grid.Col>

                <Grid.Col className="3xl:max-w-none max-w-[12rem]" span="auto">
                  <Text className="text-[#555555] font-semibold">Cost</Text>
                </Grid.Col>

                <Grid.Col className="3xl:max-w-none max-w-[6rem]" span="auto">
                  <Flex className="justify-between mr-5">
                    <Text className="text-[#555555] font-semibold">Status</Text>
                  </Flex>
                </Grid.Col>
              </Grid>
            </Box>

            <Box className="w-full min-w-[75rem] mt-4 space-y-3">
              {adverts.map((item, i) => (
                <AdvertCompanyCard key={i + 1} item={item} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Advertisment;
