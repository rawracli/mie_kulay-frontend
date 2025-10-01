import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { formatShort } from "../priceFormat";

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
        {formatShort(value)}
      </text>
    </g>
  );
};

export default function FavoriteMenuChart() {
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  // dummy sebagai state awal
  const initialDummy = [
    { kategori_hidangan: "Minuman", nama_hidangan: "Es Kopi Susu", jumlah: 120 },
    { kategori_hidangan: "Minuman", nama_hidangan: "Teh Tarik", jumlah: 80 },
    { kategori_hidangan: "Makanan", nama_hidangan: "Nasi Goreng", jumlah: 150 },
    { kategori_hidangan: "Makanan", nama_hidangan: "Mie Ayam", jumlah: 90 },
    { kategori_hidangan: "Snack", nama_hidangan: "Roti Bakar", jumlah: 40 },
  ];

  const [data, setData] = useState(initialDummy);
  const unique = Array.from(new Set(initialDummy.map((i) => i.kategori_hidangan)));
  const [categories, setCategories] = useState(["All", ...unique]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let mounted = true;
    fetch(`${import.meta.env.VITE_API_URL}/favorite-menu`)
      .then((res) => res.json())
      .then((res) => {
        if (!mounted) return;
        if (Array.isArray(res) && res.length > 0) {
          setData(res);
          const uniq = Array.from(new Set(res.map((i) => i.kategori_hidangan)));
          setCategories(["All", ...uniq]);
          setSelectedCategory("All");
        }
        // kalau API kosong -> jangan ubah state, tetap pakai dummy awal
      })
      .catch((err) => {
        // keep dummy in initial state
        console.error("FavoriteMenuChart fetch failed, using initial dummy:", err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredData = (selectedCategory === "All"
    ? data
    : data.filter((item) => item.kategori_hidangan === selectedCategory)
  ).map((item) => ({ name: item.nama_hidangan, value: item.jumlah }));

  return (
    <div className="rounded-lg w-full md:mt-[25px]">
      <div className="flex justify-between items-center px-[13px] max-sm:px-[13px] pb-[11px] max-sm:pb-[5px] md:pt-[8px] lg:pt-[6px] max-sm:pt-[35px]">
        <h2 className="text-[14px] max-sm:text-[9px] font-semibold">Menu Favorite</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-2 rounded max-sm:px-1 max-sm:text-[9px] text-[14px] lg:text-base max-sm:h-[25px]"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <hr className="text-gray-400 w-[95%]" />
      <div className="flex items-center justify-center">
        <PieChart width={300} height={isTablet ? (isMobile ? 219 : 185) : 219}>
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
