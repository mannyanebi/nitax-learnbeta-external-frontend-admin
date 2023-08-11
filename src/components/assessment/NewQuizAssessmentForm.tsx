import React, { useContext } from "react";
import { Box, Divider, Text, Select, Flex, UnstyledButton } from "@mantine/core";
import { useMutation } from "react-query";
import { useForm } from '@mantine/form';
import TextArea from "../custom/TextArea";
import Form from "../custom/Form";
import { addQuizAssessment, QuizQuestionType } from "@/services/assessment";
import { Icon } from "@iconify/react";
import toast from 'react-hot-toast';
import { AdminContext } from '@/contexts/AdminContext';

type Props = { 
  lesson_id: number
}

interface FormValues {
  assessment_type: string;
  question: string;
  answer: string | null;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

export default function NewQuizAssessmentForm({ lesson_id }: Props) {
  const { admin } = useContext(AdminContext)
  const token = `bearer ${admin?.data?.access_token}`

  const initialValues: FormValues = {
    assessment_type: 'QUIZ',
    question: '',
    answer: null,
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
  };

  const form = useForm({
    initialValues,

    validate: {
      question: (value) => (
        !value ? 'Question is required' : null
      ),
      answer: (value) => (
        !value ? 'Answer is required' : null
      ),
      option_a: (value) => {
        if (!value) {
          return 'Option A is required';
        }
        if (
          value === form.values.option_b ||
          value === form.values.option_c ||
          value === form.values.option_d
        ) {
          return 'Duplicate value with other options';
        }
        return null;
      },
      option_b: (value) => {
        if (!value) {
          return 'Option B is required';
        }
        if (
          value === form.values.option_a ||
          value === form.values.option_c ||
          value === form.values.option_d
        ) {
          return 'Duplicate value with other options';
        }
        return null;
      },
      option_c: (value) => {
        if (!value) {
          return 'Option C is required';
        }
        if (
          value === form.values.option_a ||
          value === form.values.option_b ||
          value === form.values.option_d
        ) {
          return 'Duplicate value with other options';
        }
        return null;
      },
      option_d: (value) => {
        if (!value) {
          return 'Option D is required';
        }
        if (
          value === form.values.option_a ||
          value === form.values.option_b ||
          value === form.values.option_c
        ) {
          return 'Duplicate value with other options';
        }
        return null;
      },
    },
  });

  const mutation = useMutation((data: QuizQuestionType) => addQuizAssessment(lesson_id.toString(), data, token), {
    onError: () => {
      toast.error('Failed to add new quiz question')
    },

    onSuccess: () => {
      toast.success('Quiz question added successfully')

      form.reset()
    },
  })

  const handleAddQuiz = async (values: FormValues) => {
    const question_data: QuizQuestionType = {
      assessment_type: "QUIZ",
      question: values.question,
      options: {
        option_a: values.option_a,
        option_b: values.option_b,
        option_c: values.option_c,
        option_d: values.option_d
      },
      answer: values.answer,
      lesson_id
    }

    mutation.mutate(question_data)
  }

  const labelStyles = {
    color: '#343434',
    fontSize: '0.875rem',
    fontWeight: 400
  };

  return (
    <Form 
      onSubmit={form.onSubmit((values) => handleAddQuiz(values))}
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
          label='Enter quiz question'
          maxLength={256}
          disabled={mutation.isLoading}
          {...form.getInputProps('question')}
          placeholder="E.g: What's the phenomenon where changing one particle instantly impacts another, regardless of distance?"
          className={`w-full min-h-[13.5rem] sm:min-h-[8rem] 2xl:min-h-[7.75rem] resize-none border-2 border-[#E2E2E2] focus:outline-[#FAA61A] px-3 py-5 text-[#555555] transition font-sans duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
        />
      </Box>

      <Divider 
        color='#FAA61A'
        size="md"
        label={
          <Text className='font-[500] text-[#555555] text-lg'>
            Options
          </Text>
        }
      />

      <Box className="sm:grid sm:grid-cols-2 sm:gap-4 space-y-4 sm:space-y-0">
        <Box className='w-full'>
          <TextArea
            type="text"
            disabled={mutation.isLoading}
            label='Option A'
            maxLength={100}
            {...form.getInputProps('option_a')}
            placeholder="E.g: Quantum Tunneling"
            className={`w-full min-h-[8rem] resize-none border-2 border-[#E2E2E2] focus:outline-[#FAA61A] px-3 py-5 text-[#555555] transition font-sans duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>

        <Box className='w-full'>
          <TextArea
            type="text"
            disabled={mutation.isLoading}
            label='Option B'
            maxLength={100}
            {...form.getInputProps('option_b')}
            placeholder="E.g: Wave-Particle Duality"
            className={`w-full min-h-[8rem] resize-none border-2 border-[#E2E2E2] focus:outline-[#FAA61A] px-3 py-5 text-[#555555] transition font-sans duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>

        <Box className='w-full'>
          <TextArea
            type="text"
            disabled={mutation.isLoading}
            label='Option C'
            maxLength={100}
            {...form.getInputProps('option_c')}
            placeholder="E.g: Quantum Entanglement"
            className={`w-full min-h-[8rem] resize-none border-2 border-[#E2E2E2] focus:outline-[#FAA61A] px-3 py-5 text-[#555555] transition font-sans duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>

        <Box className='w-full'>
          <TextArea
            type="text"
            disabled={mutation.isLoading}
            label='Option D'
            maxLength={100}
            {...form.getInputProps('option_d')}
            placeholder="E.g: Uncertainty Principle"
            className={`w-full min-h-[8rem] resize-none border-2 border-[#E2E2E2] focus:outline-[#FAA61A] px-3 py-5 text-[#555555] transition font-sans duration-75 rounded-lg delay-75 ease-linear placeholder:text-sm placeholder:text-[#555555]`}
          />
        </Box>
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

      <Box>
        <Select
          size='xl'
          radius={8}
          dropdownPosition="top"
          onChange={(val) => {
            if(typeof val === 'string') {
              form.setValues({
                ...form.values,
                answer: val
              })
            }
          }}
          data={[
            { value: form.values.option_a, label: 'Option A' },
            { value: form.values.option_b, label: 'Option B' },
            { value: form.values.option_c, label: 'Option C' },
            { value: form.values.option_d, label: 'Option D' },
          ]}
          disabled={
            mutation.isLoading ||
            !form.values.option_a ||
            !form.values.option_b ||
            !form.values.option_c ||
            !form.values.option_d ||
            form.values.option_a === form.values.option_b ||
            form.values.option_a === form.values.option_c ||
            form.values.option_a === form.values.option_d ||
            form.values.option_b === form.values.option_c ||
            form.values.option_b === form.values.option_d ||
            form.values.option_c === form.values.option_d
          }
          value={form.values.answer}
          placeholder='Select correct answer'
          label={
            <span style={labelStyles}>
              Correct Answer
            </span>
          }
          styles={() => ({
            input: {
              border: form.errors.answer ? '2px solid red' : '2px solid #E2E2E2',
              '&:focus-within': {
                borderColor: form.errors.answer ? 'red' : '#FAA61A',
              },
              color: '#555555'
            },
            item: {
              '&[data-selected]': {
                '&, &:hover': {
                  backgroundColor: '#FAA61A',
                  color: 'white',
                },
              }
            },
          })}
        />

        <Box className="mt-[0.2rem]">
          {form.errors.answer &&
            <label className="text-red-500 text-sm">
              {form.errors.answer}
            </label>
          }
        </Box>
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