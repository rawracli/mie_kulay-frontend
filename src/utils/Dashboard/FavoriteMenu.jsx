import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#FF4C4C", "#4C8CFF", "#FFB84C", "#4CAF50"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  name,
  value,
}) => {
  const cos = Math.cos(-midAngle * RADIAN);
  const sin = Math.sin(-midAngle * RADIAN);
  const side = cos >= 0 ? 1 : -1;

  const startX = cx + outerRadius * cos;
  const startY = cy + outerRadius * sin;
  const intX = cx + (outerRadius + 15) * cos;
  const intY = cy + (outerRadius + 15) * sin;
  const labelX = intX + side * 20;
  const labelY = intY;
  const innerX = cx + outerRadius * 0.5 * cos;
  const innerY = cy + outerRadius * 0.5 * sin;

  const words = name.split(" ");
  const lineHeight = 14;
  const maxWordsPerLine = 2;
  const lines = [];
  for (let i = 0; i < words.length; i += maxWordsPerLine) {
    lines.push(words.slice(i, i + maxWordsPerLine).join(" "));
  }
  const textOffset = ((lines.length - 1) * lineHeight) / 2;

  return (
    <g>
      <polyline
        points={`${startX},${startY} ${intX},${intY} ${labelX},${labelY}`}
        fill="none"
        stroke="red"
        strokeWidth={2}
      />
      <text
        x={labelX}
        y={labelY}
        fill="black"
        textAnchor={side > 0 ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {lines.map((line, index) => (
          <tspan
            key={index}
            x={labelX}
            dy={index === 0 ? -textOffset : lineHeight}
          >
            {line}
          </tspan>
        ))}
      </text>
      <text
        x={innerX}
        y={innerY}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {value}
      </text>
    </g>
  );
};

export default function FavoriteMenuChart() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/favorite-menu`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);

        // Ambil kategori unik untuk dropdown
        const uniqueCategories = [
          ...new Set(res.map((item) => item.kategori_hidangan)),
        ];
        setCategories(uniqueCategories);
        setSelectedCategory(uniqueCategories[0] || "");
      });
  }, []);

  // Filter data sesuai kategori terpilih
  const filteredData = data
    .filter((item) => item.kategori_hidangan === selectedCategory)
    .map((item) => ({ name: item.nama_hidangan, value: item.jumlah }));

  return (
    <div className="rounded-lg w-full max-sm:w-[199px]">
      <div className="flex justify-between items-center px-[13px] max-sm:px-[13px] pb-[11px] max-sm:pb-[5px] pt-[6px] max-sm:pt-[80px]">
        <h2 className="text-[14px] max-sm:text-[9px] font-semibold">Menu Favorite</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-2 rounded"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <hr className="text-gray-400 w-[95%] mx-auto" />
      <div className="flex justify-center items-center">
        <PieChart width={300} height={219}>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            outerRadius={60}
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {filteredData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
