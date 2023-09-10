import axios from "axios";

const HOST = process.env.HOST;

const getGradeLevels = async (token: any) => {
  const getGradeLevelsURL = `${HOST}/api/v1/admin/grade-levels`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getGradeLevelsURL, config);

  return res.data;
};

const addGradeLevel = async (payload: any, token: any) => {
  const addGradeLevelsURL = `${HOST}/api/v1/admin/grade-levels`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(addGradeLevelsURL, payload, config);

  return res.data;
};

const deleteGradeLevel = async (id: any, token: any) => {
  const deleteGradeLevelURL = `${HOST}/api/v1/admin/grade-levels/${id}`;
  
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(deleteGradeLevelURL, config);

  return res.data;
};

export {
  getGradeLevels,
  addGradeLevel,
  deleteGradeLevel,
}