import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import PublicQuestionView from "../components/PublicQuestionView";

export default function SurveyAnswer() {
  const answers = {};
  const [survey, setSurvey] = useState({ questions: [] });
  const [dataAnswer, setDataAnswer] = useState({});
  const [loading, setLoading] = useState(false);
  const { slug, id } = useParams();

  useEffect(() => {
    setLoading(true);
    axiosClient.get(`/view/${id}`).then(({ data }) => {
      setDataAnswer(data.data);
    });
    axiosClient.get(`survey/jawaban/${slug}`).then(({ data }) => {
      setSurvey(data.data);
      setLoading(false);
    });
  }, []);

  function answerChanged(question, value) {
    answers[question.id] = value;
  }

  return (
    <div className="flex-1 w-full bg-[#87CEEB] sm:px-10 md:px-20 lg:px-44 py-24">
      {loading && <div className="flex justify-center">Loading...</div>}
      {!loading && (
        <form className="container w-full mx-auto">
          {Object.keys(dataAnswer).length === 0 ? (
            <>
              <div className="flex text-4xl mb-3 p-5 bg-white rounded-full align-middle content-between w-full h-auto">
                <div className="flex-1 self-center">Bukan milik kamu</div>
              </div>
            </>
          ) : (
            <>
              <div className="flex text-4xl mb-3 p-5 bg-white rounded-full align-middle content-between w-full h-auto">
                <div className="flex-1 self-center">{survey.title}</div>
                <div>
                  {console.log(dataAnswer)}
                  {survey.questions.reduce(
                    (total, question) =>
                      (total += dataAnswer.answers.reduce(
                        (total, answer) =>
                          (total +=
                            answer.survey_question_id === question.id
                              ? question.data.options.find(
                                  (option) =>
                                    option.text == answer.answer &&
                                    option.correct
                                )
                                ? 1
                                : 0
                              : 0),
                        0
                      )),
                    0
                  )}
                  /{survey.questions_length}
                </div>
              </div>
              <div>
                {survey.questions &&
                  survey.questions.map((question, index) => {
                    const userAnswer = dataAnswer.answers?.find(
                      (answer) => answer.survey_question_id === question.id
                    );
                    return (
                      <PublicQuestionView
                        key={question.id}
                        question={question}
                        index={index}
                        answerChanged={(val) => answerChanged(question, val)}
                        userAnswer={userAnswer}
                      />
                    );
                  })}
              </div>
            </>
          )}
        </form>
      )}
    </div>
  );
}
