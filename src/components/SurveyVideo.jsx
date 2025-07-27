import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
export default function SurveyVideo({ skeleton, survey, onDeleteClick }) {
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

  const videoType = survey
    ? getFileExtension(survey.extension)
      ? `video/${getFileExtension(survey.extension)}`
      : undefined
    : undefined;

  return skeleton ? (
    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
      <Skeleton className="w-full h-48"></Skeleton>
      <Skeleton className="mt-4 text-lg font-bold"></Skeleton>
      <Skeleton className="overflow-hidden flex-1"></Skeleton>
      <Skeleton className="flex justify-between items-center mt-3"></Skeleton>
    </div>
  ) : (
    <div className="flex flex-col w-full *:py-4 px-6 shadow-md bg-white hover:bg-gray-50 min-h-screen h-fit">
      <video className="w-full h-[30rem]" controls>
        <source src={survey.video_url} alt={survey.title} type={videoType} />
      </video>
      <Accordion defaultActiveKey="0">
        <Accordion.Panel className="flex">
          <Accordion.Title className="flex-1 flex-row border-b-2 border-black">
            <div className="!flex !flex-1 font-bold justify-between items-center ">
              <h4 className="flex-1 text-4xl align-middle text-end">
                {survey.title}
              </h4>
              <button
                className="flex bg-[#87CEEB] text-xl p-4 font-bold rounded-full "
                href={`/survey/public/${survey.slug}`}
                link
              >
                Let's Exercise
              </button>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <div
              dangerouslySetInnerHTML={{ __html: survey.description }}
              className="overflow-hidden flex-1 text-xl"
            ></div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center"></div>
      </div>
    </div>
  );
}
