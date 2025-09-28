import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "react-responsive";
import { formatShort } from "../priceFormat";

export default function ProfitChart() {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTabletBig = useMediaQuery({ query: "(max-width: 1024px)" });
  const [data, setData] = useState([]);

  //! Dummy data
  useEffect(() => {
    const dummyEarnings = [
      { month: "Jan", income: 15750000 },
      { month: "Feb", income: 18200000 },
      { month: "Mar", income: 22500000 },
      { month: "Apr", income: 19800000 },
      { month: "Mei", income: 25300000 },
      { month: "Jun", income: 28750000 },
      { month: "Jul", income: 31200000 },
      { month: "Ags", income: 29600000 },
      { month: "Sep", income: 26800000 },
      { month: "Okt", income: 24100000 },
      { month: "Nov", income: 27500000 },
      { month: "Des", income: 33400000 },
    ];

    setData(dummyEarnings);
  }, []);

  return (
    <div className="w-full h-full">
      <div className="pt-[6px] pl-[19px] pb-[9px] font-semibold">
        <h2 className="text-[14px]">Provit:</h2>
        <h3 className="text-[24px]">
          Rp{" "}
          {data
            .map((val) => val.income)
            .reduce((a, b) => a + b, 0)
            .toLocaleString("id-ID")}
        </h3>
      </div>
      <hr className="text-[#959595] mx-[8px]" />
      <ResponsiveContainer
        width="100%"
        height={isMobile ? 250 : isTabletBig ? 200 : 285}
        className="pr-[8px] md:pr-[25px] mt-[16px] w-full max-sm:h-[650px]"
      >
        <LineChart data={data}>
          <CartesianGrid
            stroke="#959595"
            strokeDasharray={8}
            vertical={false}
          />
          <XAxis dataKey="month" tick={{ fontSize: isMobile ? 12 : 15 }}/>
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
          <Line
            dataKey="income"
            stroke="#FFB300"
            strokeWidth={2}
            dot={{ fill: "#FFB300", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#FFB300" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
