import React from 'react'
import axios from '../services/axios'
import Sidebar from '../components/Sidebar'
import BookCard from '../components/BookCard';

const Collection = async () => {
  let searchData = [];

  try {
    // Tenta buscar os dados da API
    // Se a API estiver offline (como no docker build), vai cair no catch
    const response = await axios.get('/book');
    searchData = response.data;
    console.log("Dados recebidos da API:", searchData);
  } catch (error) {
    // Apenas avisa no console, mas NÃO quebra o build
    console.error("Erro ao buscar livros na Collection (possível build time):", error.message);
    searchData = []; // Garante que searchData seja um array vazio e não undefined
  }

  // Função auxiliar antiga (pode ser removida se não for usada, mas mantive a lógica)
  // async function getData() { ... }

  return (
    <main className='flex w-full h-screen'>
      <Sidebar selected='4' />
      <div className='flex flex-col w-full h-screen bg-main'>
        <header className='flex w-full h-[15%] items-end justify-between px-10'>
          <h1 className='text-5xl'>Acervo</h1>
          <input className='flex bg-[#191919] w-[30%] h-[40%] rounded-2xl p-4 text-xl focus: outline-none' placeholder='Procure por um livro' />
        </header>
        <div className='flex flex-col w-full h-[85%] px-4 py-10 items-center gap-4'>
          {/* Verifica se searchData tem itens antes de renderizar */}
          {searchData && searchData.length > 0 ? (
            <BookCard books={searchData} />
          ) : (
            <p className="text-white mt-10">Nenhum livro encontrado ou erro de conexão.</p>
          )}
        </div>
      </div>
    </main>
  )
}

export default Collection