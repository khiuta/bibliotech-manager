"use client";

import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

import axios from "../services/axios";
import Sidebar from "../components/Sidebar";

const History = () => {
  const [allLoanData, setAllLoanData] = useState([]);
  // UPDATED: Default to 'no-prazo' so new loans are visible immediately
  const [activeTab, setActiveTab] = useState("no-prazo");

  const fetchLoans = async () => {
    try {
      const response = await axios.get("/loan");

      console.log("Loans fetched:", response.data);

      if (Array.isArray(response.data)) {
        setAllLoanData(response.data);
      } else {
        setAllLoanData([]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados dos empréstimos:", error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleReturn = async (id) => {
    try {
      await axios.put(`/loan/return/${id}`);
      fetchLoans();
    } catch (error) {
      console.error("Erro ao realizar devolução:", error);
      alert("Erro ao devolver o livro.");
    }
  };

  const filteredData = Array.isArray(allLoanData)
    ? allLoanData.filter((loan) => {
        // If the loan is returned, we might want to hide it or show it in a specific place.
        // For now, keeping your original logic based on 'pendent'.
        if (activeTab === "no-prazo") {
          return loan.pendent === false;
        } else {
          // activeTab === 'pendentes' (Overdue/Late)
          return loan.pendent === true;
        }
      })
    : [];

  return (
    <main className="flex w-full h-screen bg-main text-white">
      <Sidebar selected="2" />
      <div className="flex flex-col w-full h-screen">
        <header className="flex w-full h-[15%] items-end justify-between px-10">
          <h1 className="text-5xl">Histórico</h1>
          <input
            className="flex bg-[#191919] w-[30%] h-[40%] rounded-2xl p-4 text-xl focus: outline-none"
            placeholder="Procure por um livro"
          />
        </header>

        <div className="flex w-full h-[15%] items-end justify-center gap-[10%]">
          <div
            className={`pt-4 pb-1 rounded-sm cursor-pointer ${activeTab === "no-prazo" ? "border-b-lend-bar border-b-4" : "border-b-transparent border-b-4"}`}
            onClick={() => setActiveTab("no-prazo")}
          >
            <h1 className="text-4xl">No prazo</h1>
          </div>
          <div
            className={`flex pt-4 pb-1 rounded-sm cursor-pointer ${activeTab === "pendentes" ? "border-b-pend-bar border-b-4" : "border-b-transparent border-b-4"}`}
            onClick={() => setActiveTab("pendentes")}
          >
            <h1 className="text-4xl">Pendentes</h1>
          </div>
        </div>

        <div className="flex flex-col w-full h-[70%] items-center overflow-y-auto pt-4">
          {filteredData.map((loan) => {
            // UPDATED: Uses student_name from your payload, with fallbacks just in case
            const nameToDisplay =
              loan.student_name ||
              loan.full_name ||
              loan.student_full_name ||
              "Aluno desconhecido";

            return (
              <div
                key={loan.id}
                className="flex w-full min-h-[15%] justify-center p-4 gap-8"
              >
                <div
                  className={`flex w-[70%] h-full items-center px-[5%] bg-gradient-to-r ${loan.pendent ? "from-pend-bar" : "from-lend-bar"} from-[5%] to-5% to-white rounded-full`}
                >
                  <h1 className="text-black text-xl">
                    {loan.book_name} | {nameToDisplay}
                  </h1>
                </div>

                {/* Shows check button if it is late (pendent) OR if you want to allow returning 'no-prazo' items too, remove the condition.
                    Currently logic: Only shows button if pendent is TRUE.
                    If you want to return 'No prazo' books, remove the {loan.pendent && ...} wrapper. */}
                {loan.pendent && (
                  <button
                    onClick={() => handleReturn(loan.id)}
                    className="flex items-center justify-center border-none rounded-full bg-white h-full w-[4%] text-green-600 hover:text-green-800 transition-colors"
                  >
                    <FaCheck size={24} />
                  </button>
                )}

                {/* OPTIONAL: If you want to be able to return "No prazo" books too,
                    you can add an 'else' block or change the logic above.
                    For now, I kept it as requested previously. */}
                {!loan.pendent && !loan.returned && (
                  <button
                    onClick={() => handleReturn(loan.id)}
                    className="flex items-center justify-center border-none rounded-full bg-white h-full w-[4%] text-blue-600 hover:text-blue-800 transition-colors"
                    title="Devolver (No Prazo)"
                  >
                    <FaCheck size={24} />
                  </button>
                )}
              </div>
            );
          })}

          {filteredData.length === 0 && (
            <div className="text-gray-500 mt-10">
              Nenhum empréstimo encontrado nesta aba.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default History;
