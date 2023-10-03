import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import { Box, Text, Flex, Modal, UnstyledButton, Center } from "@mantine/core";
import { getSubjects } from "@/services/subjects";
import { useQuery } from "react-query";
import { AdminContext } from "@/contexts/AdminContext";
import DashboardLayout from "@/layouts/DashboardLayout";
import { EmptyState } from "@/components/lessons/EmptyState";
import SubjectControl from "@/components/lessons/SubjectControl";
import { SubjectControlSkeleton } from "@/components/lessons/SubjectControl";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import Image from "next/image";
import plus_icon from "../../../assets/svgs/plus_icon.svg";
import LessonsCard, {
  LessonsCardSkeleton,
} from "@/components/lessons/LessonsCard";
import NewLessonModal from "@/components/lessons/NewLessonModal";
import RefetchButton from "@/components/lessons/RefetchButton";
import { getSubjectLessons } from "@/services/lessons";
import { SubjectType } from "../subjects";

const Lessons = () => {
  const { admin } = useContext(AdminContext);
  const token = `Bearer ${admin?.data?.access_token}`;
  const [activeSubject, setActiveSubject] = useState<null | SubjectType>(null);

  const subjectId = activeSubject ? activeSubject.id.toString() : "";
  const subjects = useQuery("subjects", () => getSubjects(token));
  const lessons = useQuery(
    ["lessons", activeSubject?.id],
    () => getSubjectLessons(subjectId, token),
    {
      enabled: false,
    }
  );

  const { width } = useViewportSize();
  const [openedMobile, { open: openMobile, close: closeMobile }] =
    useDisclosure(false);
  const [
    openedNewLessonModal,
    { open: openNewLessonModal, close: closeNewLessonModal },
  ] = useDisclosure(false);

  useEffect(() => {
    if (subjectId) {
      lessons.refetch();
    }
  }, [lessons, subjectId]);

  useEffect(() => {
    width > 1024 && closeMobile();
    activeSubject && width < 1024 && openMobile();
  }, [width]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has("subjectId")) {
      const subjId = params.get("subjectId");

      if (subjId !== null) {
        const active = {
          id: Number(subjId),
          name: "...",
          description: "...",
          image: "",
          grade_level_name: "...",
          created_at: "",
          updated_at: "",
        };

        setActiveSubject(active);
      }
    }
  }, [subjects.data]);

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Lessons</title>
      </Head>

      <Box>
        <Box className="w-full lg:h-[100%] lg:max-w-[12.6rem] lg:fixed no-scrollbar overflow-y-auto">
          <Box className="pb-20 lg:pb-40 px-4 sm:px-8 md:pl-6 md:pr-14 lg:pr-6 space-y-4 w-full h-full lg:border-r-2 border-[#E2E2E2] pt-5">
            <Text className="text-[#444444] font-semibold text-lg">
              Subjects
            </Text>

            {subjects.isLoading &&
              [1, 2, 3, 4, 5, 6].map((subj: number) => (
                <SubjectControlSkeleton key={subj} />
              ))}

            {subjects.data &&
              subjects.data.data.map((subject: SubjectType) => (
                <SubjectControl
                  key={subject.id}
                  setActiveSubject={setActiveSubject}
                  activeSubject={activeSubject}
                  openMobile={openMobile}
                  subject={subject}
                />
              ))}

            {subjects.data && subjects.data.data.length < 1 && (
              <Box className="font-semibold w-full border-2 border-[#E2E2E2] rounded-xl text-center text-[#777777] p-5">
                <Text className="mt">No subjects available</Text>
              </Box>
            )}

            {subjects.isError && (
              <RefetchButton
                retry={() => subjects.refetch()}
                message="Failed to fetch subjects!"
              />
            )}
          </Box>
        </Box>

        {/* Preview Lessons Mobile Modal start */}
        <Modal
          fullScreen
          padding={0}
          opened={openedMobile}
          onClose={() => {
            closeMobile();
            setActiveSubject(null);
          }}
          size="lg"
          radius={12}
        >
          {activeSubject && (
            <Box className="px-4 sm:px-8 pb-20 md:px-10">
              <Box className="max-w-[40rem] lg:max-w-[62rem] xl:max-w-[75rem] 2xl:max-w-[85rem] mx-auto ">
                <Box className="sm:flex sm:space-x-4 md:space-x-7 space-y-4 sm:space-y-0 sm:justify-center mt-4">
                  <Box className="border-2 w-[285px] sm:mx-0 mx-auto rounded-2xl flex items-center h-[130px] border-[#E2E2E2] p-5">
                    <Box className="w-full space-y-2">
                      <Flex className="justify-between space-x-7 overflow-hidden items-center">
                        <Text className="text-[#777777] font-semibold ">
                          ✏️ Subject
                        </Text>

                        <Text className="text-[#00433F] truncate font-bold text-right">
                          {activeSubject.name}
                        </Text>
                      </Flex>

                      <Flex className="justify-between space-x-7 overflow-hidden items-center">
                        <Text className="text-[#777777] font-semibold ">
                          🎒 Class
                        </Text>

                        <Text className="text-[#00433F] truncate font-bold text-right">
                          {activeSubject.grade_level_name}
                        </Text>
                      </Flex>

                      <Flex className="justify-between space-x-7 overflow-hidden items-center">
                        <Text className="text-[#777777] font-semibold ">
                          📚 Lessons
                        </Text>

                        <Text className="text-[#00433F] truncate font-bold text-right">
                          {lessons.data &&
                            (lessons.data.data.length > 1
                              ? lessons.data.data.length
                              : 0)}

                          {lessons.isLoading && "..."}

                          {lessons.isError && "0"}
                        </Text>
                      </Flex>
                    </Box>
                  </Box>

                  <Box className="w-fit mx-auto sm:mx-0">
                    <UnstyledButton onClick={openNewLessonModal}>
                      <Box className="border-2 h-[130px] w-[285px] rounded-2xl flex items-center border-[#E2E2E2] border-dashed p-5">
                        <Box className="w-full">
                          <Flex className="justify-center">
                            <Box>
                              <Text className="text-[#777777] font-semibold">
                                Add New Lesson
                              </Text>

                              <Flex className="justify-center mt-4">
                                <Box className="h-[40px] w-[40px]">
                                  <Image
                                    alt="display icon"
                                    src={plus_icon}
                                    className="rounded-full h-[40px] w-[40px]"
                                  />
                                </Box>
                              </Flex>
                            </Box>
                          </Flex>
                        </Box>
                      </Box>
                    </UnstyledButton>
                  </Box>
                </Box>

                <Text className="text-[#444444] mt-7 font-semibold text-lg">
                  Lessons
                </Text>

                <Box className="space-y-4 mt-7">
                  {lessons.isLoading &&
                    [1, 2, 3, 4].map((lesson: number) => (
                      <LessonsCardSkeleton key={lesson} />
                    ))}

                  {lessons.data &&
                    lessons.data.data
                      .filter((l: any) => l.is_archived === false)
                      .map((l: any) => (
                        <LessonsCard
                          subjectId={Number(subjectId)}
                          key={l.id}
                          lesson={l}
                        />
                      ))}

                  {lessons.data &&
                    lessons.data.data.length > 0 &&
                    lessons.data.data.filter(
                      (l: any) => l.is_archived === false
                    ).length < 1 && (
                      <EmptyState message="No active lessons yet" />
                    )}

                  {lessons.data && lessons.data.data.length < 1 && (
                    <EmptyState message="No lessons available" />
                  )}

                  {lessons.isError && (
                    <RefetchButton
                      retry={() => lessons.refetch()}
                      message="Failed to fetch lessons!"
                    />
                  )}
                </Box>

                {!lessons.isError && (
                  <Box>
                    <Text className="text-[#444444] mt-10 font-semibold text-lg">
                      Archived Lessons
                    </Text>

                    <Box className="space-y-4 mt-7">
                      {lessons.isLoading &&
                        [1, 2, 3, 4].map((lesson: number) => (
                          <LessonsCardSkeleton key={lesson} />
                        ))}

                      {lessons.data &&
                        lessons.data.data
                          .filter((l: any) => l.is_archived === true)
                          .map((l: any) => (
                            <LessonsCard
                              subjectId={Number(subjectId)}
                              key={l.id}
                              lesson={l}
                            />
                          ))}

                      {lessons.data &&
                        lessons.data.data.filter(
                          (l: any) => l.is_archived === true
                        ).length < 1 && (
                          <EmptyState message="No archived lessons yet" />
                        )}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Modal>
        {/* Preview Lessons Mobile Modal end */}

        <Box className="ml-[12.6rem] hidden lg:block px-4 sm:px-8 md:pl-8 md:pr-14 lg:pr-20 space-y-8 pt-5">
          {activeSubject && (
            <Box>
              <Text className="text-[#444444] font-semibold text-lg">
                Lessons
              </Text>

              <Flex className="space-x-7 mt-4 ">
                <Box className="border-2 w-[285px] rounded-2xl flex items-center h-[130px] border-[#E2E2E2] p-5">
                  <Box className="w-full space-y-2">
                    <Flex className="justify-between space-x-7 overflow-hidden items-center">
                      <Text className="text-[#777777] font-semibold ">
                        ✏️ Subject
                      </Text>

                      <Text className="text-[#00433F] truncate font-bold text-right">
                        {activeSubject.name}
                      </Text>
                    </Flex>

                    <Flex className="justify-between space-x-7 overflow-hidden items-center">
                      <Text className="text-[#777777] font-semibold ">
                        🎒 Class
                      </Text>

                      <Text className="text-[#00433F] truncate font-bold text-right">
                        {activeSubject.grade_level_name}
                      </Text>
                    </Flex>

                    <Flex className="justify-between space-x-7 overflow-hidden items-center">
                      <Text className="text-[#777777] font-semibold ">
                        📚 Lessons
                      </Text>

                      <Text className="text-[#00433F] truncate font-bold text-right">
                        {lessons.data &&
                          (lessons.data.data.length > 0
                            ? lessons.data.data.length
                            : 0)}

                        {lessons.isLoading && "..."}

                        {lessons.isError && "0"}
                      </Text>
                    </Flex>
                  </Box>
                </Box>

                <Box className="w-fit">
                  <UnstyledButton onClick={openNewLessonModal}>
                    <Box className="border-2 w-[285px] rounded-2xl flex items-center h-[130px] border-[#E2E2E2] border-dashed p-5">
                      <Box className="w-full">
                        <Flex className="justify-center">
                          <Box>
                            <Text className="text-[#777777] font-semibold">
                              Add New Lesson
                            </Text>

                            <Flex className="justify-center mt-4">
                              <Box className="h-[40px] w-[40px]">
                                <Image
                                  alt="display icon"
                                  src={plus_icon}
                                  className="rounded-full h-[40px] w-[40px]"
                                />
                              </Box>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                    </Box>
                  </UnstyledButton>
                </Box>
              </Flex>

              <Box className="space-y-4 mt-7">
                {lessons.isLoading &&
                  [1, 2, 3, 4].map((lesson: number) => (
                    <LessonsCardSkeleton key={lesson} />
                  ))}

                {lessons.data &&
                  lessons.data.data
                    .filter((l: any) => l.is_archived === false)
                    .map((l: any) => (
                      <LessonsCard
                        subjectId={Number(subjectId)}
                        key={l.id}
                        lesson={l}
                      />
                    ))}

                {lessons.data &&
                  lessons.data.data.length > 0 &&
                  lessons.data.data.filter((l: any) => l.is_archived === false)
                    .length < 1 && (
                    <EmptyState message="No active lessons yet" />
                  )}

                {lessons.data && lessons.data.data.length < 1 && (
                  <EmptyState message="No lessons available" />
                )}

                {lessons.isError && (
                  <RefetchButton
                    retry={() => lessons.refetch()}
                    message="Failed to fetch lessons!"
                  />
                )}
              </Box>

              {!lessons.isError && (
                <Box>
                  <Text className="text-[#444444] mt-10 font-semibold text-lg">
                    Archived Lessons
                  </Text>

                  <Box className="space-y-4 mt-7">
                    {lessons.isLoading &&
                      [1, 2, 3, 4].map((lesson: number) => (
                        <LessonsCardSkeleton key={lesson} />
                      ))}

                    {lessons.data &&
                      lessons.data.data
                        .filter((l: any) => l.is_archived === true)
                        .map((l: any) => (
                          <LessonsCard
                            subjectId={Number(subjectId)}
                            key={l.id}
                            lesson={l}
                          />
                        ))}

                    {lessons.data &&
                      lessons.data.data.filter(
                        (l: any) => l.is_archived === true
                      ).length < 1 && (
                        <EmptyState message="No archived lessons yet" />
                      )}
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {!activeSubject && (
            <Box className="mt-10">
              <EmptyState message="Select a Subject and the Lessons will appear here" />
            </Box>
          )}
        </Box>
      </Box>

      <NewLessonModal
        subjectId={Number(subjectId)}
        opened={openedNewLessonModal}
        close={closeNewLessonModal}
      />
    </DashboardLayout>
  );
};

export default Lessons;
