import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[500px]">
        <h2 className="text-xl font-semibold mb-4">Detail Transaksi</h2>
        <p>ID Transaksi: {id}</p>

        {/* Tambahin informasi detail sesuai kebutuhan */}

        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}

export default Detail;
