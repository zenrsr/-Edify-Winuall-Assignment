/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Todo from "./TaskList";
import { CircularProgressbar } from "react-circular-progressbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "react-circular-progressbar/dist/styles.css";
import { MdDragIndicator } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  const [activeTab, setActiveTab] = useState("all");

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
    let filteredData = data;
    if (activeTab === "completed") {
      filteredData = data.filter((val) => val.check);
    } else if (activeTab === "pending") {
      filteredData = data.filter((val) => !val.check);
    }

    const filterResults = filteredData.filter(
      (val) =>
        val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filterResults);
  }, [data, search, activeTab]);

  useEffect(() => {
    const progressBar = progressBarRef.current;
    if (progressBar) {
      const intervalId = setInterval(() => {
        if (progressBar.style.width !== `${completedTask()}%`) {
          progressBar.style.width = `${completedTask()}%`;
        } else {
          clearInterval(intervalId);
        }
      }, 50);

      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedTask()]);

  const completedTasks = () => {
    const completed = data.filter((val) => val.check);
    if (completed.length > 0) {
      return `(${completed.length})`;
    }
    return "";
  };

  const pendingTask = () => {
    const pending = data.filter((val) => !val.check);
    if (pending.length > 0) {
      return `(${pending.length})`;
    }
    return "";
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(searchResults);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSearchResults(items);
  };

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

          <div className="flex flex-col items-center justify-center max-w-[700px] mx-auto mt-10 mb-10">
            <Tabs
              defaultValue="all"
              className="w-full flex justify-evenly flex-col"
            >
              <div className="flex w-full justify-center">
                <TabsList className="bg-white bg-opacity-25 backdrop-filter backdrop-blur-xl shadow-lg rounded-xl text-white border-[2px] border-slate-500 flex max-w-full sm:max-w-3/4">
                  <TabsTrigger
                    value="all"
                    className="px-2 py-1 sm:px-4 sm:py-2"
                  >
                    All Tasks {data.length > 0 ? `(${data.length})` : ""}
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="px-2 py-1 sm:px-4 sm:py-2"
                  >
                    Completed Tasks {completedTasks()}
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="px-2 py-1 sm:px-4 sm:py-2"
                  >
                    Pending Tasks {pendingTask()}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="text-white max-w-full mt-4">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="all">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {searchResults.map((val, index) => (
                          <Draggable
                            key={index}
                            draggableId={`${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="drag-handle cursor-grab">
                                  <MdDragIndicator />
                                </div>
                                <Todo
                                  i={index}
                                  val={val}
                                  data={data}
                                  setData={setData}
                                  setEdit={setEdit}
                                  setDeleteNotificationTitle={
                                    setDeleteNotificationTitle
                                  }
                                  setDeleteNotification={setDeleteNotification}
                                  setTaskDetails={setTaskDetails}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </TabsContent>
              <TabsContent
                value="pending"
                className="text-white max-w-full mt-4"
              >
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="pending">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {searchResults
                          .filter((val) => !val.check)
                          .map((val, index) => (
                            <Draggable
                              key={index}
                              draggableId={`${index}`}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="drag-handle cursor-grab">
                                    <MdDragIndicator />
                                  </div>
                                  <Todo
                                    i={index}
                                    val={val}
                                    data={data}
                                    setData={setData}
                                    setEdit={setEdit}
                                    setDeleteNotificationTitle={
                                      setDeleteNotificationTitle
                                    }
                                    setDeleteNotification={
                                      setDeleteNotification
                                    }
                                    setTaskDetails={setTaskDetails}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </TabsContent>
              <TabsContent
                value="completed"
                className="text-white max-w-full mt-4"
              >
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="completed">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {searchResults
                          .filter((val) => val.check)
                          .map((val, index) => (
                            <Draggable
                              key={index}
                              draggableId={`${index}`}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="drag-handle cursor-grab">
                                    <MdDragIndicator />
                                  </div>
                                  <Todo
                                    i={index}
                                    val={val}
                                    data={data}
                                    setData={setData}
                                    setEdit={setEdit}
                                    setDeleteNotificationTitle={
                                      setDeleteNotificationTitle
                                    }
                                    setDeleteNotification={
                                      setDeleteNotification
                                    }
                                    setTaskDetails={setTaskDetails}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : (
        <>
          <h1 className="bg-gradient-to-r from-green-200 via-green-300 to-blue-500 text-transparent bg-clip-text p-4 h-auto w-full text-center text-7xl max-md:text-3xl max-sm:text-3xl font-bold flex flex-col items-center justify-center absolute bottom-[50%] left-[50%] -translate-x-[50%] gap-2">
            Welcome to Organic Mind <br></br>
            <span className="bg-gradient-to-r from-indigo-300 to-purple-400 text-transparent bg-clip-text text-2xl max-sm:text-xs max-md:text-base">
              Click on the Plus button to get started
            </span>
          </h1>
        </>
      )}
    </>
  );
};

export default DisplayTodos;
