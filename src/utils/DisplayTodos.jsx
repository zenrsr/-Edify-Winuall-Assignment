import React, { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Todo from "./TaskList";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DisplayTodos = ({
  data,
  setData,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setTaskDetails
}) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const progressBarRef = useRef(null);

  const completedTask = () => {
    const completed = data.filter((val) => val.check);

    if (data.length) {
      const completePercentage = (completed.length / data.length) * 100;
      return completePercentage.toFixed();
    } else {
      return 0;
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filterResults = data.filter(
      (val) =>
        val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filterResults);
  }, [data, search]);

  useEffect(() => {
    const progressBar = progressBarRef.current;
    if (progressBar) {
      const intervalId = setInterval(() => {
        if (progressBar.style.width !== `${completedTask()}%`) {
          progressBar.style.width = `${completedTask()}%`;
        } else {
          clearInterval(intervalId);
        }
      }, 50); // Update every 50ms

      return () => clearInterval(intervalId); // Cleanup the interval
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedTask()]);

  return (
    <>
      {data.length ? (
        <div>
          <div className="flex flex-row items-center justify-start max-md:container max-w-[700px] m-auto mt-7 max-sm:mt-5 mb-7 max-sm:mb-5 border-2 border-slate-500 rounded-xl relative pl-10">
            <IoMdSearch className="w-1/8 text-slate-500 text-2xl max-sm:text-xl" />
            <input
              type="text"
              placeholder="Search for a task ..."
              value={search}
              onChange={handleSearch}
              className="w-7/8 items-center h-14 max-sm:h-12 rounded-xl pl-11 bg-transparent border-none text-white placeholder:text-sm outline-none"
            />
          </div>
          <div className="flex flex-row justify-between items-center bg-white max-md:container border-[2px] border-slate-500 text-white max-w-[700px] mt-10 max-sm:mt-2 mb-10 m-auto rounded-3xl p-10 max-sm:p-5 bg-opacity-5 backdrop-filter backdrop-blur-xl shadow-lg">
            <div className="w-3/4">
              <h1 className=" text-2xl max-sm:text-base font-medium">
                Progress summery
              </h1>

              <div className="flex flex-col w-[60%] max-sm:w-[100%] mt-7 max-sm:mt-5">
                <div className="flex justify-between items-center">
                  <p className=" max-sm:text-xs">Progress</p>
                  <p className="text-sm">{completedTask()}%</p>
                </div>

                <div className="  bg-white w-full h-2 mt-2 rounded-3xl">
                  <div
                    className="h-full rounded-3xl transition-all bg-gradient-to-r from-blue-400 to-emerald-400"
                    style={{ width: `${completedTask()}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="w-1/6 md:w/12 items-center max-sm:w-8 max-sm:h-8 text-white">
              {/* Wrapper for circular progress bar */}
              <CircularProgressbar
                value={completedTask()}
                text={`${data.length} ${data.length > 1 ? "Tasks" : "Task"}`}
                className="text-white text-sm hidden lg:block"
                styles={{
                  path: {
                    stroke: `#4CAF50`,
                    strokeLinecap: "round",
                    transition: "stroke-dashoffset 0.5s ease 0s"
                  },
                  trail: { stroke: "#f0f0f0" }
                }}
              />
            </div>
          </div>

          <div className="max-md:container max-w-[700px] m-auto flex flex-col gap-4 max-sm:gap-3 pb-5">
            {searchResults.map((val, index) => (
              <Todo
                key={index}
                i={index}
                val={val}
                data={data}
                setData={setData}
                setEdit={setEdit}
                setDeleteNotificationTitle={setDeleteNotificationTitle}
                setDeleteNotification={setDeleteNotification}
                setTaskDetails={setTaskDetails}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="bg-gradient-to-r from-rose-100 to-teal-100 bg-clip-text text-transparent p-4 h-auto w-full text-center text-7xl max-md:text-2xl max-sm:text-xl font-bold absolute bottom-[50%] left-[50%] -translate-x-[50%]">
          Welcome to Organic Mind
        </h1>
      )}
    </>
  );
};

export default DisplayTodos;
