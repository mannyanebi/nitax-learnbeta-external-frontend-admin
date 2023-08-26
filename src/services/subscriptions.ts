import axios from "axios";

const HOST = process.env.HOST;

const getLessonTopics = async (lessonId: string, token: string) => {
  const getLessonTopicsURL = `${HOST}/api/v1/admin/lessons/${lessonId}/topics`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getLessonTopicsURL, config);

  return res.data;
};

export {
  getLessonTopics 
}