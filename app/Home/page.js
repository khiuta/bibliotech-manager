import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

import Sidebar from '../components/Sidebar'
import axios from '../services/axios';

const Home = async () => {
  let bookData = (await axios.get('/book')).data;
  let loanData = (await axios.get('/loan')).data;
  let bookQtt = 0;
  let loanQtt = loanData.length;
  let pendQtt = 0;

  bookData.forEach(book => {
    bookQtt += book.quantity;
  });
  loanData.forEach(lend => {
    if(lend.pendent == true) pendQtt++;
  });

  return (
    <main className="bg-main flex w-screen">
      <Sidebar selected="1" />
      <div className='flex flex-col w-full h-screen'>
        <header className='flex w-full h-[15%] items-end px-10 '>
          <h1 className='text-5xl'>Biblioteca</h1>
        </header>
        <div className='flex items-center justify-around w-full h-[40%] '>
          <section className='flex flex-col w-[20%] h-[80%] bg-white text-black text-center py-10 gap-2 rounded-3xl'>
            <h1 className='text-3xl font-bold'>Total de livros</h1>
            <p className='text-[700%] font-bold'>{bookQtt}</p>
          </section>
          <section className='flex flex-col w-[20%] h-[80%] bg-[#36383E] text-white text-center py-10 gap-2 rounded-3xl'>
            <h1 className='text-3xl font-bold'>Emprestados</h1>
            <p className='text-[700%] font-bold'>{loanQtt}</p>
          </section>
          <section className='flex flex-col w-[20%] h-[80%] bg-green-main text-white text-center py-10 gap-2 rounded-3xl'>
            <h1 className='text-3xl font-bold'>Pendentes</h1>
            <p className='text-[700%] font-bold'>{pendQtt}</p>
          </section>
        </div>
        <div className='flex w-full h-[45%]  p-10 justify-center'>
          <div className='flex flex-col bg-[#2B2B2B] w-[90%] rounded-2xl'>
            <section className='flex w-full h-[35%]  items-end justify-around p-6'>
              <input className='flex bg-[#191919] w-[80%] h-[100%] rounded-2xl p-4 text-xl focus: outline-none' placeholder='Digite suas anotações aqui...' />
              <div className='flex h-[100%] bg-[#191919] p-4 rounded-2xl items-center'><IoIosAddCircleOutline size={40} /></div>
            </section>
            <section className='flex w-full h-[65%] p-4 justify-around'>
            <div className='flex bg-[#191919] w-[80%] h-[30%] rounded-2xl p-4 text-xl focus: outline-none'>

            </div>
            <button className='flex border-none rounded-full w-[4%] h-[30%] bg-[#191919]' />
            <button className='flex border-none rounded-full w-[4%] h-[30%] bg-[#191919] items-center justify-center'>
              <FaRegTrashAlt size={30} />
            </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home