import React, { useEffect, useState } from "react";
import axiosClient from "../axios";
import { Link } from "react-router-dom";

export default function Exercise() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axiosClient.get(`/show`).then(({ data }) => {
      setExercises(data.exercise);
    });
  }, []);

  return (
    <div className="flex-1 w-full bg-[#87CEEB] sm:px-10 lg:px-44 py-24">
      <div className="bg-white w-full h-full rounded-3xl p-10">
        <div className="font-bold text-3xl mb-4">Exercise</div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3">
          {/* buat perulangan dari grade 1-12 */}
          {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
            <div
              key={grade}
              className="grid m-4 bg-[#87CEEB] sm:p-5  rounded-xl"
            >
              <div className="font-semibold text-xl mb-2 text-black h-auto">
                Jenjang {grade}
              </div>
              <div>
                {" "}
                {exercises
                  .filter((exercise) => exercise.grade === grade.toString())
                  .map((exercise) => (
                    <div
                      key={exercise.id}
                      className="flex flex-1 flex-row gap-5 items-center justify-between "
                    >
                      <div className="font-normal text-xl flex-1">
                        {exercise.title}
                      </div>
                      <div className="flex flow-row gap-5">
                        <Link
                          to={`/survey/public/${exercise.slug}`}
                          className="font-normal text-lg underline decoration-white text-white"
                        >
                          Exercise
                        </Link>
                        <Link
                          to={`/history/${exercise.slug}`}
                          className="font-normal text-lg underline decoration-white text-white"
                        >
                          History
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
