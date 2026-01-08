"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { LuPencil, LuTrash } from "react-icons/lu";
import toast from "react-hot-toast";
import axios from "../services/axios";

const MINIO_BASE_URL = "http://localhost:9000/bibliotech-minio-storage/";

const BookCard = ({ book, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    book.image_key
      ? `${MINIO_BASE_URL}${book.image_key}`
      : "https://placehold.co/400x600?text=Livro",
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [editData, setEditData] = useState({ ...book });
  const [deleteQuantity, setDeleteQuantity] = useState("");

  const handleEditClick = (e) => {
    e.stopPropagation();
    setEditData({ ...book });
    setShowEditModal(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setDeleteQuantity("");
    setShowDeleteModal(true);
    setShowDeleteConfirmation(false);
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setDeleteQuantity(book.quantity);
    } else {
      setDeleteQuantity("");
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`/book/${book.id}`, editData);
      toast.success("Livro atualizado com sucesso!");
      setShowEditModal(false);
      onUpdate();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar livro.");
    }
  };

  const handleDeleteSubmit = async () => {
    const qtyToRemove = parseInt(deleteQuantity);

    if (!qtyToRemove || qtyToRemove <= 0) {
      toast.error("Insira uma quantidade válida.");
      return;
    }

    if (qtyToRemove > book.quantity) {
      toast.error("Quantidade a remover maior que o estoque.");
      return;
    }

    try {
      if (qtyToRemove === book.quantity) {
        await axios.delete(`/book/${book.id}`);
        toast.success("Livro removido do acervo!");
      } else {
        const newQuantity = book.quantity - qtyToRemove;
        await axios.put(`/book/${book.id}`, { ...book, quantity: newQuantity });
        toast.success(`${qtyToRemove} cópias removidas.`);
      }

      setShowDeleteModal(false);
      setShowDeleteConfirmation(false);
      onUpdate();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao remover cópias.");
    }
  };

  return (
    <>
      {/* --- main card --- */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer
          transition-all duration-300 ease-in-out
          border-4 border-[#05704F]
          ${isExpanded ? "scale-105 z-10" : "hover:scale-105 h-[450px]"}
        `}
      >
        {/* image area */}
        <div
          className={`w-full bg-gray-200 flex items-center justify-center overflow-hidden ${isExpanded ? "h-[250px]" : "h-[85%]"}`}
        >
          <img
            src={imgSrc}
            alt={book.title}
            onError={() => setImgSrc("https://placehold.co/400x600?text=Livro")}
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* content area */}
        <div className="flex flex-col p-4 gap-2 text-black w-full bg-white h-auto min-h-[15%] justify-center relative">
          <h2 className="text-xl font-bold leading-tight text-center">
            {book.title}
          </h2>

          {isExpanded && (
            <div className="flex flex-col gap-1 text-sm text-gray-700 mt-2 animate-fadeIn pb-10">
              <p>
                <span className="font-bold text-black">Autor:</span>{" "}
                {book.author}
              </p>
              <p>
                <span className="font-bold text-black">Volume:</span>{" "}
                {book.volume}
              </p>
              <p>
                <span className="font-bold text-black">Edição:</span>{" "}
                {book.edition}
              </p>
              <p>
                <span className="font-bold text-black">Editora:</span>{" "}
                {book.publisher}
              </p>
              <p>
                <span className="font-bold text-black">Ano:</span>{" "}
                {book.release_year}
              </p>
              <p>
                <span className="font-bold text-black">Quantidade:</span>{" "}
                {book.quantity}
              </p>
            </div>
          )}

          {/* action icons */}
          {isExpanded && (
            <div className="absolute bottom-4 left-0 w-full flex justify-center gap-6 mt-4 z-20">
              <button
                onClick={handleEditClick}
                className="flex items-center justify-center w-10 h-10 bg-[#05704F] rounded-full shadow-lg hover:brightness-110 transition-all border-none"
              >
                <LuPencil className="text-white w-5 h-5" />
              </button>

              <button
                onClick={handleDeleteClick}
                className="flex items-center justify-center w-10 h-10 bg-[#b50e0e] rounded-full shadow-lg hover:brightness-110 transition-all border-none"
              >
                <LuTrash className="text-white w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- edit modal --- */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="bg-[#2B2B2B] text-white p-8 rounded-3xl w-[500px] shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2 text-center">
              Editar Livro
            </h2>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 ml-1">Título</label>
              <input
                className="bg-[#191919] p-3 rounded-xl focus:outline-none"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                placeholder="Título"
              />
            </div>
            {/* other edit inputs remain the same as it was */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 ml-1">Autor</label>
              <input
                className="bg-[#191919] p-3 rounded-xl focus:outline-none"
                value={editData.author}
                onChange={(e) =>
                  setEditData({ ...editData, author: e.target.value })
                }
                placeholder="Autor"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-sm text-gray-400 ml-1">Volume</label>
                <input
                  className="bg-[#191919] p-3 rounded-xl focus:outline-none"
                  value={editData.volume}
                  onChange={(e) =>
                    setEditData({ ...editData, volume: e.target.value })
                  }
                  placeholder="Vol"
                />
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-sm text-gray-400 ml-1">Edição</label>
                <input
                  className="bg-[#191919] p-3 rounded-xl focus:outline-none"
                  value={editData.edition}
                  onChange={(e) =>
                    setEditData({ ...editData, edition: e.target.value })
                  }
                  placeholder="Ed"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 ml-1">Editora</label>
              <input
                className="bg-[#191919] p-3 rounded-xl focus:outline-none"
                value={editData.publisher}
                onChange={(e) =>
                  setEditData({ ...editData, publisher: e.target.value })
                }
                placeholder="Editora"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-sm text-gray-400 ml-1">Ano</label>
                <input
                  className="bg-[#191919] p-3 rounded-xl focus:outline-none"
                  value={editData.release_year}
                  onChange={(e) =>
                    setEditData({ ...editData, release_year: e.target.value })
                  }
                  placeholder="Ano"
                />
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-sm text-gray-400 ml-1">Quantidade</label>
                <input
                  type="number"
                  className="bg-[#191919] p-3 rounded-xl focus:outline-none"
                  value={editData.quantity}
                  onChange={(e) =>
                    setEditData({ ...editData, quantity: e.target.value })
                  }
                  placeholder="Qtd"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-3 bg-gray-600 rounded-xl hover:bg-gray-500 transition-colors font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditSubmit}
                className="flex-1 py-3 bg-green-600 rounded-xl hover:bg-green-500 transition-colors font-bold"
              >
                Atualizar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- delete/remove modal --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="bg-[#2B2B2B] text-white p-8 rounded-3xl w-[400px] shadow-2xl flex flex-col gap-6">
            {!showDeleteConfirmation ? (
              <>
                <h2 className="text-2xl font-bold text-center">
                  Remover Cópias
                </h2>

                <div className="flex flex-col items-center gap-2">
                  <label className="text-sm text-gray-400">
                    Cópias a remover
                  </label>

                  <input
                    type="number"
                    className="w-24 bg-[#191919] p-3 rounded-xl focus:outline-none text-center text-xl"
                    value={deleteQuantity}
                    onChange={(e) => setDeleteQuantity(e.target.value)}
                    placeholder="0"
                  />

                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id={`remove-all-${book.id}`}
                      className="w-5 h-5 accent-[#b50e0e] cursor-pointer"
                      checked={parseInt(deleteQuantity) === book.quantity}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor={`remove-all-${book.id}`}
                      className="text-sm cursor-pointer select-none text-gray-300"
                    >
                      Remover todos
                    </label>
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    Total disponível: {book.quantity}
                  </p>
                </div>

                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 py-3 bg-gray-600 rounded-xl hover:bg-gray-500 transition-colors font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirmation(true)}
                    className="flex-1 py-3 bg-[#b50e0e] rounded-xl hover:bg-red-700 transition-colors font-bold"
                  >
                    Remover
                  </button>
                </div>
              </>
            ) : (
              // confirmation step
              <>
                <h2 className="text-xl font-bold text-center">Confirmação</h2>
                <p className="text-center text-gray-300 text-lg">
                  Você quer remover{" "}
                  <span className="text-white font-bold">{deleteQuantity}</span>{" "}
                  cópias de <br />
                  <span className="text-white font-bold">"{book.title}"</span>?
                </p>

                {parseInt(deleteQuantity) === book.quantity && (
                  <p className="text-red-400 text-sm text-center font-bold">
                    ⚠️ Isso excluirá o livro permanentemente.
                  </p>
                )}

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => setShowDeleteConfirmation(false)}
                    className="flex-1 py-3 bg-gray-600 rounded-xl hover:bg-gray-500 transition-colors font-bold"
                  >
                    Não
                  </button>
                  <button
                    onClick={handleDeleteSubmit}
                    className="flex-1 py-3 bg-[#b50e0e] rounded-xl hover:bg-red-700 transition-colors font-bold"
                  >
                    Sim
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
};

export default BookCard;
