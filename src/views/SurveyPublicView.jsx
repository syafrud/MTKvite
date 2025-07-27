import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import PublicQuestionView from "../components/PublicQuestionView";

export default function SurveyPublicView() {
  const answers = {};
  const [surveyFinished, setSurveyFinished] = useState(false);
  const [survey, setSurvey] = useState({
    questions: [],
  });
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`survey/pertanyaan/${slug}`)
      .then(({ data }) => {
        setLoading(false);
        setSurvey(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  function answerChanged(question, value) {
    answers[question.id] = value;
    console.log(question, value);
  }
  function onsubmit(ev) {
    ev.preventDefault();

    axiosClient
      .post(`/survey/${survey.id}/answer`, { answers })
      .then((response) => {
        setSurveyFinished(true);
      });
  }

  function calculateCorrectAnswers(surveyAndAnswerData) {
    let correctAnswers = 0;
    surveyAndAnswerData &&
      surveyAndAnswerData.forEach((item) => {
        if (item.correct === "Correct") {
          correctAnswers++;
        }
      });
    return correctAnswers;
  }

  return (
    <div className="flex-1  w-full bg-[#87CEEB] sm:px-10 md:px-20  lg:px-44 py-24">
      {loading && <div className="flex justify-center">Loading...</div>}
      {!loading && (
        <form onSubmit={(ev) => onsubmit(ev)} className="w-full h-full">
          {/* <pre>{JSON.stringify(survey, undefined, 2)}</pre> */}
          <div className="w-full h-auto">
            <p className="flex sm:text-2xl md:text-4xl mb-3 p-5 bg-white rounded-full  align-middle">
              {survey.title}
            </p>
          </div>
          {surveyFinished && (
            <div className="py-8 px-8 bg-emerald-500 text-white sm:w-full md:w-[600px] mx-auto">
              Thank you for participaying in the survey
            </div>
          )}
          {!surveyFinished && (
            <>
              <div>
                {survey.questions.map((question, index) => (
                  <PublicQuestionView
                    key={question.id}
                    question={question}
                    index={index}
                    answerChanged={(val) => answerChanged(question, val)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
}
