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

export interface TheoryQuestionType {
  assessment_type: string;
  question: string;
  answer: string;
  lesson_id: number;
}

export interface UpdateTheoryQuestionType {
  question: string;
  answer: string;
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

const addTheoryAssessment = async (lessonId: string, payload: TheoryQuestionType, token: string) => {
  const addTheoryAssessmentsURL = `${HOST}/api/v1/admin/lessons/${lessonId}/theory-assessments`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(addTheoryAssessmentsURL, payload, config);

  return res.data;
};

const updateTheoryAssessment = async (lessonId: string, assessmentId: string, payload: UpdateTheoryQuestionType, token: string) => {
  const updateTheoryAssessmentsURL = `${HOST}/api/v1/admin/lessons/${lessonId}/theory-assessments/${assessmentId}`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.put(updateTheoryAssessmentsURL, payload, config);

  return res.data;
};

const getTheoryAssessments = async (lessonId: string, token: string) => {
  const getTheoryAssessmentsURL = `${HOST}api/v1/admin/lessons/${lessonId}/theory-assessments`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getTheoryAssessmentsURL, config);

  return res.data;
};

const deleteTheoryAssessment = async (lessonId: string, assessmentId: string, token: string) => {
  const deleteTheoryAssessmentsURL = `${HOST}/api/v1/admin/lessons/${lessonId}/theory-assessments/${assessmentId}`
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(deleteTheoryAssessmentsURL, config);

  return res.data;
};

export {
  addQuizAssessment,
  addTheoryAssessment,
  updateTheoryAssessment,
  getTheoryAssessments,
  deleteTheoryAssessment
}