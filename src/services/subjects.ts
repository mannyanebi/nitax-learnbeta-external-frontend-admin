import axios from "axios";

const HOST = process.env.HOST;

const getSubjects = async (token: any) => {
  const getSubjectsURL = `${HOST}/api/v1/admin/subjects`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(getSubjectsURL, config);

  return res.data;
};

const addSubject = async (payload: any, token: any) => {
  const addSubjectsURL = `${HOST}/api/v1/admin/subjects`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(addSubjectsURL, payload, config);

  return res.data;
};

const deleteSubject = async (id: any, token: any) => {
  const deleteSubjectsURL = `${HOST}/api/v1/admin/subjects/${id}`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(deleteSubjectsURL, config);

  return res.data;
};

const editSubject = async (id: any, payload: any, token: any) => {
  const deleteSubjectsURL = `${HOST}/api/v1/admin/subjects/${id}`;
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.put(deleteSubjectsURL, payload, config);

  return res.data;
};

export { 
  getSubjects,
  addSubject,
  deleteSubject,
  editSubject
}