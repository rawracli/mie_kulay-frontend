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

export default function MonthlyOrdersChart() {
  const [data, setData] = useState([
    { month: "Jan", orders: 22 },
    { month: "Feb", orders: 18 },
    { month: "Mar", orders: 35 },
    { month: "Apr", orders: 20 },
    { month: "Mei", orders: 30 },
    { month: "Jun", orders: 26 },
    { month: "Jul", orders: 42 },
    { month: "Ags", orders: 36 },
    { month: "Sep", orders: 33 },
    { month: "Okt", orders: 48 },
    { month: "Nov", orders: 25 },
    { month: "Des", orders: 50 },
  ]);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${import.meta.env.VITE_API_URL}/monthly-orders`)
      .then((res) => {
        if (!mounted) return;
        if (Array.isArray(res.data) && res.data.length > 0) {
          const months = [
            "Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"
          ];
          const template = months.map((month) => ({ month, orders: 0 }));
          res.data.forEach((item) => {
            const idx = template.findIndex((t) => t.month === item.month);
            if (idx !== -1) template[idx].orders = item.orders || 0;
          });
          setData(template);
        }
      })
      .catch((err) => {
        console.error("MonthlyOrdersChart fetch failed, keep initial dummy:", err);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="w-full h-full">
      <h2 className="text-[14px] font-semibold pt-[6px] pl-[19px] pb-[9px]">
        Jumlah Pemesanan Berdasarkan Bulan
      </h2>
      <hr className="text-[#959595] mx-[8px]" />

      <div className="h-[206px] lg:h-[315px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, bottom: 10 }}>
            <CartesianGrid stroke="#959595" strokeDasharray={8} horizontal={false} />
            <XAxis type="number" tickFormatter={formatShort} tick={{ fontSize: isMobile ? 12 : 15 }} />
            <YAxis type="category" tick={{ fontSize: 10 }} dataKey="month" width={40} />
            <Tooltip />
            <Bar dataKey="orders" fill="#FFB300" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
