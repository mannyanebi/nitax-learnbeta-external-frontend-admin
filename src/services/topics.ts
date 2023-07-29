import axios from "axios";

const HOST = process.env.HOST;

const getLessonTopics = async (lessonId: string, token: any) => {
  const getLessonTopicsURL = `${HOST}/`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getLessonTopicsURL, config);

  return res.data;
};

export {
  getLessonTopics
}