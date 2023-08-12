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

export interface UpdateQuizQuestionType {
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

const updateQuizAssessment = async (lessonId: string, assessmentId: string, payload: UpdateQuizQuestionType, token: string) => {
  const updateQuizAssessmentsURL = `${HOST}/api/v1/admin/lessons/${lessonId}/quiz-assessments/${assessmentId}`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.put(updateQuizAssessmentsURL, payload, config);

  return res.data;
};

const getTheoryAssessments = async (lessonId: string, token: string) => {
  const getTheoryAssessmentsURL = `${HOST}/api/v1/admin/lessons/${lessonId}/theory-assessments`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getTheoryAssessmentsURL, config);

  return res.data;
};

const getQuizAssessments = async (lessonId: string, token: string) => {
  const getQuizAssessmentsURL = `${HOST}/api/v1/admin/lessons/${lessonId}/quiz-assessments`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getQuizAssessmentsURL, config);

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

const deleteQuizAssessment = async (lessonId: string, assessmentId: string, token: string) => {
  const deleteQuizAssessmentsURL = `${HOST}/api/v1/admin/lessons/${lessonId}/quiz-assessments/${assessmentId}`
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(deleteQuizAssessmentsURL, config);

  return res.data;
};

export {
  addQuizAssessment,
  updateQuizAssessment,
  addTheoryAssessment,
  updateTheoryAssessment,
  getTheoryAssessments,
  getQuizAssessments,
  deleteTheoryAssessment,
  deleteQuizAssessment
}