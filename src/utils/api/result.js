import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_RESULT_API_HOST,
  headers: { "Content-Type": "application/json" },
});

const QUESTION_SEQ = "6";

const api = {};

api.getReport = async ({ seq }) => {
  const res = await axios.get("/report", {
    params: { seq },
  });
  if (res?.data?.result) {
    return res.data;
  }
  throw new Error(res?.data?.ERROR_REASON || "");
};

api.getInterpretation = async () => {
  const res = await axios.get("/intrprts", {
    params: { qestnrseq: QUESTION_SEQ },
  });
  if (Array.isArray(res?.data)) {
    return res.data;
  }
  throw new Error(res?.data?.ERROR_REASON || "");
};

api.getJobs = async ({ no1, no2 }) => {
  const res = await axios.get("/value/jobs", {
    params: { no1, no2 },
  });
  if (Array.isArray(res?.data)) {
    return res.data;
  }
  throw new Error(res?.data?.ERROR_REASON || "");
};

api.getMajors = async ({ no1, no2 }) => {
  const res = await axios.get("/value/majors", {
    params: { no1, no2 },
  });
  if (Array.isArray(res?.data)) {
    return res.data;
  }
  throw new Error(res?.data?.ERROR_REASON || "");
};

api.getReport({ seq: "NTI4NTk1MzI" });
api.getInterpretation();
api.getJobs({ no1: 1, no2: 2 });
api.getMajors({ no1: 1, no2: 2 });

export default api;
