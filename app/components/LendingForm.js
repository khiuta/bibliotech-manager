'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast'; // Você pode remover se não estiver usando

import axios from '../services/axios';

const LendingForm = () => {
  // Estado inicial atualizado para os novos campos
  const initialData = {
    book_name: '',
    book_author: '',
    book_publisher: '',
    student_name: '',
    student_matricula: '',
  };

  const [lendData, setLendData] = useState(initialData);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLendData({ ...lendData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envia o novo objeto 'lendData' para a API
      await axios.post('/loan', lendData);
      
      setLendData(initialData);
      toast.success('Livro emprestado!');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || 'Erro ao emprestar livro.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full h-[85%] p-6'>
      {/* Campos do formulário */}
      <label htmlFor='titulo' className='flex flex-col w-[50%] h-[15%] p-4 text-2xl'>
        <p>Título</p>
        <input 
          id='titulo' 
          className='flex text-black bg-white w-[80%] min-h-[60%] rounded-lg p-2 border-none focus:outline-none'
          value={lendData.book_name}
          name='book_name'
          onChange={handleChange}
        />
      </label>
      <label htmlFor='autor' className='flex flex-col w-[50%] h-[15%] p-4 text-2xl'>
        <p>Autor</p>
        <input 
          id='autor' 
          className='flex text-black bg-white w-[80%] min-h-[60%] rounded-lg p-2 border-none focus:outline-none'
          value={lendData.book_author}
          name='book_author'
          onChange={handleChange}
        />
      </label>
      <label htmlFor='editora' className='flex flex-col w-[50%] h-[15%] p-4 text-2xl'>
        <p>Editora</p>
        <input 
          id='editora' 
          className='flex text-black bg-white w-[80%] min-h-[60%] rounded-lg p-2 border-none focus:outline-none'
          value={lendData.book_publisher}
          name='book_publisher'
          onChange={handleChange}
        />
      </label>
      <label htmlFor='aluno' className='flex flex-col w-[50%] h-[15%] p-4 text-2xl'>
        <p>Aluno</p>
        <input 
          id='aluno' 
          className='flex text-black bg-white w-[80%] min-h-[60%] rounded-lg p-2 border-none focus:outline-none'
          value={lendData.student_name}
          name='student_name'
          onChange={handleChange}
        />
      </label>
      <label htmlFor='matricula' className='flex flex-col w-[50%] h-[15%] p-4 text-2xl'>
        <p>Matrícula</p>
        <input 
          id='matricula' 
          className='flex text-black bg-white w-[80%] min-h-[60%] rounded-lg p-2 border-none focus:outline-none'
          value={lendData.student_matricula}
          name='student_matricula'
          onChange={handleChange}
        />
      </label>
      
      {/* A DIV QUE CONTÉM AS DATAS FOI REMOVIDA DAQUI
      */}

      <footer className='flex w-[50%] h-[15%] items-center justify-center'>
        <button type='submit' className='text-2xl text-black border-none bg-white p-4 rounded-lg'>Emprestar</button>
      </footer>
    </form>
  )
}

export default LendingForm;