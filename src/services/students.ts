import axios from "axios";

const HOST = process.env.HOST;

const getStudents = async (token: any) => {
  const getStudentsURL = `${HOST}/api/v1/admin/students`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getStudentsURL, config);

  return res.data;
};

const getStudentsPerformance = async (token: any, lessonId: string) => {
  const getStudentsURL = `${HOST}/api/v1/admin/lesson-assessments/${lessonId}`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getStudentsURL, config);

  return res.data;
};

export {
  getStudents,
  getStudentsPerformance
}