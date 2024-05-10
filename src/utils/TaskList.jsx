import { useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import TasksOptions from "./TasksOptions";
import { FaCheck, FaCircle } from "react-icons/fa6";
import { formatDate } from "./FormatDate";

const Todo = ({
  i,
  val,
  data,
  setData,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setTaskDetails
}) => {
  const [openOptions, setOpenOptions] = useState(false);

  const menuRef = useRef();

  const handleCheck = (id) => {
    const doneData = data.map((val) =>
      val.id === id ? { ...val, check: !val.check } : val
    );
    setData(doneData);
    setOpenOptions(false);
    localStorage.setItem("todoItems", JSON.stringify(doneData));
  };

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="flex flex-row relative justify-between gap-4 max-w-full items-center text-white bg-white bg-opacity-15 backdrop-blur-xl shadow-xl border-[2px] border-slate-500 rounded-2xl px-6 py-5 max-sm:py-4 max-sm:px-4">
      {val.check && (
        <div
          className=" bg-green-500 bg-opacity-70  border-[2px] border-slate-500 p-4 max-sm:p-2 rounded-full cursor-pointer"
          onClick={() => handleCheck(val.id)}
        >
          <FaCheck className=" text-xl" />
        </div>
      )}
      {!val.check && (
        <div
          className=" bg-slate-500 bg-opacity-25 border-[2px] border-slate-500 p-4 max-sm:p-2 rounded-full cursor-pointer"
          onClick={() => handleCheck(val.id)}
        >
          <FaCircle className="bg-transparent text-transparent text-xl" />
        </div>
      )}

      <div className="black w-full">
        <div
          className={`flex justify-between gap-10 items-center ${
            val.description ? "mb-3 max-sm:mb-1" : "mb-0"
          }`}
        >
          <h2
            className={`${
              val.check ? "line-through" : null
            } font-bold text-lg displayInput max-sm:text-sm`}
          >
            {val.title}
          </h2>

          <div className="flex flex-col gap-2 items-end justify-between">
            <p
              className={`${
                val.check ? "line-through" : null
              } min-w-[110px] max-sm:text-xs font-light text-gray-200`}
            >
              {val.dueDate && (
                <p className="font-medium bg-clip-text text-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
                  Due Date: {formatDate(val.dueDate)}
                </p>
              )}
            </p>
            <div className="flex gap-2 items-center text-gray-200 max-sm:text-xs mr-2">
              {val.taskPriority && (
                <p
                  className={`font-semibold 
                    text-priorityNormal ${
                      val.taskPriority === "Medium" ? "text-priorityMedium" : ""
                    } 
                    ${val.taskPriority === "Hard" ? "text-priorityHard" : ""}`}
                >
                  Priority: {val.taskPriority}
                </p>
              )}
            </div>
          </div>
        </div>
        <p
          className={`${
            val.check ? "line-through" : null
          } text-base max-sm:text-sm ${!val.description && "hidden"}`}
        >
          {val.description}
        </p>

        <div
          className={`flex gap-2 items-center flex-wrap mt-3 ${
            !val.catagory.length && "hidden"
          }`}
        >
          {val.catagory.map((c, index) => (
            <h4
              className="bg-white bg-opacity-15 backdrop-blur-md shadow-md cursor-pointer hover:bg-opacity-20 rounded-xl text-sm max-sm:text-xs px-3 flex items-center font-medium gap-1 py-1 max-sm:py-0"
              key={index}
            >
              {c.catagory}
            </h4>
          ))}
        </div>
      </div>

      <div ref={menuRef} className=" relative">
        <SlOptionsVertical
          onClick={() => setOpenOptions(!openOptions)}
          className=" text-lg cursor-pointer"
        />

        <div
          className={`${openOptions ? "animationActive" : "animationUnactive"}`}
        >
          {openOptions && (
            <TasksOptions
              index={i}
              val={val}
              data={data}
              setData={setData}
              setEdit={setEdit}
              setDeleteNotificationTitle={setDeleteNotificationTitle}
              setDeleteNotification={setDeleteNotification}
              setTaskDetails={setTaskDetails}
              setOpenOptions={setOpenOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
