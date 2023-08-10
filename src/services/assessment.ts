import axios from "axios";

const HOST = process.env.HOST;

export interface QuizQuestionType {
  assessment_type: string;
  question: string;
  options: {
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
  };
  answer: string | null;
  lesson_id: number;
}

const addQuizAssessment = async (lessonId: string, payload: QuizQuestionType, token: string) => {
  const addQuizAssessmentsURL = `${HOST}/api/v1/admin/lessons/${lessonId}/quiz-assessments`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(addQuizAssessmentsURL, payload, config);

  return res.data;
};

export {
  addQuizAssessment
}