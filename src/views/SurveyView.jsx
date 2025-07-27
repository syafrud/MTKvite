import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import {
  LinkIcon,
  PhotoIcon,
  PlusCircleIcon,
  TrashIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
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
    grade: "",
    video: null,
    video_url: null,
    image: null,
    image_url: null,
    extension: "",
    questions: [],
    question_length: 0,
  });
  const [selectedGrade, setSelectedGrade] = useState("");
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

  const onImageChoose = (ev) => {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setSurvey({
        ...survey,
        image: file,
        image_url: reader.result,
      });

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

    const payload = {
      ...survey,
      question_length: survey.questions.length,
    };

    if (payload.video) {
      payload.video = payload.video_url;
    }
    delete payload.video_url;

    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;

    console.log(payload);
    let res = null;
    if (id) {
      res = axiosClient.put(`/survey/${id}`, payload);
    } else {
      console.log(payload);
      res = axiosClient.post("/survey", payload);
    }
    console.log(payload);
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
  const onDelete = () => {};

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
    <PageComponent
      buttons={
        <div className="flex gap-2">
          <TButton color="green" href={`/survey/public/${survey.slug}`}>
            <LinkIcon className="h-4 w-4 mr-2" />
            Exercise
          </TButton>
          <TButton color="red" onClick={onDelete}>
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </TButton>
        </div>
      }
    >
      {loading && <div className="text-center text-l g">Loading...</div>}
      {!loading && (
        <form
          action="#"
          method="POST"
          onSubmit={onSubmit}
          className="min-w-[80rem]"
        >
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {error && (
                <div className="bg-red-500 text-white py-3 px-3 ">{error}</div>
              )}
              <div className="flex flex-row gap-9">
                {/* video */}
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Video
                  </label>
                  <div className="mt-1 flex flex-col items-center gap-5">
                    {survey.video_url && (
                      <video
                        className="w-full h-auto "
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
                      <span className="flex justify-center items-center text-gray-400 h-52 w-full overflow-hidden rounded bg-gray-100">
                        <VideoCameraIcon className="w-8 h-8" />
                      </span>
                    )}
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
                {/*Image*/}
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <div className="mt-1 flex flex-col items-center gap-5">
                    {survey.image_url && (
                      <img
                        src={survey.image_url}
                        alt=""
                        className="w-full h-auto"
                      />
                    )}
                    {!survey.image_url && (
                      <span className="flex justify-center items-center text-gray-400 h-52 w-full overflow-hidden rounded bg-gray-100">
                        <PhotoIcon className="w-8 h-8" />
                      </span>
                    )}
                    <button
                      type="button"
                      className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <input
                        type="file"
                        className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                        onChange={onImageChoose}
                      />
                      Change
                    </button>
                  </div>
                </div>
                {/*Image*/}
              </div>
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
                  placeholder="Describe your Video"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              {/*Description*/}

              {/*Jenjang*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="grade"
                  className="block text-sm font-medium text-gray-700"
                >
                  Grade
                </label>
                <select
                  name="grade"
                  id="grade"
                  value={survey.grade || ""}
                  onChange={(ev) =>
                    setSurvey({ ...survey, grade: ev.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select Grade</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                    <option key={grade} value={grade}>
                      Grade {grade}
                    </option>
                  ))}
                </select>
              </div>
              {/*Jenjang*/}

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
