import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEquals, FaTimes } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gray-100 ${
          isOpen ? "h-[300px]" : "h-[40px]"
        } overflow-hidden w-full transition-all fixed z-30 bottom-0`}
      >
        <div className="h-[40px] flex justify-center items-center text-xl">
          {isOpen ? <FaTimes /> : <FaEquals />}
        </div>
        <div className="flex flex-col text-center py-10 gap-3">
          <Link to="/" className="font-bold">
            Home
          </Link>
          <Link
            to="/summary"
            className="flex justify-center items-center gap-2"
          >
            Riepilogo <FaArrowTrendUp />
          </Link>
          <Link to="/dashboard/giulia">Dashboard Giulia</Link>
          <Link to="/dashboard/giusy">Dashboard Giusy</Link>
          <Link to="/dashboard/raffa">Dashboard Raffa</Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
