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

export { signin, forgotPassword }