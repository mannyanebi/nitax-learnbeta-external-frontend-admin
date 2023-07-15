import axios from "axios";

const HOST = process.env.HOST;

const uploadAvatar = async (payload: any) => {
  const uploadAvatarURL = `${HOST}/`;
  const res = await axios.post(uploadAvatarURL, payload);

  return res.data;
};

export { uploadAvatar }