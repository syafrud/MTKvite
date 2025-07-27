import React, { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useParams } from "react-router-dom";
import PageComponent from "../components/PageComponent";
import SurveyVideo from "../components/SurveyVideo";

export default function Video() {
  const [data, setData] = useState({});
  const [survey, setSurvey] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    axiosClient.get(`survey/pertanyaan/${slug}`).then(({ data }) => {
      setSurvey(data.data);
    });
  }, []);

  console.log("data state:", data);

  return (
    <div className="flex flex-row justify-between w-full h-screen">
      <SurveyVideo survey={survey} key={survey.id} />
    </div>
  );
}
