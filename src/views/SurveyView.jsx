import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import axiosClient from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import SurveyQuestion from "../components/SurveyQuestion";
import { useStateContext } from "../contexts/ContextProvider";

export default function SurveyView() {
  const { showToast } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [survey, setSurvey] = useState({
    title: "",
    slug: "",
    description: "",
    video: null,
    video_url: null,
    extension: "",
    questions: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onVideoChoose = (ev) => {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const updatedSurvey = {
        ...survey,
        video: file,
        video_url: reader.result,
        extension: getFileExtension(ev),
      };
      setSurvey(updatedSurvey);

      ev.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  function getFileExtension(event) {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }

    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf(".");

    const ext = name.substring(lastDot + 1);

    return ext;
  }
  const videoType = getFileExtension(survey.extension)
    ? `video/${getFileExtension(survey.extension)}`
    : undefined;

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = { ...survey };
    if (payload.video) {
      payload.video = payload.video_url;
    }
    delete payload.video_url;
    let res = null;
    if (id) {
      res = axiosClient.put(`/survey/${id}`, payload);
    } else {
      res = axiosClient.post("/survey", payload);
    }
    res
      .then((res) => {
        console.log(res);
        navigate("/surveys");
        if (id) {
          showToast("The survey was updated");
        } else {
          showToast("The survey was created");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
        console.log(err, err.response);
      });
  };

  function onQuestionsUpdate(questions) {
    setSurvey({
      ...survey,
      questions,
    });
  }

  useEffect(() => {
    setLoading(true);
    if (id) {
      axiosClient.get(`/survey/${id}`).then(({ data }) => {
        setSurvey(data.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <PageComponent title={!id ? "Create New Surveys" : "Update Survey"}>
      {loading && <div className="text-center text-l g">Loading...</div>}
      {!loading && (
        <form action="#" method="POST" onSubmit={onSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {error && (
                <div className="bg-red-500 text-white py-3 px-3 ">{error}</div>
              )}
              {/* video */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Video
                </label>
                <div className="mt-1 flex items-center">
                  {survey.video_url && (
                    <video
                      className="w-auto h-48 "
                      controls
                      key={survey.video_url}
                    >
                      <source
                        src={survey.video_url}
                        alt={survey.title}
                        type={videoType}
                      />
                    </video>
                  )}
                  {!survey.video_url && (
                    <span className="flex justify-center items-center text-gray-400 h-52 w-1/3 overflow-hidden rounded bg-gray-100">
                      <VideoCameraIcon className="w-8 h-8" />
                    </span>
                  )}{" "}
                  <button
                    type="button"
                    className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <input
                      type="file"
                      accept="video/*"
                      className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                      onChange={onVideoChoose}
                    />
                    Change
                  </button>
                </div>
              </div>
              {/* video */}

              {/*Title*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Video Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={survey.title}
                  onChange={(ev) =>
                    setSurvey({ ...survey, title: ev.target.value })
                  }
                  placeholder="Survey Title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/*Title*/}

              {/*Description*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={survey.description || ""}
                  onChange={(ev) =>
                    setSurvey({ ...survey, description: ev.target.value })
                  }
                  placeholder="Describe your survey"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              {/*Description*/}

              <SurveyQuestion
                questions={survey.questions}
                onQuestionsUpdate={onQuestionsUpdate}
              />
            </div>

            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <TButton>Save</TButton>
            </div>
          </div>
        </form>
      )}
    </PageComponent>
  );
}
