import { useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#FF4C4C", "#4C8CFF", "#FFB84C", "#4CAF50"];

const dataMakanan = [
  { name: "Mie pedas manis", value: 50 },
  { name: "Mie pedas gurih", value: 30 },
  { name: "Mie original", value: 20 },
];

const dataTopping = [
  { name: "Telur", value: 40 },
  { name: "Keju", value: 30 },
  { name: "Sosis", value: 20 },
  { name: "Bakso", value: 10 },
];

const dataMinuman = [
  { name: "Es Teh", value: 35 },
  { name: "Jus Jeruk", value: 25 },
  { name: "Kopi", value: 40 },
];

export default function FavoriteMenuChart() {
  const [menu, setMenu] = useState("Makanan");

  const getData = () => {
    if (menu === "Makanan") return dataMakanan;
    if (menu === "Topping") return dataTopping;
    if (menu === "Minuman") return dataMinuman;
    return [];
  };

  return (
    <div className="rounded-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold mt-3">Menu Favorite</h2>
        <select value={menu} onChange={(e) => setMenu(e.target.value)} className="border p-1 mt-2 rounded">
          <option value="Makanan">Makanan</option>
          <option value="Topping">Topping</option>
          <option value="Minuman">Minuman</option>
        </select>
      </div>
      <hr className="text-gray-400" />
      <div className="flex justify-center items-center">
        <PieChart width={500} height={300}>
          <Pie
            data={getData()}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="value"
            label={({ name }) => name}
          >
            {getData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
