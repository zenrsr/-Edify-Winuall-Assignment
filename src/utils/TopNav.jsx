import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const TopNav = ({ title }) => {
  const navigate = useNavigate();

  return (
    <nav className=" py-7 max-sm:py-5  text-center text-3xl text-white flex items-center">
      <div
        className=" rounded-lg p-1"
        title="Back"
        onClick={() => navigate("/")}
      >
        <IoIosArrowBack className="text-4xl max-sm:text-2xl cursor-pointer" />
      </div>
      <h1 className="font-bold text-5xl max-sm:text-2xl bg-gradient-to-r from-rose-100 to-teal-100 bg-clip-text text-transparent mx-auto">
        {title}
      </h1>
    </nav>
  );
};

export default TopNav;
