import axios from "axios";

const HOST = process.env.HOST;

const verifyOldPassword = async (payload: any) => {
  const verifyOldPasswordURL = `${HOST}/`;
  const res = await axios.post(verifyOldPasswordURL, payload);

  return res.data;
};

const uploadAvatar = async (payload: any) => {
  const uploadAvatarURL = `${HOST}/`;
  const res = await axios.post(uploadAvatarURL, payload);

  return res.data;
};

export {
  verifyOldPassword,
  uploadAvatar
}