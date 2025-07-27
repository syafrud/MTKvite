import React, { useEffect, useState } from "react";
import axiosClient from "../axios";
import { Link, useParams } from "react-router-dom";

export default function History() {
  const [exercises, setExercises] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    axiosClient.get(`/history/${slug}`).then(({ data }) => {
      setExercises(data.data);
      setAnswers(data.answers);
    });
  }, []);

  const getDateOnly = (dateTimeString) => {
    if (!dateTimeString) return "no";
    const parts = dateTimeString.split(" ");
    return parts[0];
  };

  const getTimeOnly = (dateTimeString) => {
    if (!dateTimeString) return "";
    const parts = dateTimeString.split(" ");
    return parts[1];
  };

  const groupedAnswers = {};
  answers.forEach((answer) => {
    const date = getDateOnly(answer.start_date);
    if (!groupedAnswers[date]) {
      groupedAnswers[date] = [];
    }
    groupedAnswers[date].push(answer);
  });

  function countCorrectAnswers(exercise, answers) {
    let correctCount = 0;
    for (const answer of answers.survey_question_answers) {
      const question = exercise.questions.find(
        (q) => q.id === answer.survey_question_id
      );
      const option = question.data.options.find((o) => {
        const optionValue = Array.isArray(o.text) ? o.text[0] : String(o.text);
        const answerValue = Array.isArray(answer.answer)
          ? answer.answer[0]
          : String(answer.answer);
        return optionValue === answerValue && o.correct;
      });
      if (option) {
        correctCount++;
      }
    }
    return correctCount;
  }

  // Mendapatkan semua survey_answer_id dari answers
  const surveyAnswerIds = answers.flatMap((answer) =>
    answer.survey_question_answers.map(
      (questionAnswer) => questionAnswer.survey_answer_id
    )
  );

  return (
    <div className="flex-1 w-full bg-[#87CEEB] sm:px-10 lg:px-44 py-24">
      <div className="bg-white w-full h-full rounded-3xl p-10">
        <div className="font-bold text-3xl mb-4">{exercises.title}</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {Object.keys(groupedAnswers).map((date) => (
            <div
              key={date}
              className="flex flex-col bg-[#87CEEB] m-4 rounded-xl "
            >
              <div className="border-b-2 border-black px-4 mb-2 h-14 content-center font-medium">
                {date}
              </div>
              {groupedAnswers[date].map((answer, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-row py-2 px-4 justify-between items-center font-medium"
                >
                  <div>{getTimeOnly(answer.start_date)}</div>
                  <div>{countCorrectAnswers(exercises, answer)}</div>
                  <div className="w-auto h-10 bg-[#34A0CD] p-2 rounded-xl">
                    {console.log(
                      answer.survey_question_answers.find((option) => option)
                        .survey_answer_id
                    )}
                    <Link
                      to={`/history/${exercises.slug}/${
                        answer.survey_question_answers.find((option) => option)
                          .survey_answer_id
                      }`}
                    >
                      Result
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
