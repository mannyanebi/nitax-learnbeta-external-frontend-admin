import axios from "axios";

const HOST = process.env.HOST;

type TopicPayloadType = {
  lesson_id: number;
  title: string;
  content: string;
  video_url: string;
};

const getLessonTopics = async (lessonId: string, token: string) => {
  const getLessonTopicsURL = `${HOST}/api/v1/admin/lessons/${lessonId}/topics`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getLessonTopicsURL, config);

  return res.data;
};

const addNewTopic = async (lessonId: string, token: string, payload: TopicPayloadType) => {
  const addNewTopicURL = `${HOST}/api/v1/admin/lessons/${lessonId}/topics`
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(addNewTopicURL, payload, config)
  
  return res.data;
}

export {
  getLessonTopics,
  addNewTopic
}