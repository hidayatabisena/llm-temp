import React from 'react';

const InfoCard: React.FC = () => {
  return (
    <div className="bg-[#F1EFEB] rounded-xl p-6">
          <p className="text-sm text-gray-600 leading-relaxed">
              Visualisasi ini nunjukin probabilitas dari 10 token berikutnya yang paling mungkin muncul berdasarkan prompt yang dipilih. Kamu juga bisa lihat gimana probabilitasnya berubah saat parameter <strong>temperature</strong> dan <strong>top-k</strong> diatur. Data yang ditampilkan berasal dari model <strong>meta-llama/Meta-Llama-3-8B</strong>, tapi untuk saat ini masih statis cuma buat demo aja.
          </p>
    </div>
  );
};

export default InfoCard;