import { useEffect, useState } from "react";

const CatagoryBtn = ({ val, selectedCatagory, handleSelected }) => {
  const [activeCatagory, setActiveCatagory] = useState(false);

  useEffect(() => {
    const isSelected = selectedCatagory.some(
      (v) => v.catagory === val.catagory
    );
    setActiveCatagory(isSelected);
  }, [selectedCatagory, val.catagory]);

  return (
    <li
      onClick={(e) => {
        handleSelected({
          id: val.id,
          catagory: val.catagory
        });
      }}
      className={`text-base max-sm:text-sm cursor-pointer flex items-center gap-2 font-medium text-white rounded-lg px-4 py-2 max-sm:py-1 ${
        activeCatagory
          ? "border-[1px] border-slate-500 bg-white bg-opacity-25 border-opacity-25 backdrop-filter backdrop-blur-lg shadow-lg "
          : "bg-white bg-opacity-10 border border-gray-200 border-opacity-25 backdrop-filter backdrop-blur-lg shadow-lg"
      } `}
    >
      {val.catagory}
    </li>
  );
};

export default CatagoryBtn;
