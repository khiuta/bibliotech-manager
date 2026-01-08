"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "../services/axios";

const LendingForm = () => {
  const initialData = {
    book_name: "",
    book_author: "",
    book_publisher: "",
    student_name: "",
    student_matricula: "",
  };

  const [lendData, setLendData] = useState(initialData);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLendData({ ...lendData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/loan", lendData);
      setLendData(initialData);
      toast.success("Livro emprestado!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Erro ao emprestar livro.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[45%] max-w-[600px] bg-[#2B2B2B] rounded-3xl p-8 gap-5 shadow-xl"
    >
      <h2 className="text-3xl font-bold text-center text-white mb-2">
        Novo Empréstimo
      </h2>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-gray-200 ml-2">
          Título do Livro
        </label>
        <input
          name="book_name"
          value={lendData.book_name}
          onChange={handleChange}
          className="bg-[#191919] text-white w-full h-12 rounded-xl px-4 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Ex: O Senhor dos Anéis"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-gray-200 ml-2">Autor</label>
        <input
          name="book_author"
          value={lendData.book_author}
          onChange={handleChange}
          className="bg-[#191919] text-white w-full h-12 rounded-xl px-4 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Ex: J.R.R. Tolkien"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-gray-200 ml-2">
          Editora
        </label>
        <input
          name="book_publisher"
          value={lendData.book_publisher}
          onChange={handleChange}
          className="bg-[#191919] text-white w-full h-12 rounded-xl px-4 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Ex: HarperCollins"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-[65%]">
          <label className="text-lg font-medium text-gray-200 ml-2">
            Aluno
          </label>
          <input
            name="student_name"
            value={lendData.student_name}
            onChange={handleChange}
            className="bg-[#191919] text-white w-full h-12 rounded-xl px-4 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Nome do aluno"
          />
        </div>
        <div className="flex flex-col gap-2 w-[35%]">
          <label className="text-lg font-medium text-gray-200 ml-2">
            Matrícula
          </label>
          <input
            name="student_matricula"
            value={lendData.student_matricula}
            onChange={handleChange}
            className="bg-[#191919] text-white w-full h-12 rounded-xl px-4 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="0000"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full h-14 text-xl font-bold text-black bg-white rounded-xl hover:bg-gray-200 transition-colors shadow-lg"
      >
        Confirmar Empréstimo
      </button>
    </form>
  );
};

export default LendingForm;
