import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";
import router from "../router";
import { useStateContext } from "../contexts/ContextProvider";
import { useSearchParams } from "react-router-dom";

export default function Surveys() {
  const { showToast } = useStateContext();
  const [surveys, setSurveys] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const [selectedGrades, setSelectedGrades] = useState([]);

  const handleGradeChange = (grade) => {
    if (selectedGrades.includes(grade)) {
      setSelectedGrades(selectedGrades.filter((g) => g !== grade));
    } else {
      setSelectedGrades([...selectedGrades, grade]);
    }
  }; // Tambahkan state untuk grade yang dipilih

  const onDeleteClick = (id) => {
    if (window.confirm("Are you sure want to delete this survey")) {
      axiosClient.delete(`/survey/${id}`).then(() => {
        getSurveys();
        showToast("The survey was deleted");
      });
    }
  };

  const onPageClick = (link) => {
    getSurveys(link.url);
  };

  const getSurveys = (url) => {
    url = url || "/survey";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setSurveys(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };

  useEffect(() => {
    const searchTermFromURL = searchParams.get("searchTerm") || "";
    setSearchTerm(searchTermFromURL);
    getSurveys();
  }, [searchParams]);

  const filteredSurveys = surveys.filter((survey) => {
    const titleLower = survey.title.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    const gradeMatch =
      selectedGrades.length === 0 ||
      selectedGrades.includes(survey.grade.toString());
    return titleLower.includes(searchTermLower) && gradeMatch;
  });

  return (
    <PageComponent>
      <div className="flex flex-col lg:flex-row  py-16 w-full gap-5">
        <div className="flex flex-col justify-center sm:w-full md:w-80 gap-3 md:mr-5">
          <div className="flex flex-col w-full  border-8 border-[#87CEEB] rounded-2xl">
            <div className="w-full flex font-bold bg-[#87CEEB] h-1/5 items-center justify-center text-2xl">
              Jenjang
            </div>
            <div className="flex w-full ">
              <div className="w-1/2 p-4 ">
                {Array.from({ length: 6 }, (_, i) => i + 1).map((grade) => (
                  <div key={grade} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`grade-${grade}`}
                      name="grade"
                      value={grade}
                      checked={selectedGrades.includes(grade.toString())}
                      onChange={(e) => handleGradeChange(e.target.value)}
                      className="m-1 appearance-none rounded-lg w-6 h-6 bg-white border-2 border-gray-400 checked:bg-[#87CEEB] checked:border-[#87CEEB]"
                    />
                    <label htmlFor={`grade-${grade}`}>{grade}</label>
                  </div>
                ))}
              </div>
              <div className="w-1/2 p-4">
                {Array.from({ length: 6 }, (_, i) => i + 7).map((grade) => (
                  <div key={grade} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`grade-${grade}`}
                      name="grade"
                      value={grade}
                      checked={selectedGrades.includes(grade.toString())}
                      onChange={(e) => handleGradeChange(e.target.value)}
                      className="m-1 appearance-none rounded-lg w-6 h-6 bg-white border-2 border-gray-400 checked:bg-[#87CEEB] checked:border-[#87CEEB]"
                    />
                    <label htmlFor={`grade-${grade}`}>{grade}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <TButton color="blue" to="/surveys/create">
            <PlusCircleIcon className="h-6 w-6 mr-2" /> Create New
          </TButton>
        </div>

        <div className=" w-full">
          <div className="mb-4 w-full">
            <input
              type="text"
              placeholder="Search surveys..."
              className="w-1/2 border border-gray-300  px-5 py-2 rounded-full "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {loading && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              <SurveyListItem skeleton={true} />
              <SurveyListItem skeleton={true} />
              <SurveyListItem skeleton={true} />
            </div>
          )}
          {!loading && (
            <div>
              {filteredSurveys.length === 0 && (
                <div className="py-8 text-center text-gray-700">
                  You don't have surveys created.
                </div>
              )}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3">
                {filteredSurveys.map((survey) => (
                  <SurveyListItem
                    skeleton={false}
                    survey={survey}
                    key={survey.id}
                    onDeleteClick={onDeleteClick}
                  />
                ))}
              </div>
              {filteredSurveys.length > 0 && (
                <PaginationLinks meta={meta} onPageClick={onPageClick} />
              )}
            </div>
          )}
        </div>
      </div>
    </PageComponent>
  );
}
