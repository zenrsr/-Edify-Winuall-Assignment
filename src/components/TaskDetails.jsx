import { useParams } from "react-router-dom";
import TopNav from "../utils/TopNav";
import PageNotFound from "./PageNotFound";
import { formatDate } from "../utils/FormatDate";

const TaskDetails = () => {
  const { id } = useParams();
  const items = JSON.parse(localStorage.getItem("todoItems"));

  const details = items.find((val) => val.id.toString() === id);

  if (!details) {
    return <PageNotFound />;
  }
  console.log(details);
  return (
    <div className="min-h-screen inset-0 -z-10 w-full h-screen items-center px-5 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] overflow-y-auto">
      <div className=" max-w-[1300px] px-10 max-md:px-5 m-auto">
        <div>
          <TopNav title={"Task Details"} />

          <div className="bg-white rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border-[2px] border-slate-500 max-w-[600px] m-auto mt-16 py-10 px-8 max-sm:p-5 text-white">
            <h1 className=" text-center text-4xl max-sm:text-2xl font-bold">
              Task
            </h1>

            <div className=" mt-8">
              <div className="max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className="text-left text-lg max-sm:text-sm min-w-28">
                  Task Name:
                </h2>
                <p className=" text-left text-base max-sm:text-sm font-normal">
                  {details.title}
                </p>
              </div>

              <div className="max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className="text-left text-lg max-sm:text-sm min-w-28">
                  Description:
                </h2>
                <p className="text-left text-base max-sm:text-sm font-normal">
                  {details.description ? details.description : "-"}
                </p>
              </div>

              <div className="text-xl max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className=" text-left text-lg max-sm:text-sm min-w-28">
                  Due Date:
                </h2>
                <p className="text-left text-base max-sm:text-sm font-normal">
                  {formatDate(details.dueDate)}
                </p>
              </div>

              <div className="text-xl max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className=" text-left text-lg max-sm:text-sm min-w-28">
                  Priority:
                </h2>
                <p className="text-left text-base max-sm:text-sm font-normal">
                  {details.taskPriority}
                </p>
              </div>

              <div className="max-sm:text-base font-semibold flex gap-4 items-center border-b pt-4 pb-3">
                <h2 className="text-left text-lg max-sm:text-sm min-w-28">
                  Complete:
                </h2>
                <p className=" text-left text-base max-sm:text-sm font-normal">
                  {details.check ? "Completed" : "Not completed"}
                </p>
              </div>

              <div className="max-sm:text-base font-semibold flex gap-4 items-center pt-4 pb-3">
                <h2 className="text-left text-lg max-sm:text-sm min-w-28">
                  Catagory:
                </h2>

                <div className="flex flex-wrap gap-3 max-sm:gap-2">
                  {details.catagory.map((val, index) => (
                    <p
                      className="text-left text-base cursor-pointer border-purple-900 border-2 flex items-center gap-1 font-medium rounded-2xl px-3 py-1 max-sm:text-xs max-sm:py-0 bg-white bg-opacity-25 hover:bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg text-white"
                      key={index}
                    >
                      {val.catagory}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
