import React, { useEffect, useState } from "react";
import axiosClient from "../axios";

const SurveyQuestionComparison = ({ surveySlug }) => {
  const [surveyData, setSurveyData] = useState(null);
  const [historyData, setHistoryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const surveyResponse = await axiosClient.get(
          `/survey/get-by-slug/${surveySlug}`
        );
        const { id } = surveyResponse.data;

        const historyResponse = await axiosClient.get(`/survey/history/${id}`);

        setSurveyData(surveyResponse.data);
        setHistoryData(historyResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [surveySlug]);

  const compareData = (questionData, historyAnswer) => {
    if (!historyAnswer) {
      return null;
    }

    const { options, correct } = questionData.data;
    const selectedOption = options.find(
      (option) => option.uuid === historyAnswer.answer
    );

    if (selectedOption && selectedOption.correct === correct) {
      return <span className="text-green-500">Correct</span>;
    } else {
      return <span className="text-red-500">Incorrect</span>;
    }
  };

  if (!surveyData || !historyData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{surveyData.title}</h2>
      {surveyData.questions.map((question) => (
        <div key={question.id}>
          <h3>{question.question}</h3>
          {historyData.survey_question_answers
            .filter((answer) => answer.survey_question_id === question.id)
            .map((answer) => (
              <div key={answer.id}>{compareData(question, answer)}</div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default SurveyQuestionComparison;
