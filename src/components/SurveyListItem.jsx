import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import TButton from "./core/TButton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function SurveyListItem({ skeleton, survey, onDeleteClick }) {
  const { currentUser } = useStateContext();
  const navigate = useNavigate();

  const Goto = () => {
    navigate(`/video/${survey.slug}`);
  };

  return skeleton ? (
    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
      <Skeleton className="w-full h-48"></Skeleton>
      <Skeleton className="mt-4 text-lg font-bold"></Skeleton>
      <Skeleton className="overflow-hidden flex-1"></Skeleton>
      <Skeleton className="flex justify-between items-center mt-3"></Skeleton>
    </div>
  ) : (
    <>
      <div className="flex flex-col rounded-2xl shadow-md bg-white hover:bg-gray-50 h-auto">
        <img
          src={survey.image_url}
          alt={survey.title}
          className="w-full h-auto rounded-2xl"
          onClick={Goto}
        />
        <h4 className="my-2 text-lg font-bold px-6">{survey.title}</h4>
        {currentUser.role === "admin" && (
          <>
            <div className="flex  justify-center gap-10 items-center m-4">
              <TButton to={`/surveys/${survey.id}`}>
                <PencilIcon className="w-5 h-5 mr-2" /> Edit
              </TButton>

              {survey.id && (
                <TButton onClick={(ev) => onDeleteClick(survey.id)} color="red">
                  <TrashIcon className="w-5 h-5" />
                  Hapus
                </TButton>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
