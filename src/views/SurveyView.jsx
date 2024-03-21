import { useState } from "react";
import PageComponent from "../components/PageComponent";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";

export default function SurveyView() {
  const [survey, setSurvey] = useState({
    title: "",
    slug: "",
    status: false,
    description: "",
    image: null,
    video_url: null,
    expire_date: "",
    questions: [],
  });
  const onImageChoose = () => {
    console.log("On image choose");
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log(ev);
  };

  return (
    <PageComponent title="Create New Surveys">
      <form action="#" method="POST" onSubmit={onSubmit}>
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            {/* image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="mt-1 flex items-center">
                {survey.video_url && (
                  <video
                    // src={survey.video_url}
                    // alt=""
                    // type="mp4"
                    className="w-full h-48"
                  >
                    <source
                      src={survey.video_url}
                      alt={survey.title}
                      type="video/mp4"
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
                    onChange={onImageChoose}
                  />
                  Change
                </button>
              </div>
            </div>
            {/* image */}
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
              {/* <pre>{ JSON.stringify(survey, undefined, 2) }</pre> */}
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
          </div>

          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <TButton>Save</TButton>
          </div>
        </div>
      </form>
    </PageComponent>
  );
}
