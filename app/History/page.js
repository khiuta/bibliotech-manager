'use client'

import React, { useState, useEffect } from 'react'

// Estou assumindo que estes caminhos estão corretos para sua estrutura de pastas
import axios from '../services/axios';
import Sidebar from '../components/Sidebar'

const History = () => {
  // Estado para a lista COMPLETA de empréstimos
  const [allLoanData, setAllLoanData] = useState([]);
  
  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState('no-prazo'); // 'no-prazo' ou 'pendentes'

  // Etapa 1: Buscar os dados DEPOIS que o componente carregar
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Você está correto: 1 única requisição
        const response = await axios.get('/loan');
        setAllLoanData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados dos empréstimos:", error);
      }
    };

    fetchData();
  }, []); // O array vazio [] faz o useEffect rodar apenas uma vez

  // Etapa 2: Filtrar os dados com base na aba ativa
  const filteredData = allLoanData.filter(loan => {
    if (activeTab === 'no-prazo') {
      return loan.pendent === false;
    } else { // activeTab === 'pendentes'
      return loan.pendent === true;
    }
  });

  return (
    // Adicionei text-white para seus títulos aparecerem
    <main className='flex w-full h-screen bg-main text-white'>
      <Sidebar selected='2' />
      <div className='flex flex-col w-full h-screen'>
        <header className='flex w-full h-[15%] items-end justify-between px-10'>
          <h1 className='text-5xl'>Histórico</h1>
          <input className='flex bg-[#191919] w-[30%] h-[40%] rounded-2xl p-4 text-xl focus: outline-none' placeholder='Procure por um livro' />
        </header>

        {/* Etapa 3: Adicionar onClick e classes dinâmicas aos botões */}
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
        
        <div className='flex flex-col w-full h-[70%] items-center overflow-y-auto'>
          {/* Etapa 4: Mapear os dados FILTRADOS */}
          {filteredData.map((loan, index) => (
            <div key={index} className='flex w-full min-h-[15%] justify-center p-4 gap-8'>
              
              {/* Define a cor da borda com base na pendência */}
              <div className={`flex w-[70%] h-full items-center px-[5%] bg-gradient-to-r ${loan.pendent ? 'from-pend-bar' : 'from-lend-bar'} from-[5%] to-5% to-white rounded-full`}>
                <h1 className='text-black text-xl'>{loan.book_name} | {loan.student_name}</h1>
              </div>
              
              {/* Mostra o botão apenas se NÃO estiver pendente */}
              {!loan.pendent && (
                <button className='border-none rounded-full bg-white h-full w-[4%]' />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default History