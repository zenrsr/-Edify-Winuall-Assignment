import { useContext } from "react";
import Greeting from "../utils/Greeting";
import DisplayTodos from "../utils/DisplayTodos";
import { RxPlus } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import DataContext from "../context/DataContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./ui/tooltip";

const Home = () => {
  const {
    data,
    setData,
    edit,
    setEdit,
    addNotificationTitle,
    editNotificationTitle,
    deleteNotificationTitle,
    setDeleteNotificationTitle,
    addNotification,
    editNotification,
    deleteNotification,
    setDeleteNotification,
    setTaskDetails
  } = useContext(DataContext);

  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen pb-60 inset-0 h-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className=" max-w-[1300px] px-3 m-auto">
        <div>
          <Greeting />
          <DisplayTodos
            data={data}
            setData={setData}
            edit={edit}
            setEdit={setEdit}
            setDeleteNotificationTitle={setDeleteNotificationTitle}
            setDeleteNotification={setDeleteNotification}
            setTaskDetails={setTaskDetails}
          />

          {addNotification && (
            <div className="z-10 px-3 py-2 rounded-md bg-white border-l-[5px] flex items-center gap-2 border-green-600 fixed bottom-8 left-[50%] -translate-x-[50%]">
              <FaCheck className=" text-xl text-green-500" />
              <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
                Added task - {addNotificationTitle}
              </h2>
            </div>
          )}

          {editNotification && (
            <div className="z-10 px-3 py-2 rounded-md bg-white border-l-[5px] flex items-center gap-2 border-green-600 fixed bottom-8 left-[50%] -translate-x-[50%]">
              <FaCheck className=" text-xl text-green-500" />{" "}
              <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
                Task {editNotificationTitle} updated
              </h2>
            </div>
          )}

          {deleteNotification && (
            <div className="z-10 px-3 py-2 rounded-md bg-white border-l-[5px] flex items-center gap-2 border-green-600 fixed bottom-8 left-[50%] -translate-x-[50%]">
              <FaCheck className=" text-xl text-green-500" />
              <h2 className="max-md:text-xs text-sm text-slate-600 font-semibold">
                Deleted Task - {deleteNotificationTitle}
              </h2>
            </div>
          )}
          <div
            onClick={() => navigate("/addTodo")}
            className=" fixed bottom-10 w-16 h-16 max-sm:w-14 max-sm:h-14 cursor-pointer bg-white grid place-items-center rounded-full left-[50%] -translate-x-[50%]"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <RxPlus className=" text-4xl max-sm:text-3xl plusIcon" />
                </TooltipTrigger>
                <TooltipContent className="-translate-x-10 bg-white bg-opacity-10 backdrop-blur-xl shadow-xl text-white">
                  <p>Add an Item to Todo </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
