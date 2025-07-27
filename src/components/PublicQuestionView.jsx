import { useParams } from "react-router-dom";

export default function PublicQuestionView({
  question,
  index,
  answerChanged,
  userAnswer,
  key,
}) {
  let selectedOptions = [];
  const { slug } = useParams();
  function onCheckboxChange(option, $event) {
    if ($event.target.checked) {
      selectedOptions.push(option.text);
    } else {
      selectedOptions = selectedOptions.filter((op) => op != option.text);
    }
    answerChanged(selectedOptions);
  }

  return (
    <>
      <fieldset className="my-4 bg-white p-5 rounded-3xl" key={key}>
        {window.location.pathname === `/survey/public/${slug}` ? (
          <>
            <div>
              <legend className="text-lg font-bold text-gray-900">
                {index + 1}. {question.question}
              </legend>
            </div>

            <div className="mt-3">
              {question.type === "select" && (
                <div>
                  <select
                    onChange={(ev) => answerChanged(ev.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled selected>
                      Please Select
                    </option>
                    {question.data.options.map((option) => (
                      <option key={option.uuid} value={option.text}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {question.type === "radio" && (
                <div>
                  {question.data.options.map((option, ind) => (
                    <div key={option.uuid} className="flex items-center my-2">
                      <input
                        id={option.uuid}
                        name={"question" + question.id}
                        value={option.text}
                        onChange={(ev) => answerChanged(ev.target.value)}
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor={option.uuid}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {question.type === "checkbox" && (
                <div>
                  {question.data.options.map((option, ind) => (
                    <div key={option.uuid} className="flex items-center my-2">
                      <input
                        id={option.uuid}
                        onChange={(ev) => onCheckboxChange(option, ev)}
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={option.uuid}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <legend className="text-base font-medium text-gray-900">
                {index + 1}. {question.question}
              </legend>
            </div>
            <div className="mt-3">
              <div>
                {question.data.options.map((option, ind) => (
                  <>
                    <div key={option.uuid} className="flex items-center my-2">
                      <input
                        id={option.uuid}
                        name={"question" + question.id}
                        value={option.text}
                        onChange={(ev) => answerChanged(ev.target.value)}
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        disabled
                        checked={userAnswer && userAnswer.answer == option.text}
                      />
                      <label
                        htmlFor={option.uuid}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {option.text}
                      </label>
                    </div>
                  </>
                ))}
              </div>
              <div className="flex flex-col ">
                <div className="mr-2 "></div>
                <div>
                  Correct Answer:{" "}
                  {question.data.options.find((option) => option.correct).text}
                </div>
                <div>Penjelasan : {question.description}</div>
              </div>
              <p
                style={{
                  color: question.correct === "Correct" ? "#00FF00" : "#FF0000",
                }}
              >
                {question.correct}
              </p>
            </div>
          </>
        )}
      </fieldset>
    </>
  );
}
