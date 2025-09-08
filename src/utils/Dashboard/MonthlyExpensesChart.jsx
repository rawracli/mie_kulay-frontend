import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", pengeluaran: 30000 },
  { month: "Feb", pengeluaran: 50000 },
  { month: "Mar", pengeluaran: 80000 },
  { month: "Apr", pengeluaran: 70000 },
  { month: "Mei", pengeluaran: 90000 },
  { month: "Jun", pengeluaran: 60000 },
  { month: "Jul", pengeluaran: 50000 },
  { month: "Ags", pengeluaran: 70000 },
  { month: "Sep", pengeluaran: 20000 },
  { month: "Okt", pengeluaran: 10000 },
  { month: "Nov", pengeluaran: 60000 },
  { month: "Des", pengeluaran: 90000 },
];

export default function MonthlyExpensesChart() {
  return (
    <div className="w-full h-full">
      <h2 className="text-[14px] font-semibold pt-[6px] pl-[19px] pb-[9px]">Pengeluaran bulanan</h2>
      <hr className="text-[#959595] mx-[8px]"/>
      <ResponsiveContainer width="100%" height={180} className={"pr-[34px] mt-[16px]"}>
        <BarChart data={data}>
          <CartesianGrid stroke="#959595" strokeDasharray={8} vertical={false} />
          <XAxis dataKey="month" />
          <YAxis
            label
            domain={[0, 12]}
          />
          <Tooltip />
          <Bar dataKey="pengeluaran" fill="#FFB300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
