import React, { useContext } from "react";
import { Box, Divider, Text, Select, Flex, UnstyledButton } from "@mantine/core";
import { useMutation } from "react-query";
import { useForm } from '@mantine/form';
import TextArea from "../custom/TextArea";
import Form from "../custom/Form";
import { addTheoryAssessment, TheoryQuestionType } from "@/services/assessment";
import { Icon } from "@iconify/react";
import toast from 'react-hot-toast';
import { AdminContext } from '@/contexts/AdminContext';

type Props = {
  lesson_id: number
}

interface FormValues {
  assessment_type: string;
  question: string;
  answer: string;
}

export default function NewTheoryAssessmentForm({ lesson_id }: Props) {
  const { admin } = useContext(AdminContext)
  const token = `Bearer ${admin?.data?.access_token}`

  const initialValues: FormValues = {
    assessment_type: 'THEORY',
    question: '',
    answer: ''
  };

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

  const mutation = useMutation((data: TheoryQuestionType) => addTheoryAssessment(lesson_id.toString(), data, token), {
    onError: () => {
      toast.error('Failed to add new theory question')
    },

    onSuccess: () => {
      toast.success('Theory question added successfully')

      form.reset()
    },
  })

  const handleAddTheory = async (values: FormValues) => {
    const question_data: TheoryQuestionType = {
      assessment_type: "THEORY",
      question: values.question,
      answer: values.answer,
      lesson_id
    }

    mutation.mutate(question_data)
  }

  return (
    <Form
      onSubmit={form.onSubmit((values) => handleAddTheory(values))}
      className="mx-auto max-w-[40rem] space-y-4"
    >
      <Divider
        color='#FAA61A'
        size="md"
        label={
          <Text className='font-[500] text-[#555555] text-lg'>
            Question
          </Text>
        }
      />

      <Box className='w-full'>
        <TextArea
          type="text"
          label='Enter theory question'
          maxLength={256}
          disabled={mutation.isLoading}
          {...form.getInputProps('question')}
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
          {...form.getInputProps('answer')}
          placeholder="E.g: Tokyo"
          className={`w-full min-h-[13.5rem] sm:min-h-[8rem] 2xl:min-h-[7.75rem] resize-none border-2 border-[#E2E2E2] focus:outline-[#FAA61A] px-3 py-5 text-[#555555] transition font-sans duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
        />
      </Box>

      <Flex className="justify-end !mt-10">
        <UnstyledButton
          disabled={mutation.isLoading}
          type="submit"
          className="px-8 text-sm h-12 disabled:opacity-50 w-44 text-center font-bold transition duration-75 delay-75 ease-linear hover:bg-[#da9217] rounded-2xl py-2 bg-[#FAA61A] text-white"
        >
          {mutation.isLoading ?
            <Icon
              className={`animate-spin mx-auto`}
              icon="icomoon-free:spinner2"
              color="#white"
              width="20"
              height="20"
            /> :
            'Add Question'
          }
        </UnstyledButton>
      </Flex>
    </Form>
  )
}