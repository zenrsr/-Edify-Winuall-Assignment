import { useContext } from "react";
import { Toaster } from "@/components/ui/toaster";
import TopNav from "../utils/TopNav";
import FormInputs from "../utils/TaskForm";
import DataContext from "../context/DataContext";

const AddTodo = () => {
  const { data, setData, setAddNotification, setAddNotificationTitle } =
    useContext(DataContext);

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] overflow-y-auto">
      {/* <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] overflow-y-auto"> */}
      <div className=" max-w-[1300px] px-10 max-md:px-5 m-auto">
        <div>
          <TopNav title={"Add New Todo"} />
          <FormInputs
            data={data}
            setData={setData}
            setAddNotification={setAddNotification}
            setAddNotificationTitle={setAddNotificationTitle}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddTodo;
