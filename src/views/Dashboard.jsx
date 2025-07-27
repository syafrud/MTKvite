import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    navigate(`/surveys?searchTerm=${searchTerm}`);
  };

  return (
    <div className="w-full h-full flex flex-col  overflow-x-hidden">
      <div className="flex flex-col relative sm:flex-row w-full sm:min-h-60 md:min-h-80  bg-[#87CEEB] justify-center">
        <img
          src="./src/assets/img/logo.png"
          alt=""
          className="absolute lg:w-96 sm:w-auto h-full top-0 sm:-left-[5.5rem] lg:-left-40 rotate-180 sm:order-1"
        />
        <div className="h-full flex flex-col justify-center items-center sm:order-2">
          <p className="font-bold lg:text-6xl my-2 sm:text-3xl md:text-4xl text-center px-4">
            Welcome to MatikaKu
          </p>
          <p className="font-normal sm:text-lg my-2 md:text-xl lg:text-xl text-center px-4">
            Tempatnya dimana kalian bisa belajar matematika dengan mudah
          </p>
          <div className="relative sm:mx-0  mx-4 w-1/2">
            <input
              className="sm:p-2 md:p-4 w-full sm:max-w-sm md:max-w-md bg-white rounded-full !pr-9"
              placeholder="Search Videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon
              className="w-10 h-10 p-2 rounded-full text-black cursor-pointer absolute top-0 bottom-0 m-auto right-1"
              onClick={handleSearch}
            />
          </div>
        </div>
        <img
          src="./src/assets/img/logo.png"
          alt=""
          className="absolute lg:w-96 sm:w-auto h-full top-0 sm:-right-[5.5rem] lg:-right-40 sm:order-3"
        />
      </div>
      <div className="flex flex-row, bg-white w-full min-h-screen sm:p-10 md:p-20 items-center gap-5">
        <img
          src="./src/assets/img/logo.png"
          alt=""
          className="sm:w-1/3 sm:h-fit"
        />
        <div className="flex flex-col gap-5 justify-center h-full w-auto">
          <p className="font-bold  sm:text-2xl md:text-3xl lg:text-4xl">
            Advantage
          </p>
          <p className="sm:text-lg md:text-xl lg:text-2xl text-justify">
            Website MatikaKu disini menyediakan video pembelajran matematika
            dari segala jenjang dari SD sampai SMA/SMK. Di MatikaKu bukan hanya
            menyediakan video pembelajaran tetapi kita juga menyediakan
            soal-soal untuk kalian latihan, jadi kalian bisa langsung latihan
            dengan soal-soal yang sudah kami sediakan sesudahnya kalian menonton
            video-video kita. Kalian juga bisa mengakses kembali hasil latihan
            kalian dari beberapa waktu yang telah berlalu di history, jadi
            kalian bisa mengkoreksi jawaban kalian.
          </p>
        </div>
      </div>
      <div className=" flex flex-col sm:flex-row justify-between px-10 bg-[#87CEEB] w-full h-24 bottom-0">
        <div className="flex flex-row items-end mb-4 sm:mb-0">
          <img
            src="../../src/assets/img/logo.png"
            alt=""
            className="relative h-full top-0"
          />
          <p className="font-bold md:text-4xl sm:text-2xl my-3">MatikaKu</p>
        </div>
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
}
