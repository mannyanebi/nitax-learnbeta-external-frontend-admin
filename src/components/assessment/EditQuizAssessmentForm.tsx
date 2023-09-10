import React, { useContext, useState } from "react";
import { Box, Divider, Modal, Text, Skeleton, Select, Flex, UnstyledButton } from "@mantine/core";
import { useMutation } from "react-query";
import { useForm } from '@mantine/form';
import TextArea from "../custom/TextArea";
import { useDisclosure } from "@mantine/hooks";
import Form from "../custom/Form";
import { useQueryClient } from "react-query";
import { deleteQuizAssessment, updateQuizAssessment, UpdateQuizQuestionType } from "@/services/assessment";
import { Icon } from "@iconify/react";
import toast from 'react-hot-toast';
import { AdminContext } from '@/contexts/AdminContext';

export function EditQuizAssessmentSkeleton() {
  return (
    <Box className="mx-auto max-w-[40rem] space-y-4">
      <Divider
        color='#E7EAED'
        size="md"
        label={
          <Skeleton className='w-20 h-4 rounded-lg' />
        }
      />

      <Box className='w-full'>
        <Skeleton className='w-full h-[13.5rem]' />
      </Box>

      <Divider
        color='#E7EAED'
        size="md"
        label={
          <Skeleton className='w-32 h-4 rounded-lg' />
        }
      />

      <Box className="sm:grid sm:grid-cols-2 sm:gap-4 space-y-4 sm:space-y-0">
        <Box className='w-full'>
          <Skeleton className='w-full h-[8rem]' />
        </Box>

        <Box className='w-full'>
          <Skeleton className='w-full h-[8rem]' />
        </Box>

        <Box className='w-full'>
          <Skeleton className='w-full h-[8rem]' />
        </Box>

        <Box className='w-full'>
          <Skeleton className='w-full h-[8rem]' />
        </Box>
      </Box>

      <Divider
        color='#E7EAED'
        size="md"
        label={
          <Skeleton className='w-40 h-4 rounded-lg' />
        }
      />

      <Box>
        <Skeleton className='w-full h-14' />
      </Box>

      <Flex className="justify-end">
        <Skeleton className="w-40 h-11 rounded-lg" />
      </Flex>
    </Box>
  )
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
  };
  answer: string;
  assessment_type: string;
  lesson_id: number;
}

type Props = {
  question: QuizQuestion,
  index: number
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

export default function EditQuizAssessmentForm({ index, question }: Props) {
  const [isDirty, setIsDirty] = useState(false)
  const { admin } = useContext(AdminContext)
  const queryClient = useQueryClient();
  const token = `Bearer ${admin?.data?.access_token}`

  const [
    openedDelete,
    { open: openDelete, close: closeDelete }
  ] = useDisclosure(false);

  const initialValues: FormValues = {
    assessment_type: 'QUIZ',
    question: question.question,
    answer: question.answer,
    option_a: question.options.option_a,
    option_b: question.options.option_b,
    option_c: question.options.option_c,
    option_d: question.options.option_d,
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

  const mutation = useMutation((data: UpdateQuizQuestionType) => updateQuizAssessment(question.lesson_id.toString(), question.id.toString(), data, token), {
    onError: () => {
      toast.error(`Failed to update question ${index + 1}`)
    },

    onSuccess: (data) => {
      toast.success(`Question ${index + 1} updated successfully`)

      queryClient.invalidateQueries(['quizAssessments', question.lesson_id]);
    },
  })

  const handleUpdateQuiz = async (values: FormValues) => {
    const question_data: UpdateQuizQuestionType = {
      question: values.question,
      options: {
        option_a: values.option_a,
        option_b: values.option_b,
        option_c: values.option_c,
        option_d: values.option_d
      },
      answer: values.answer,
      lesson_id: question.lesson_id
    }

    mutation.mutate(question_data)
  }

  const deleteMutation = useMutation(() => deleteQuizAssessment(question.lesson_id.toString(), question.id.toString(), token), {
    onError: () => {
      toast.error(`Failed to delete question ${index + 1}`)
    },

    onSuccess: () => {
      toast.success(`Question ${index + 1} deleted successfully`)

      queryClient.invalidateQueries(['quizAssessments', question.lesson_id]);

      closeDelete()
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  const labelStyles = {
    color: '#343434',
    fontSize: '0.875rem',
    fontWeight: 400
  };

  return (
    <React.Fragment>
      <Form
        onSubmit={form.onSubmit((values) => handleUpdateQuiz(values))}
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
            label='Enter quiz question'
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
              value={form.values.option_a}
              error={form.errors.option_a}
              onChange={({ target }) => {
                form.setValues({
                  ...form.values,
                  option_a: target.value
                })
                setIsDirty(true)
              }}
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
              value={form.values.option_b}
              error={form.errors.option_b}
              onChange={({ target }) => {
                form.setValues({
                  ...form.values,
                  option_b: target.value
                })
                setIsDirty(true)
              }}
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
              value={form.values.option_c}
              error={form.errors.option_c}
              onChange={({ target }) => {
                form.setValues({
                  ...form.values,
                  option_c: target.value
                })
                setIsDirty(true)
              }}
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
              value={form.values.option_d}
              error={form.errors.option_d}
              onChange={({ target }) => {
                form.setValues({
                  ...form.values,
                  option_d: target.value
                })
                setIsDirty(true)
              }}
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
              if (typeof val === 'string') {
                form.setValues({
                  ...form.values,
                  answer: val
                })
              }

              setIsDirty(true)
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