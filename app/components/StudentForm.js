"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "../services/axios";

const StudentForm = () => {
  const initialData = {
    matricula: "",
    full_name: "", // Changed from 'name'
    course: "",
    period: "", // Changed from 'semester'
    can_borrow: "true",
  };

  const [studentData, setStudentData] = useState(initialData);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the payload with the correct types
      const payload = {
        matricula: studentData.matricula,
        full_name: studentData.full_name,
        course: studentData.course,
        period: parseInt(studentData.period) || 1, // Ensure integer for period
        can_borrow: studentData.can_borrow === "true", // Ensure boolean
      };

      await axios.post("/student", payload);
      setStudentData(initialData);
      toast.success("Aluno cadastrado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Erro ao cadastrar aluno.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[45%] max-w-[600px] bg-[#2B2B2B] rounded-3xl p-8 gap-5 shadow-xl"
    >
      <h2 className="text-3xl font-bold text-center text-white mb-2">
        Cadastrar Aluno
      </h2>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-gray-200 ml-2">
          Nome Completo
        </label>
        <input
          name="full_name" // Updated name attribute
          value={studentData.full_name}
          onChange={handleChange}
          className="bg-[#191919] text-white w-full h-12 rounded-xl px-4 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Nome do aluno"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-[60%]">
          <label className="text-lg font-medium text-gray-200 ml-2">
            Curso
          </label>
          <input
            name="course"
            value={studentData.course}
            onChange={handleChange}
            className="bg-[#191919] text-white w-full h-12 rounded-xl px-4 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Ex: Engenharia"
          />
        </div>
        <div className="flex flex-col gap-2 w-[40%]">
          <label className="text-lg font-medium text-gray-200 ml-2">
            Matrícula
          </label>
          <input
            name="matricula"
            value={studentData.matricula}
            onChange={handleChange}
            className="bg-[#191919] text-white w-full h-12 rounded-xl px-4 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="0000"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-[50%]">
          <label className="text-lg font-medium text-gray-200 ml-2">
            Período
          </label>
          <input
            name="period" // Updated name attribute
            type="number"
            value={studentData.period}
            onChange={handleChange}
            className="bg-[#191919] text-white w-full h-12 rounded-xl px-4 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="1"
          />
        </div>
        <div className="flex flex-col gap-2 w-[50%]">
          <label className="text-lg font-medium text-gray-200 ml-2">
            Pode Emprestar?
          </label>
          <select
            name="can_borrow"
            value={studentData.can_borrow}
            onChange={handleChange}
            className="bg-[#191919] text-white w-full h-12 rounded-xl px-4 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full h-14 text-xl font-bold text-black bg-white rounded-xl hover:bg-gray-200 transition-colors shadow-lg"
      >
        Cadastrar Aluno
      </button>
    </form>
  );
};

export default StudentForm;
