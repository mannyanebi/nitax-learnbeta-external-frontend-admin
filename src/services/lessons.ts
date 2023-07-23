import axios from "axios";

const HOST = process.env.HOST;

const getSubjectLessons = async (subjectId: string, token: any) => {
  const getSubjectLessonsURL = `${HOST}/api/v1/admin/subjects/${subjectId}/lessons`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getSubjectLessonsURL, config);

  return res.data;
};

const addLesson = async (payload: any, token: any) => {
  const addLessonsURL = `${HOST}/api/v1/admin/subjects`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(addLessonsURL, payload, config);

  return res.data;
};

const deleteSubject = async (id: any, token: any) => {
  const deleteSubjectsURL = `${HOST}/api/v1/admin/subjects/${id}`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(deleteSubjectsURL, config);

  return res.data;
};

const editLesson = async (id: any, token: any) => {
  const deleteSubjectsURL = `${HOST}/api/v1/admin/subjects/${id}`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.put(deleteSubjectsURL, config);

  return res.data;
};

export {
  getSubjectLessons,
  addLesson,
  deleteSubject,
  editLesson
}