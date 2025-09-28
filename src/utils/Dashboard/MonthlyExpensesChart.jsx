import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
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
import { formatShort } from "../priceFormat";

export default function MonthlyExpensesChart() {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [data, setData] = useState([]);

  //! Dummy data
  useEffect(() => {
  const dummyExpenses = [
    { month: "Jan", pengeluaran: 8500000 },
    { month: "Feb", pengeluaran: 9200000 },
    { month: "Mar", pengeluaran: 11200000 },
    { month: "Apr", pengeluaran: 10500000 },
    { month: "Mei", pengeluaran: 12800000 },
    { month: "Jun", pengeluaran: 14200000 },
    { month: "Jul", pengeluaran: 15600000 },
    { month: "Ags", pengeluaran: 14800000 },
    { month: "Sep", pengeluaran: 13500000 },
    { month: "Okt", pengeluaran: 12300000 },
    { month: "Nov", pengeluaran: 13900000 },
    { month: "Des", pengeluaran: 16700000 }
  ];
  
  setData(dummyExpenses);
}, []);


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/monthly-expenses`)
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
        const template = months.map((month) => ({ month, pengeluaran: 0 }));

        // Merge data API
        res.data.forEach((item) => {
          const index = template.findIndex((t) => t.month === item.month);
          if (index !== -1) template[index].pengeluaran = item.pengeluaran;
        });

        setData(template);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full h-full">
      <h2 className="text-[14px] font-semibold pt-[6px] pl-[19px] pb-[9px]">
        Pengeluaran bulanan
      </h2>
      <hr className="text-[#959595] mx-[8px]" />
      <ResponsiveContainer
        width="100%"
        height={isMobile ? 282 : 175}
        className="pr-[8px] md:pr-[25px] mt-[16px] w-full max-sm:h-[650px]"
      >
        <BarChart data={data}>
          <CartesianGrid
            stroke="#959595"
            strokeDasharray={8}
            vertical={false}
          />
          <XAxis dataKey="month" tick={{ fontSize: isMobile ? 12 : 15 }} />
          <YAxis
            tickFormatter={(value) => `Rp. ${formatShort(value)}`}
            tick={{ fontSize: 10 }}
          />
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(value)
            }
          />
          <Bar dataKey="pengeluaran" fill="#FFB300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
