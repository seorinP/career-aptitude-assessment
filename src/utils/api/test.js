import Axios from "axios";

const apikey = process.env.REACT_APP_TEST_API_KEY;
const axios = Axios.create({
  baseURL: process.env.REACT_APP_TEST_API_HOST,
  headers: { "Content-Type": "application/json" },
});

const SUCCESS = {
  Y: "Y",
  N: "N",
};

const QUESTION_SEQ = "6";
const TARGET_SEQ = "100209";

const api = {};

api.getQuestions = async () => {
  const res = await axios.get("/questions", {
    params: { apikey, q: QUESTION_SEQ },
  });
  if (res?.data?.SUCC_YN === SUCCESS.Y) {
    return res.data.RESULT;
  }
  throw new Error(res?.data?.ERROR_REASON || "");
};

api.submit = async ({ name, gender, startDtm, answers }) => {
  const qestrnSeq = QUESTION_SEQ;
  const trgetSe = TARGET_SEQ;
  const res = await axios.post("/report", {
    apikey,
    qestrnSeq,
    trgetSe,
    name,
    gender,
    startDtm,
    answers,
  });
  if (res?.data?.SUCC_YN === SUCCESS.Y) {
    return res.data.RESULT;
  }
  throw new Error(res?.data?.ERROR_REASON || "");
};

export default api;
