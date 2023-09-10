import axios from "axios";

const HOST = process.env.HOST;

const uploadAvatar = async (payload: any) => {
  const uploadAvatarURL = `${HOST}/`;
  const res = await axios.post(uploadAvatarURL, payload);

  return res.data;
};

const getAdminProfile = async (token: any) => {
  const getAdminProfileURL = `${HOST}/api/v1/admin/profile`;
  
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getAdminProfileURL, config);

  return res.data;
};

export {
  uploadAvatar, 
  getAdminProfile
}