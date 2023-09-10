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

const getSubscriptionPlans = async (token: string) => {
  const getSubscriptionPlansURL = `${HOST}/api/v1/admin/subscription-plans`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getSubscriptionPlansURL, config);

  return res.data;
};

const getVouchers = async (token: string) => {
  const getVouchersURL = `${HOST}/api/v1/admin/vouchers`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getVouchersURL, config);

  return res.data;
};

const editSubscription = async (payload: any, planId: string, token: string) => {
  const editSubURL = `${HOST}/api/v1/admin/subscription-plans/${planId}`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.put(editSubURL, payload, config);

  return res.data;
};

const addSubscription = async (payload: any, token: string) => {
  const addSubURL = `${HOST}/api/v1/admin/subscription-plans`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(addSubURL, payload, config);

  return res.data;
};

const generateVoucher = async (payload: any, token: string) => {
  const generateVoucherURL = `${HOST}/api/v1/admin/vouchers`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(generateVoucherURL, payload, config);

  return res.data;
};

export {
  getLessonTopics,
  editSubscription,
  addSubscription,
  getSubscriptionPlans,
  getVouchers,
  generateVoucher
}