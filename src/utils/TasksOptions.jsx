import React, { useContext } from "react";
import { BiTask } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";

const TasksOptions = ({
  data,
  setData,
  val,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setOpenOptions,
  index
}) => {
  const { setIndex } = useContext(DataContext);

  const handleDelete = (isData) => {
    const deleteData = data.filter((val) => val.id !== isData.id);
    setData(deleteData);
    localStorage.setItem("todoItems", JSON.stringify(deleteData));

    setDeleteNotificationTitle(isData.title);

    setDeleteNotification(true);
    setOpenOptions(false);
    setTimeout(() => {
      setDeleteNotification(false);
      setDeleteNotificationTitle("");
    }, 4000);
  };

  const handleCheck = (id) => {
    const doneData = data.map((val) =>
      val.id === id ? { ...val, check: !val.check } : val
    );
    setData(doneData);
    setOpenOptions(false);
    localStorage.setItem("todoItems", JSON.stringify(doneData));
  };

  return (
    <div className="absolute top-0 left-0 -translate-y-1/2 translate-x-1/4 w-[215px] shadow bg-white bg-opacity-20  max-xl:-left-48 p-3 rounded-2xl">
      <ul className=" flex flex-col text-white">
        <li
          onClick={() => handleCheck(val.id)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-black  hover:bg-opacity-25 py-3 max-sm:py-2 px-2 rounded-md"
        >
          <FaCheck className=" text-2xl max-sm:text-xl text-white" />
          {val.check ? "Mark as not done" : "Mark as done"}
        </li>
        <li
          onClick={() => {
            setIndex(index);
            setEdit({
              id: val.id,
              title: val.title,
              description: val.description,
              check: val.check,
              currentTime: val.currentTime,
              catagory: val.catagory
            });
          }}
        >
          <Link
            to={"/edit"}
            className=" max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-black hover:bg-opacity-25 py-3  px-2 rounded-md"
          >
            <RiEdit2Fill className=" text-2xl max-sm:text-xl text-white" />
            Edit
          </Link>
        </li>

        <li
          onClick={() => handleDelete(val)}
          className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-black hover:bg-opacity-25 py-3 px-2 rounded-md"
        >
          <MdDelete className=" text-2xl max-sm:text-xl text-white" />
          Delete
        </li>
        <li>
          <Link
            to={`/todo/${val.id}`}
            className=" max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-black hover:bg-opacity-25 py-3 px-2 rounded-md"
          >
            <BiTask className=" text-2xl max-sm:text-xl text-white" />
            Task details
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TasksOptions;
