"use client";

import React, { useState, useEffect } from "react";
import axios from "../services/axios";
import Sidebar from "../components/Sidebar";
import BookCard from "../components/BookCard";

const Collection = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0); // State to trigger re-fetches

  // Fetch books on load or when refreshTrigger changes
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/book");
        setBooks(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };
    fetchBooks();
  }, [refreshTrigger]);

  const handleBookUpdate = () => {
    // Increment trigger to reload the list
    setRefreshTrigger((prev) => prev + 1);
  };

  const filteredBooks = books.filter((book) => {
    const term = searchTerm.toLowerCase();
    const titleMatch = book.title?.toLowerCase().includes(term);
    const authorMatch = book.author?.toLowerCase().includes(term);
    return titleMatch || authorMatch;
  });

  return (
    <main className="flex w-full h-screen">
      <Sidebar selected="4" />
      <div className="flex flex-col w-full h-screen bg-main text-white">
        <header className="flex w-full h-[15%] items-end justify-between px-10 pb-4">
          <h1 className="text-5xl font-bold">Acervo</h1>
          <input
            className="flex bg-[#191919] w-[30%] h-[60%] rounded-2xl p-4 text-xl focus:outline-none placeholder-gray-500"
            placeholder="Procure por Título ou Autor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </header>

        <div className="flex-1 w-full overflow-y-auto p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 pb-10">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} onUpdate={handleBookUpdate} />
            ))}
          </div>

          {filteredBooks.length === 0 && books.length > 0 && (
            <div className="flex w-full justify-center mt-20">
              <p className="text-2xl text-gray-400">
                Nenhum livro corresponde à sua busca.
              </p>
            </div>
          )}

          {books.length === 0 && (
            <div className="flex w-full justify-center mt-20">
              <p className="text-2xl text-gray-400">Carregando acervo...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Collection;
