import { ICreateSubjectType } from "@/store/@types/subject";
import axios from "axios";

const HOST = process.env.HOST;

const getSubjects = async (token: any) => {
  const getSubjectsURL = `${HOST}/api/v1/admin/subjects`;
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.get(getSubjectsURL, config);

  return res.data;
};

const addSubject = async (payload: ICreateSubjectType, token: any) => {
  const addSubjectsURL = `${HOST}/api/v1/admin/subjects`;
  const config = {
    headers: { Authorization: token, "Content-Tpe": "multipart/form-data" },
  };

  const formData = new FormData();

  if (payload.class_id && payload.image !== null) {
    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("grade_level_id", payload.class_id);
    formData.append("image", payload.image);
  }

  const res = await axios.post(addSubjectsURL, formData, config);

  return res.data;
};

const deleteSubject = async (id: any, token: any) => {
  const deleteSubjectsURL = `${HOST}/api/v1/admin/subjects/${id}`;
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.delete(deleteSubjectsURL, config);

  return res.data;
};

const editSubject = async (
  id: number,
  payload: ICreateSubjectType,
  token: string
) => {
  const deleteSubjectsURL = `${HOST}/api/v1/admin/subjects/${id}`;
  const config = {
    headers: { Authorization: token, "Content-Tpe": "multipart/form-data" },
  };

  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("description", payload.description);

  if (payload.image !== null) formData.append("image", payload.image);

  const res = await axios.put(deleteSubjectsURL, formData, config);

  return res.data;
};

export { getSubjects, addSubject, deleteSubject, editSubject };
