import axios from "axios";

const HOST = process.env.HOST;

const signin = async (payload: any) => {
  const signinURL = `${HOST}/`;
  const res = await axios.post(signinURL, payload);

  return res.data;
};

const forgotPassword = async (payload: any) => {
  const forgotPasswordURL = `${HOST}/`;
  const res = await axios.post(forgotPasswordURL, payload);

  return res.data;
};

const verifyOTP = async (payload: any) => {
  const verifyOTPURL = `${HOST}/`;
  const res = await axios.post(verifyOTPURL, payload);

  return res.data;
};

const resetPassword = async (payload: any) => {
  const resetPasswordURL = `${HOST}/`;
  const res = await axios.post(resetPasswordURL, payload);

  return res.data;
};

const updatePassword = async (payload: any) => {
  const updatePasswordURL = `${HOST}/`;
  const res = await axios.post(updatePasswordURL, payload);

  return res.data;
};

export { 
  signin, 
  forgotPassword, 
  verifyOTP, 
  resetPassword,
  updatePassword
}