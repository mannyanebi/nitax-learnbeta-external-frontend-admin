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

const addLesson = async (subjectId: string, payload: any, token: any) => {
  const addLessonsURL = `${HOST}/api/v1/admin/subjects/${subjectId}/lessons`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(addLessonsURL, payload, config);

  return res.data;
};

const deleteLesson = async (subjectId: any, lessonId: any, token: any) => {
  const deleteSubjectsURL = `${HOST}/api/v1/admin/subjects/${subjectId}/lessons/${lessonId}`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(deleteSubjectsURL, config);

  return res.data;
};

const editLesson = async (subjectId: any, lessonId: any, payload: any, token: any) => {
  const editLessonURL = `${HOST}/api/v1/admin/subjects/${subjectId}/lessons/${lessonId}`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.put(editLessonURL, payload, config);

  return res.data;
};

export {
  getSubjectLessons,
  addLesson,
  deleteLesson,
  editLesson
}