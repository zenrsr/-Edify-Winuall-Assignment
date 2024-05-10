import { useEffect, useRef, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CatagoryBtn from "./CatagoryBtn";
import { v4 as uuidv4 } from "uuid";
import { catagory } from "../constants/Data";

const FormInputs = ({
  data,
  setData,
  setAddNotification,
  setAddNotificationTitle
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [priorityData] = useState([
    { id: uuidv4(), priority: "Normal" },
    { id: uuidv4(), priority: "Medium" },
    { id: uuidv4(), priority: "High" }
  ]);
  const [taskPriority, setTaskPriority] = useState("Normal");
  const [dueDate, setDueDate] = useState(null);

  const [emptyInputError, setEmptyInputError] = useState(false);

  const [nameCountError, setNameCountError] = useState("");
  const [descriptionCountError, setDescriptionCountError] = useState("");

  const [CategoryOpen, setCategoryOpen] = useState(false);

  const [selectedCatagory, setSelectedCatagory] = useState([]);

  const [maxSelectedError, setMaxSelectedError] = useState(false);

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handleName = (e) => {
    let title = e.target.value;
    setTaskName(e.target.value);

    if (title.length > 35) {
      setNameCountError("Name should be less than or equal to 30 characters");
    } else {
      setNameCountError("");
    }
  };

  const handleDescription = (e) => {
    let description = e.target.value;
    setTaskDescription(e.target.value);

    if (description.length > 250) {
      setDescriptionCountError(
        "Description should be less than or equal to 200 characters"
      );
    } else {
      setDescriptionCountError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new Date object
    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    let hours = now.getHours();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = (hours % 12 || 12).toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const id = uuidv4();
    const title = taskName;
    const description = taskDescription;
    const currentTime = `${date}/${month}/${year} ,${hours}:${minutes} ${amOrPm}`;
    const check = false;

    if (taskName === "") {
      setEmptyInputError(true);

      setTimeout(() => {
        setEmptyInputError(false);
      }, 4000);
    } else {
      const newTask = {
        id: id,
        title: title,
        description: description,
        currentTime: currentTime,
        check: check,
        dueDate: dueDate ? dueDate : `${date}/${month}/${year}`, // Update dueDate
        taskPriority: taskPriority, // Add taskPriority
        catagory: selectedCatagory
      };

      localStorage.setItem("todoItems", JSON.stringify([...data, newTask]));
      setData([...data, newTask]);
      setTaskName("");
      setTaskDescription("");
      setEmptyInputError(false);
      navigate("/");

      setAddNotificationTitle(taskName);
      setAddNotification(true);
      setTimeout(() => {
        setAddNotification(false);
        setAddNotificationTitle("");
      }, 4000);
    }
  };

  const handleSelected = (catagoryObj) => {
    setSelectedCatagory([...selectedCatagory, catagoryObj]);

    const isCategorySelected = selectedCatagory.filter(
      (val) => val.id === catagoryObj.id
    );

    if (isCategorySelected.length) {
      const updatedCatagories = selectedCatagory.filter(
        (val) => val.id !== catagoryObj.id
      );
      setSelectedCatagory(updatedCatagories);
    } else {
      if (selectedCatagory.length < 3) {
        setMaxSelectedError(false);
        setSelectedCatagory([...selectedCatagory, catagoryObj]);
      } else {
        setMaxSelectedError(true);
        setTimeout(() => {
          setMaxSelectedError(false);
        }, 4000);
        setSelectedCatagory([...selectedCatagory]);
      }
    }
  };

  const catagoryRef = useRef();

  useEffect(() => {
    let handleCatagoryTouch = (e) => {
      if (!catagoryRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleCatagoryTouch);

    return () => document.removeEventListener("mousedown", handleCatagoryTouch);
  });

  return (
    <div className=" py-10">
      <form onSubmit={handleSubmit} className="max-w-[600px] m-auto">
        <div>
          <label
            className={`text-sm max-sm:text-xs cursor-pointer hover:text-slate-200 ${
              nameCountError ? "text-red-700" : "text-white"
            } text-white`}
            htmlFor="taskName"
          >
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            placeholder="Enter task name"
            value={taskName}
            onChange={handleName}
            onKeyDown={handleKeyDown}
            className={`w-full border-[2px] border-slate-500 h-14 max-sm:h-12 bg-white bg-opacity-5 border-opacity-25 rounded-xl p-4 text-base max-sm:placeholder:text-sm mt-1 outline-none backdrop-filter backdrop-blur-lg shadow-lg text-white`}
          />
          <p className="text-red-500 text-base max-sm:text-xs mt-1">
            {nameCountError}
          </p>
        </div>
        <div className=" mt-7 max-sm:mt-4">
          <label
            className={`text-sm max-sm:text-xs cursor-pointer hover:text-slate-200 ${
              descriptionCountError ? "text-red-500" : "text-white"
            } text-white`}
            htmlFor="taskDescription"
          >
            Task Description
          </label>
          <textarea
            id="taskDescription"
            placeholder="Enter task description"
            value={taskDescription}
            onChange={handleDescription}
            className={`resize-none border-[1px] border-slate-500 w-full rounded-xl p-4 max-sm:p-3 mt-1 text-base max-sm:placeholder:text-sm h-48 max-sm:h-36 outline-none backdrop-filter backdrop-blur-lg shadow-lg bg-white bg-opacity-5 border-opacity-25 text-white`}
          ></textarea>
          <p className="text-red-500 text-base max-sm:text-xs">
            {descriptionCountError}
          </p>
        </div>

        <div className=" mt-7 max-sm:mt-4 text-white">
          <label
            className="text-sm max-sm:text-xs cursor-pointer hover:text-slate-200 text-white"
            htmlFor="dueDate"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            className="w-full cursor-pointer border-[2px] border-slate-500 h-14 max-sm:h-12 bg-white bg-opacity-5 border-opacity-25 rounded-xl p-4 text-base max-sm:placeholder:text-sm mt-1 outline-none backdrop-filter backdrop-blur-lg shadow-lg text-white"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </div>

        <div className="mt-7 max-sm:mt-4">
          <label className="text-sm max-sm:text-xs cursor-pointer hover:text-slate-200 text-white">
            Priority
          </label>

          <div className="flex justify-between bg-white bg-opacity-5 border-[1px] border-slate-700 backdrop-blur-lg shadow-lg gap-7 cursor-pointer min-h-14 max-sm:min-h-12 px-3 py-3 max-sm:px-2 max-sm:py-2 items-center max-sm:text-xs rounded-xl w-full mt-1">
            {priorityData.map((val, index) => (
              <div key={index} className=" w-1/3 flex gap-2">
                <input
                  type="radio"
                  name="priority"
                  id={val.id}
                  value={val.priority}
                  className="rounded-full"
                  checked={taskPriority === val.priority}
                  onChange={() => setTaskPriority(val.priority)}
                />
                <label
                  htmlFor={val.id}
                  className="peer-checked:bg-opacity-30 text-xl max-sm:text-xs cursor-pointer hover:text-slate-200 text-white"
                >
                  {val.priority}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div ref={catagoryRef} className=" mt-7 max-sm:mt-4">
          <label className="text-sm max-sm:text-xs text-white cursor-pointer hover:text-slate-200">
            Category
          </label>

          <div
            onClick={() => setCategoryOpen(!CategoryOpen)}
            className=" bg-white bg-opacity-5 backdrop-blur-lg shadow-lg flex gap-7 cursor-pointer justify-between min-h-14 max-sm:min-h-12 px-3 py-3 max-sm:px-2 max-sm:py-2 items-center max-sm:text-xs rounded-xl w-full mt-1"
          >
            <div className=" flex gap-2 flex-wrap items-center">
              {selectedCatagory.map((val, index) => (
                <div
                  key={index}
                  className=" bg-white bg-opacity-20 border-[2px] border-slate-500 text-white text-sm max-sm:text-xs flex items-center gap-1 px-3 py-2 max-sm:py-2 font-medium rounded-lg"
                >
                  {val.catagory}
                </div>
              ))}
            </div>

            <div className=" ms-auto flex text-white">
              {CategoryOpen ? (
                <IoIosArrowUp className=" text-2xl max-sm:text-xl" />
              ) : (
                <IoIosArrowDown className=" text-2xl max-sm:text-xl" />
              )}
            </div>
          </div>
          {CategoryOpen ? (
            <div className="mt-3">
              <ul className="p-2 bg-white bg-opacity-5 border border-gray-200 border-opacity-25 flex flex-col gap-2 max-sm:gap-1 rounded-xl backdrop-filter backdrop-blur-lg shadow-lg">
                <li className="my-2 px-3 text-white max-sm:text-sm bg-transparent bg-opacity-10">
                  Choose a category
                </li>
                {catagory.map((val, index) => (
                  <CatagoryBtn
                    key={index}
                    val={val}
                    selectedCatagory={selectedCatagory}
                    handleSelected={handleSelected}
                  />
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="text-center mt-4">
          <button
            disabled={nameCountError || descriptionCountError ? true : false}
            type="submit"
            className={`${
              nameCountError || descriptionCountError
                ? "bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg cursor-not-allowed text-white"
                : "hover:bg-opacity-30 text-white "
            } transition text-xl font-semibold bg-white bg-opacity-25 border-2 border-white border-opacity-25 rounded-xl p-4 max-sm:p-3 max-sm:text-lg w-full backdrop-filter backdrop-blur-lg shadow-lg`}
          >
            Create Task
          </button>
        </div>
      </form>

      {emptyInputError && (
        <div className=" max-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[5px] flex items-center gap-2 border-red-600 fixed bottom-8 left-[50%] -translate-x-[50%]">
          <IoIosCloseCircle className=" text-2xl max-sm:text-xl text-red-500" />{" "}
          <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
            Please enter a task name
          </h2>
        </div>
      )}
    </div>
  );
};
export default FormInputs;
