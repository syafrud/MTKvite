import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import TButton from "./core/TButton";

export default function SurveyListItem({ survey, onDeleteClick }) {
  function getFileExtension(extension) {
    if (!extension) {
      return;
    }

    const lastDot = extension.lastIndexOf(".");
    if (lastDot === -1) {
      return extension; // Return the whole string if there's no dot
    }

    return extension.substring(lastDot + 1);
  }

  const videoType = getFileExtension(survey.extension)
    ? `video/${getFileExtension(survey.extension)}`
    : undefined;

  return (
    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
      <video className="w-full h-48" controls>
        <source src={survey.video_url} alt={survey.title} type={videoType} />
      </video>
      <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: survey.description }}
        className="overflow-hidden flex-1"
      ></div>

      <div className="flex justify-between items-center mt-3">
        <TButton to={`/surveys/${survey.id}`}>
          <PencilIcon className="w-5 h-5 mr-2 " />
          Edit
        </TButton>
        <div className="flex items-center">
          <TButton href={`/view/survey/${survey.slug}`} circle link>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </TButton>

          {survey.id && (
            <TButton
              onClick={(ev) => onDeleteClick(survey.id)}
              circle
              link
              color="red"
            >
              <TrashIcon className="w-5 h-5" />
            </TButton>
          )}
        </div>
      </div>
    </div>
  );
}
