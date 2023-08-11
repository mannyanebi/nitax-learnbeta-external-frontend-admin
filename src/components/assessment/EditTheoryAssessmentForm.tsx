import React, { useContext, useState } from "react";
import { Box, Divider, Text, Flex, Modal, UnstyledButton } from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from '@mantine/form';
import TextArea from "../custom/TextArea";
import Form from "../custom/Form";
import { UpdateTheoryQuestionType, updateTheoryAssessment, deleteTheoryAssessment } from "@/services/assessment";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@mantine/hooks";
import toast from 'react-hot-toast';
import { AdminContext } from '@/contexts/AdminContext';

type Props = {
  question: {
    id: number;
    question: string;
    answer: string;
    assessment_type: string;
    lesson_id: number;
  };
  index: number
}

interface FormValues {
  assessment_type: string;
  question: string;
  answer: string;
}

export default function EditTheoryAssessmentForm({
  question,
  index
}: Props) {
  const [isDirty, setIsDirty] = useState(false)
  const { admin } = useContext(AdminContext)
  const queryClient = useQueryClient();
  const token = `bearer ${admin?.data?.access_token}`

  const [
    openedDelete,
    { open: openDelete, close: closeDelete }
  ] = useDisclosure(false);

  const initialValues: FormValues = {
    assessment_type: question.assessment_type,
    question: question.question,
    answer: question.answer
  }

  const form = useForm({
    initialValues,

    validate: {
      question: (value) => (
        !value ? 'Question is required' : null
      ),
      answer: (value) => (
        !value ? 'Answer is required' : null
      )
    },
  });

  const mutation = useMutation((data: UpdateTheoryQuestionType) => updateTheoryAssessment(question.lesson_id.toString(), question.id.toString(), data, token), {
    onError: () => {
      toast.error(`Failed to update question ${index + 1}`)
    },

    onSuccess: () => {
      toast.success(`Question ${index + 1} updated successfully`)

      setIsDirty(false)
    },
  })

  const deleteMutation = useMutation(() => deleteTheoryAssessment(question.lesson_id.toString(), question.id.toString(), token), {
    onError: () => {
      toast.error(`Failed to delete question ${index + 1}`)
    },

    onSuccess: () => {
      toast.success(`Question ${index + 1} deleted successfully`)

      queryClient.invalidateQueries('theoryAssessments');
    },
  })

  const handleAddTheory = (values: FormValues) => {
    const question_data: UpdateTheoryQuestionType = {
      question: values.question,
      answer: values.answer,
      lesson_id: question.lesson_id
    }

    mutation.mutate(question_data)
  }

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  return (
    <React.Fragment>
      <Form
        onSubmit={form.onSubmit((values) => handleAddTheory(values))}
        className="mx-auto max-w-[40rem] space-y-4"
      >
        <Divider
          color='#FAA61A'
          size="md"
          label={
            <Text className='font-[500] text-[#555555] text-lg'>
              Question ({index + 1})
            </Text>
          }
        />

        <Box className='w-full'>
          <TextArea
            type="text"
            label='Enter theory question'
            maxLength={256}
            disabled={mutation.isLoading}
            value={form.values.question}
            error={form.errors.question}
            onChange={({ target }) => {
              form.setValues({
                ...form.values,
                question: target.value
              })
              setIsDirty(true)
            }}
            placeholder="E.g: What is the capital city of Japan?"
            className={`w-full min-h-[13.5rem] sm:min-h-[8rem] 2xl:min-h-[7.75rem] resize-none border-2 border-[#E2E2E2] focus:outline-[#FAA61A] px-3 py-5 text-[#555555] transition font-sans duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>

        <Divider
          color='#FAA61A'
          size="md"
          label={
            <Text className='font-[500] text-[#555555] text-lg'>
              Answer
            </Text>
          }
        />

        <Box className='w-full'>
          <TextArea
            type="text"
            label='Enter correct answer'
            maxLength={256}
            disabled={mutation.isLoading}
            value={form.values.answer}
            error={form.errors.answer}
            onChange={({ target }) => {
              form.setValues({
                ...form.values,
                answer: target.value
              })
              setIsDirty(true)
            }}
            placeholder="E.g: Tokyo"
            className={`w-full min-h-[13.5rem] sm:min-h-[8rem] 2xl:min-h-[7.75rem] resize-none border-2 border-[#E2E2E2] focus:outline-[#FAA61A] px-3 py-5 text-[#555555] transition font-sans duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>

        <Flex className="justify-end !mt-5 items-end flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          {isDirty &&
            <UnstyledButton
              disabled={mutation.isLoading}
              type="submit"
              className="px-8 text-sm h-12 disabled:opacity-50 w-48 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-2xl py-2 bg-[#FAA61A] text-white"
            >
              {mutation.isLoading ?
                <Icon
                  className={`animate-spin mx-auto`}
                  icon="icomoon-free:spinner2"
                  color="#white"
                  width="20"
                  height="20"
                /> :
                'Update Question'
              }
            </UnstyledButton>
          }

          <UnstyledButton
            onClick={openDelete}
            type="button"
            className="px-8 text-sm h-12 disabled:opacity-50 w-48 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-red-500 hover:text-white rounded-2xl py-2 bg-[#E2E2E2] text-[#888888]"
          >
            Delete Question
          </UnstyledButton>
        </Flex>
      </Form>

      {/* Delete question modal start */}
      <Modal
        opened={openedDelete}
        onClose={closeDelete}
        size='lg'
        radius={12}
      >
        <Box className='px-2 sm:px-8 md:px-10'>
          <Text className='font-semibold text-center text-lg'>
            Delete Question {index + 1}
          </Text>

          <Text className="text-center mt-10">
            This Assessment Question will be deleted and no longer accessible to students that offer the lesson
          </Text>

          <Flex className="justify-between space-y-3 my-10 sm:space-y-0 sm:space-x-4 sm:flex-row flex-col">
            <UnstyledButton
              onClick={handleDelete}
              disabled={deleteMutation.isLoading}
              className="px-8 h-12 disabled:opacity-50 text-center font-bold transition duration-75 w-full delay-75 ease-linear hover:bg-red-500 rounded-full py-3 bg-[#E2E2E2] text-[#888888] hover:text-white"
            >
              {deleteMutation.isLoading ?
                <Icon
                  className={`animate-spin mx-auto`}
                  icon="icomoon-free:spinner2"
                  color="#white"
                  width="20"
                  height="20"
                /> :
                'Delete Question'
              }
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
      {/* Delete question modal end */}
    </React.Fragment>
  )
}