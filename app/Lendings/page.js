import React from "react";

import axios from "../services/axios";
import Sidebar from "../components/Sidebar";
import LendingForm from "../components/LendingForm";
import StudentForm from "../components/StudentForm";

const Lendings = () => {
  return (
    <main className="flex w-full h-screen">
      <Sidebar selected="3" />
      <div className="flex flex-col w-full h-screen bg-main text-white">
        <header className="flex w-full h-[15%] items-end px-10 ">
          <h1 className="text-5xl font-bold">Gerenciamento</h1>
        </header>

        {/* Container for the side-by-side forms */}
        <div className="flex w-full h-[85%] items-center justify-center gap-10 p-10 overflow-auto">
          <LendingForm />
          <StudentForm />
        </div>
      </div>
    </main>
  );
};

export default Lendings;
