import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", income: 2 },
  { month: "Feb", income: 4 },
  { month: "Mar", income: 10 },
  { month: "Apr", income: 10 },
  { month: "Mei", income: 10 },
  { month: "Jun", income: 9 },
  { month: "Jul", income: 6 },
  { month: "Ags", income: 6 },
  { month: "Sep", income: 1 },
  { month: "Okt", income: 11 },
  { month: "Nov", income: 8 },
  { month: "Des", income: 11 },
];

export default function MonthlyEarningsChart() {
  return (
    <div className="w-full h-full">
      <h2 className="text-[14px] font-semibold pt-[6px] pl-[19px] pb-[9px]">Pendapatan bulanan</h2>
      <hr className="text-[#959595] mx-[8px]"/>
      <ResponsiveContainer width="100%" height={170} className={"pr-[34px] mt-[16px]"}>
        <BarChart data={data}>
          <CartesianGrid stroke="#959595" strokeDasharray={8} vertical={false} />
          <XAxis dataKey="month" />
          <YAxis
            label
            domain={[0, 12]}
          />
          <Tooltip />
          <Bar dataKey="income" fill="#FFB300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
