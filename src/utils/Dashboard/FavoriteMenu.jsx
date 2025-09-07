import { Scale } from "chart.js";
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

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  name,
  value,
}) => {
  const radialOffset = 15; // Distance to extend radially for the line
  const horizontalOffset = 20; // Horizontal distance for the label

  // Calculate direction
  const cos = Math.cos(-midAngle * RADIAN);
  const sin = Math.sin(-midAngle * RADIAN);
  const side = cos >= 0 ? 1 : -1; // Right or left side

  // Point at the edge of the pie slice
  const startX = cx + outerRadius * cos;
  const startY = cy + outerRadius * sin;

  // Intermediate point (radial extension)
  const intX = cx + (outerRadius + radialOffset) * cos;
  const intY = cy + (outerRadius + radialOffset) * sin;

  // Label point (horizontal extension)
  const labelX = intX + side * horizontalOffset;
  const labelY = intY;

  // Inner value label position
  const innerLabelRadius = outerRadius * 0.5;
  const innerX = cx + innerLabelRadius * cos;
  const innerY = cy + innerLabelRadius * sin;

  // Split the name into words for wrapping
  const words = name.split(" ");
  const lineHeight = 14; // Adjust line height as needed
  const maxWordsPerLine = 2; // Group words into lines
  const lines = [];
  for (let i = 0; i < words.length; i += maxWordsPerLine) {
    lines.push(words.slice(i, i + maxWordsPerLine).join(" "));
  }

  // Calculate vertical offset for multi-line text centering
  const textOffset = ((lines.length - 1) * lineHeight) / 2;

  console.log(startX, startY, intX, intY, labelX, labelY);
  return (
    <g>
      {/* Custom label line */}
      <polyline
        className="custom-label-line"
        points={`${startX},${startY} ${intX},${intY} ${labelX},${labelY}`}
        fill="none"
        stroke="red"
        strokeWidth={2}
      />
      {/* Outside name label */}
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
      {/* Inside value label */}
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
  const [menu, setMenu] = useState("Makanan");

  const getData = () => {
    if (menu === "Makanan") return dataMakanan;
    if (menu === "Topping") return dataTopping;
    if (menu === "Minuman") return dataMinuman;
    return [];
  };

  return (
    <div className="rounded-lg w-full">
      <div className="flex justify-between items-center px-[13px] pb-[11px] pt-[6px]">
        <h2 className="text-[14px] font-semibold">Menu Favorite</h2>
        <select
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
          className="border px-2 rounded"
        >
          <option value="Makanan">Makanan</option>
          <option value="Topping">Topping</option>
          <option value="Minuman">Minuman</option>
        </select>
      </div>
      <hr className="text-gray-400 w-[95%] mx-auto" />
      <div className="flex justify-center items-center">
        <PieChart width={300} height={219}>
          <Pie
            data={getData()}
            cx="50%"
            cy="50%"
            outerRadius={60}
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {getData().map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
