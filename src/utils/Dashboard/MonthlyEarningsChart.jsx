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
import { useMediaQuery } from "react-responsive";
import { formatShort } from "../priceFormat";

export default function MonthlyEarningsChart() {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const initialDummy = [
    { month: "Jan", income: 1200000 },
    { month: "Feb", income: 900000 },
    { month: "Mar", income: 1500000 },
    { month: "Apr", income: 800000 },
    { month: "Mei", income: 1400000 },
    { month: "Jun", income: 1100000 },
    { month: "Jul", income: 1600000 },
    { month: "Ags", income: 1300000 },
    { month: "Sep", income: 1250000 },
    { month: "Okt", income: 1700000 },
    { month: "Nov", income: 1000000 },
    { month: "Des", income: 1900000 },
  ];

  const [data, setData] = useState(initialDummy);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${import.meta.env.VITE_API_URL}/monthly-income`)
      .then((res) => {
        if (!mounted) return;
        if (Array.isArray(res.data) && res.data.length > 0) {
          // merge into template to keep all months
          const months = [
            "Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"
          ];
          const template = months.map((month) => ({ month, income: 0 }));
          res.data.forEach((item) => {
            const idx = template.findIndex((t) => t.month === item.month);
            if (idx !== -1) template[idx].income = item.income || 0;
          });
          setData(template);
        }
        // else: tetap pakai initialDummy
      })
      .catch((err) => {
        console.error("MonthlyEarningsChart fetch failed, keep initial dummy:", err);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="w-full h-full">
      <h2 className="text-[14px] font-semibold pt-[6px] pl-[19px] pb-[9px]">
        Jumlah Pendapatan Berdasarkan Bulan
      </h2>
      <hr className="text-[#959595] mx-[8px]" />
      <ResponsiveContainer
        width="100%"
        height={isMobile ? 282 : 175}
        className="pr-[8px] md:pr-[25px] mt-[16px] w-full max-sm:h-[650px]"
      >
        <BarChart data={data}>
          <CartesianGrid stroke="#959595" strokeDasharray={8} vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: isMobile ? 12 : 15 }} />
          <YAxis tickFormatter={(value) => `Rp. ${formatShort(value)}`} tick={{ fontSize: 10 }} />
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(value)
            }
          />
          <Bar dataKey="income" fill="#FFB300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
