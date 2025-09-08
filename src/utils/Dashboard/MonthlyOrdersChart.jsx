import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Data order bulanan
const data = [
  { month: "Oct", orders: 8200 },
  { month: "Des", orders: 7900 },
  { month: "Nov", orders: 7600 },
  { month: "Mar", orders: 7200 },
  { month: "Apr", orders: 6800 },
  { month: "Mei", orders: 6300 },
  { month: "Jun", orders: 6100 },
  { month: "Jul", orders: 6000 },
  { month: "Ags", orders: 5800 },
  { month: "Feb", orders: 5000 },
  { month: "Jan", orders: 3000 },
  { month: "Sep", orders: 1500 },
];

export default function MonthlyOrdersChart() {
  return (
    <div className="w-full h-full">
      <h2 className="text-[14px] font-semibold pt-[6px] pl-[19px] pb-[9px]">Order bulanan</h2>
      <hr className="text-[#959595] mx-[8px]"/>
        <ResponsiveContainer width="100%" height={319}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, bottom: 10 }}>
            <CartesianGrid stroke="#959595" strokeDasharray={8} horizontal={false} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="month" width={40} />
            <Tooltip />
            <Bar dataKey="orders" fill="#FFB300" />
          </BarChart>
        </ResponsiveContainer>
    </div>
  );
}
