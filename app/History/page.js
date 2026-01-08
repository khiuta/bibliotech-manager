'use client'

import React, { useState, useEffect } from 'react'
import { MdAssignmentReturn } from "react-icons/md";

import axios from '../services/axios';
import Sidebar from '../components/Sidebar'

const History = () => {
  const [allLoanData, setAllLoanData] = useState([]);
  const [activeTab, setActiveTab] = useState('no-prazo'); 

  const fetchLoans = async () => {
    try {
      const response = await axios.get('/loan');
      
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

  const filteredData = Array.isArray(allLoanData) ? allLoanData.filter(loan => {
    if (loan.returned === true) return false;

    if (activeTab === 'no-prazo') {
      return loan.pendent === false;
    } else { 
      return loan.pendent === true;
    }
  }) : [];

  return (
    <main className='flex w-full h-screen bg-main text-white'>
      <Sidebar selected='2' />
      <div className='flex flex-col w-full h-screen'>
        <header className='flex w-full h-[15%] items-end justify-between px-10'>
          <h1 className='text-5xl'>Histórico</h1>
          <input className='flex bg-[#191919] w-[30%] h-[40%] rounded-2xl p-4 text-xl focus: outline-none' placeholder='Procure por um livro' />
        </header>

        <div className='flex w-full h-[15%] items-end justify-center gap-[10%]'>
          <div 
            className={`pt-4 pb-1 rounded-sm cursor-pointer ${activeTab === 'no-prazo' ? 'border-b-lend-bar border-b-4' : 'border-b-transparent border-b-4'}`}
            onClick={() => setActiveTab('no-prazo')}
          >
            <h1 className='text-4xl'>No prazo</h1>
          </div>
          <div 
            className={`flex pt-4 pb-1 rounded-sm cursor-pointer ${activeTab === 'pendentes' ? 'border-b-pend-bar border-b-4' : 'border-b-transparent border-b-4'}`}
            onClick={() => setActiveTab('pendentes')}
          >
            <h1 className='text-4xl'>Pendentes</h1>
          </div>
        </div>
        
        <div className='flex flex-col w-full h-[70%] items-center overflow-y-auto pt-4'>
          {filteredData.map((loan) => {
            const nameToDisplay = loan.student_name || loan.full_name || loan.student_full_name || "Aluno desconhecido";
            
            return (
              <div key={loan.id} className='flex w-full min-h-[15%] justify-center p-4 gap-8'>
                
                <div className={`flex w-[70%] h-full items-center px-[5%] bg-gradient-to-r ${loan.pendent ? 'from-pend-bar' : 'from-lend-bar'} from-[5%] to-5% to-white rounded-full`}>
                  <h1 className='text-black text-xl'>{loan.book_name} | {nameToDisplay}</h1>
                </div>
                
                <button 
                  onClick={() => handleReturn(loan.id)}
                  className='flex items-center justify-center border-none rounded-full bg-white h-full w-[5%] text-[#2B2B2B] hover:bg-gray-200 transition-colors'
                  title="Devolver livro"
                >
                  <MdAssignmentReturn size={30} />
                </button>

              </div>
            );
          })}
          
          {filteredData.length === 0 && (
            <div className="text-gray-500 mt-10 text-xl">
              Nenhum empréstimo {activeTab === 'pendentes' ? 'pendente' : 'ativo'} encontrado.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default History