import { Link } from "react-router-dom";
import error404Img from "../assets/opps.svg";
import { FaArrowLeft } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className=" w-100 px-5 flex justify-center items-center min-h-screen ">
      <div>
        <img
          src={error404Img}
          alt="404ErrorImg"
          className=" w-[450px] max-sm:w-[290px] m-auto"
        />

        <p className=" text-lg text-black text-center font-medium mt-3">
          This page you are looking for does not exist
        </p>

        <div className=" text-center mt-4">
          <Link to={"/"}>
            <button className="flex group items-center gap-2 m-auto py-3 px-5 text-black font-semibold bg-amber-300 rounded-full hover:bg-slate-900 duration-300 hover:text-white max-sm:text-sm">
              <FaArrowLeft className=" text-lg max-sm:text-base group-hover:-translate-x-1 duration-75" />{" "}
              Go Back Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
