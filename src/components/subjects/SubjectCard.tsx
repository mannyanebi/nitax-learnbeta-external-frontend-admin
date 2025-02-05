import React, { useContext, useState } from "react";
import {
  Box,
  Flex,
  Text,
  UnstyledButton,
  Select,
  Popover,
  Group,
  Skeleton,
  Modal,
  rem,
  useMantineTheme,
} from "@mantine/core";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import TextArea from "../custom/TextArea";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { deleteSubject, editSubject } from "@/services/subjects";
import Link from "next/link";
import Input from "../custom/Input";
import dot_control from "../../assets/svgs/dot_control.svg";
import doument_icon from "../../assets/svgs/Document.svg";
import edit_icon from "../../assets/svgs/edit-2.svg";
import trash_icon from "../../assets/svgs/trash-2.svg";
import Form from "../custom/Form";
import { IconUpload, IconX } from "@tabler/icons-react";
import { Icon } from "@iconify/react";
import upload_cloud from "../../assets/svgs/upload-cloud.svg";
import { SubjectType } from "@/pages/dashboard/subjects";
import { AdminContext } from "@/contexts/AdminContext";
import { ICreateSubjectType } from "@/store/@types/subject";

export const SubjectCardSkeleton = () => {
  return (
    <Box className="border-2 rounded-xl border-[#E2E2E2] p-5 h-[18.5rem] flex flex-col">
      <Skeleton className="w-full h-[127px] rounded-xl" />
      <Skeleton className="h-4 w-40 mt-3" />
      <Skeleton className="h-3 w-full mt-3" />
      <Skeleton className="h-3 w-full mt-3" />
      <Flex className="mt-auto justify-end">
        <Skeleton className="rounded-full w-[32px] h-[32px] " />
      </Flex>
    </Box>
  );
};

type SubjectDataType = { subject: SubjectType };

type ErrorStateType = {
  name: string | null;
  description: string | null;
  bannerImg: string | null;
};

type ValueType = {
  name: string;
  description: string;
};

const SubjectCard: React.FC<SubjectDataType> = ({ subject }) => {
  const { admin } = useContext(AdminContext);
  const queryClient = useQueryClient();
  const token = `Bearer ${admin?.data?.access_token}`;
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);

  const [file, setFile] = useState<FileWithPath[]>([]);

  const [error, setError] = useState<ErrorStateType>({
    name: null,
    description: null,
    bannerImg: null,
  });
  const [value, setValue] = useState<ICreateSubjectType>({
    name: subject.name,
    description: subject.description,
    class_id: "",
    image: null,
  });

  const [popoverOpened, setPopoverOpened] = useState(false);
  const theme = useMantineTheme();

  const labelStyles = {
    color: "#343434",
    fontSize: "0.875rem",
    fontWeight: 400,
  };

  const editMutation = useMutation(
    (data: ICreateSubjectType) => editSubject(subject.id, data, token),
    {
      onError: () => {
        toast.error("Failed to edit subject");
      },

      onSuccess: () => {
        toast.success("Subject editted successfully");

        queryClient.invalidateQueries("subjects");

        closeEdit();
      },
    }
  );

  const deleteMutation = useMutation((id: any) => deleteSubject(id, token), {
    onError: () => {
      toast.error("Failed to delete subject");
    },

    onSuccess: () => {
      toast.success("Subject deleted");

      queryClient.invalidateQueries("subjects");

      closeDelete();
    },
  });

  const handleSubjectDelete = () => {
    deleteMutation.mutate(subject.id);
  };

  const handleEditSubject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.name) {
      setError({
        ...error,
        name: "Subject title is required",
      });
    } else if (!value.description) {
      setError({
        ...error,
        description: "Subject description is required",
      });
    } else {
      editMutation.mutate(value);
    }
  };

  const onLoad = React.useCallback(() => {
    setValue((prev) => ({
      ...prev,
      class_id: subject.grade_level_name,
      description: subject.description,
      name: subject.name,
    }));
  }, [subject.description, subject.grade_level_name, subject.name]);

  React.useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <React.Fragment>
      <Box className="border-2 rounded-xl border-[#E2E2E2] p-5 h-[18.5rem] flex flex-col">
        <Box className="w-full h-[127px] rounded-xl overflow-hidden">
          {subject?.full_image_path && (
            <Image
              width={100}
              height={100}
              alt="subject banner"
              src={subject.full_image_path}
              className="!w-full !h-[127px] object-cover object-center rounded-xl hover:brightness-75 hover:scale-125 transition duration-200 delay-75 ease-linear"
            />
          )}
        </Box>

        <Text className="font-semibold text-lg mt-3">{subject.name}</Text>

        <Text
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          className="text-[#888888] text-sm font-semibold mt-1"
        >
          {subject.description}
        </Text>

        <Flex className="mt-auto justify-end">
          <Popover
            width={190}
            position="bottom"
            withArrow
            opened={popoverOpened}
            onChange={setPopoverOpened}
            shadow="md"
          >
            <Popover.Target>
              <UnstyledButton onClick={() => setPopoverOpened((v: any) => !v)}>
                <Image
                  alt="subject banner"
                  src={dot_control}
                  className="w-[32px] h-[32px] rounded-full hover:brightness-75 transition duration-200 delay-75 ease-linear"
                />
              </UnstyledButton>
            </Popover.Target>

            <Popover.Dropdown className="!px-0 py-3">
              <Box>
                <UnstyledButton
                  onClick={() => {
                    openEdit();
                    setPopoverOpened(false);
                  }}
                  className="hover:bg-[#D9D9D9] py-2 px-4 w-full transition duration-75 delay-75 ease-linear"
                >
                  <Flex className="items-center space-x-2">
                    <Box>
                      <Image
                        alt="control icon"
                        src={edit_icon}
                        className="h-[16px] w-[16px]"
                      />
                    </Box>

                    <Text className="text- font-semibold text-[#666666]">
                      Edit Subject
                    </Text>
                  </Flex>
                </UnstyledButton>
              </Box>

              <Box>
                <UnstyledButton
                  onClick={() => {
                    openDelete();
                    setPopoverOpened(false);
                  }}
                  className="hover:bg-[#ffd7d7] text-[#FF0000] py-2 px-4 w-full transition duration-75 delay-75 ease-linear"
                >
                  <Flex className="items-center space-x-2">
                    <Box>
                      <Image
                        alt="control icon"
                        src={trash_icon}
                        className="h-[16px] w-[16px]"
                      />
                    </Box>

                    <Text className="text- font-semibold">Delete Subject</Text>
                  </Flex>
                </UnstyledButton>
              </Box>

              <Box>
                <Link href={`/dashboard/lessons?subjectId=${subject.id}`}>
                  <UnstyledButton className="hover:bg-[#D9D9D9] py-2 px-4 w-full transition duration-75 delay-75 ease-linear">
                    <Flex className="items-center space-x-2">
                      <Box>
                        <Image
                          alt="control icon"
                          src={doument_icon}
                          className="h-[16px] w-[16px]"
                        />
                      </Box>

                      <Text className="text- font-semibold text-[#666666]">
                        View Lessons
                      </Text>
                    </Flex>
                  </UnstyledButton>
                </Link>
              </Box>
            </Popover.Dropdown>
          </Popover>
        </Flex>
      </Box>

      {/* Delete subject modal start */}
      <Modal opened={openedDelete} onClose={closeDelete} size="lg" radius={12}>
        <Box className="px-2 sm:px-8 md:px-10">
          <Text className="font-semibold text-center text-lg">
            Delete Subject
          </Text>

          <Text className="text-center mt-8">
            This subject will be permanently deleted and won’t be accessible to
            all the classes that offer it any more. Are you sure you want to
            delete this subject?
          </Text>

          <Flex className="justify-between space-y-3 my-10 sm:space-y-0 sm:space-x-4 sm:flex-row flex-col">
            <UnstyledButton
              onClick={handleSubjectDelete}
              disabled={deleteMutation.isLoading}
              className="px-8 h-12 w-full  text-center font-bold transition disabled:opacity-50 duration-75 delay-75 ease-linear hover:bg-red-500 rounded-full py-3 bg-[#E2E2E2] text-[#888888] hover:text-white"
            >
              {deleteMutation.isLoading ? (
                <Icon
                  className={`animate-spin mx-auto`}
                  icon="icomoon-free:spinner2"
                  color="#white"
                  width="20"
                  height="20"
                />
              ) : (
                "Delete Subject"
              )}
            </UnstyledButton>

            <UnstyledButton
              onClick={closeDelete}
              className="px-8 h-12 text-center font-bold transition duration-75 w-full delay-75 ease-linear hover:bg-[#da9217] rounded-full py-3 bg-[#FAA61A] text-white"
            >
              Cancel
            </UnstyledButton>
          </Flex>
        </Box>
      </Modal>
      {/* Delete subject modal end */}

      {/* Edit subject modal start */}
      <Modal
        size="lg"
        radius={12}
        opened={openedEdit}
        onClose={closeEdit}
        centered
      >
        <Box className="px-2 sm:px-8 md:px-10">
          <Text className="font-semibold text-center text-lg">
            Edit Subject
          </Text>

          <Form className="my-10" onSubmit={handleEditSubject}>
            <Box>
              <Input
                type="text"
                error={error.name}
                disabled={editMutation.isLoading}
                value={value.name}
                onChange={({ target }) => {
                  setError({
                    ...error,
                    name: null,
                  });
                  setValue({
                    ...value,
                    name: target.value,
                  });
                }}
                label="Enter Subject Title"
                placeholder="Subject title"
                className={`w-full font-sans border-2 ${
                  error.name
                    ? "border-red-500 focus:outline-red-500"
                    : "border-[#E2E2E2] focus:outline-[#FAA61A]"
                } px-3 py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />
            </Box>

            <Box className="mt-5">
              <Text className="text-sm text-[#343434]">
                Upload subject header image
              </Text>

              <Dropzone
                className={`mt-[0.2rem] bg-[#F9F9F9] ${
                  error.bannerImg && "border-red-500"
                }`}
                padding={7}
                disabled={editMutation.isLoading}
                maxFiles={1}
                onDrop={(files) => {
                  setError({
                    ...error,
                    bannerImg: null,
                  });
                  setValue((prev) => ({ ...prev, image: files[0] }));
                }}
                onReject={() => null}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
              >
                <Group
                  position="center"
                  spacing="xl"
                  style={{ minHeight: rem(120), pointerEvents: "none" }}
                >
                  <Dropzone.Accept>
                    <Box className="w-full">
                      <IconUpload
                        size="3.2rem"
                        stroke={1.5}
                        color={
                          theme.colors[theme.primaryColor][
                            theme.colorScheme === "dark" ? 4 : 6
                          ]
                        }
                        className="mx-auto"
                      />

                      <Box className="text-center mt-4">
                        <Text
                          inline
                          color={
                            theme.colors[theme.primaryColor][
                              theme.colorScheme === "dark" ? 4 : 6
                            ]
                          }
                          className="font-semibold"
                          size="md"
                        >
                          Release to drop file
                        </Text>
                      </Box>
                    </Box>
                  </Dropzone.Accept>

                  <Dropzone.Reject>
                    <Box className="w-full">
                      <IconX
                        size="40px"
                        stroke={1.5}
                        color={
                          theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
                        }
                        className="mx-auto"
                      />

                      <Box className="text-center">
                        <Text className="font-semibold" size="lg">
                          Invalid File
                        </Text>

                        <Text inline className="text-[#777777] mt-1 text-sm">
                          Unsupported or too large
                        </Text>
                      </Box>
                    </Box>
                  </Dropzone.Reject>

                  <Box>
                    <Dropzone.Idle>
                      <Box>
                        {file.length > 0 ? (
                          <Icon
                            icon="teenyicons:tick-circle-solid"
                            color="#777777"
                            width="40"
                            height="40"
                            className="mx-auto"
                          />
                        ) : (
                          <Image
                            alt="upload icon"
                            src={upload_cloud}
                            width={40}
                            className="mx-auto"
                          />
                        )}

                        <Box className="mt-2">
                          <Text
                            className="text-center text-[#777777] font-semibold"
                            size="lg"
                          >
                            {file.length > 0 ? "File Selected" : "Browse File"}
                          </Text>

                          <Text
                            inline
                            className="text-[#777777] text-center mt-1 truncate text-sm"
                          >
                            {file.length > 0
                              ? file[0].path
                              : "Drag and Drop File (1)"}
                          </Text>
                        </Box>
                      </Box>
                    </Dropzone.Idle>
                  </Box>
                </Group>
              </Dropzone>

              <Box className="mt-[0.3rem]">
                {error.bannerImg && (
                  <Text className="text-red-500 font-sans text-sm">
                    {error.bannerImg}
                  </Text>
                )}
              </Box>
            </Box>

            <Box className="mt-5">
              <TextArea
                maxLength={80}
                disabled={editMutation.isLoading}
                value={value.description}
                onChange={({ target }) => {
                  setError({
                    ...error,
                    description: null,
                  });
                  setValue({
                    ...value,
                    description: target.value,
                  });
                }}
                label="Brief description of subject"
                placeholder="Enter subject description"
                className={`w-full min-h-[5rem] ${
                  error.description
                    ? "border-red-500 focus:outline-red-500"
                    : "border-[#E2E2E2] focus:outline-[#FAA61A]"
                } resize-none border-2 px-3 font-sans py-5 text-[#555555] transition duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
              />

              <Box className="mt-[-0.3rem]">
                {error.description && (
                  <Text className="text-red-500 font-sans text-sm">
                    {error.description}
                  </Text>
                )}
              </Box>
            </Box>

            <Box>
              <Select
                size="xl"
                radius={8}
                disabled={true}
                placeholder="Select class"
                value={subject.grade_level_name}
                data={[
                  {
                    value: subject.grade_level_name,
                    label: subject.grade_level_name,
                  },
                ]}
                label={
                  <span style={labelStyles}>Select class for this subject</span>
                }
                styles={() => ({
                  input: {
                    border: "2px solid #E2E2E2",
                    "&:focus-within": {
                      borderColor: "#FAA61A",
                    },
                    color: "#555555",
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

            <Box className="text-center mt-8">
              <UnstyledButton
                disabled={editMutation.isLoading}
                type="submit"
                className="px-8 h-14 w-56 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-full py-4 bg-[#FAA61A] text-white"
              >
                {editMutation.isLoading ? (
                  <Icon
                    className={`animate-spin mx-auto`}
                    icon="icomoon-free:spinner2"
                    color="#white"
                    width="20"
                    height="20"
                  />
                ) : (
                  "Update subject"
                )}
              </UnstyledButton>
            </Box>
          </Form>
        </Box>
      </Modal>
      {/* Edit subject modal end */}
    </React.Fragment>
  );
};

export default SubjectCard;
