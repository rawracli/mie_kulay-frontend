import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export default function MonthlyOrdersChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/monthly-orders`)
      .then((res) => {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Ags",
          "Sep",
          "Okt",
          "Nov",
          "Des",
        ];

        // Template semua bulan dengan default 0
        const template = months.map((month) => ({ month, orders: 0 }));

        // Merge data API
        res.data.forEach((item) => {
          const index = template.findIndex((t) => t.month === item.month);
          if (index !== -1) template[index].orders = item.orders;
        });

        setData(template);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full h-full">
      <h2 className="text-[14px] font-semibold pt-[6px] pl-[19px] pb-[9px]">
        Order bulanan
      </h2>
      <hr className="text-[#959595] mx-[8px]" />
      <ResponsiveContainer width="100%" height={319}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, bottom: 10 }}
        >
          <CartesianGrid
            stroke="#959595"
            strokeDasharray={8}
            horizontal={false}
          />
          <XAxis type="number" />
          <YAxis
            type="category"
            tick={{ fontSize: 10 }}
            dataKey="month"
            width={40}
          />
          <Tooltip />
          <Bar dataKey="orders" fill="#FFB300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
