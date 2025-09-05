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
    <div className="p-4 w-full h-full">
      <h2 className="text-lg font-semibold mb-2">Pendapatan bulanan</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis
            label={{
              value: "JT",
              angle: -90,
              position: "insideLeft",
              offset: -5,
            }}
            domain={[0, 12]}
          />
          <Tooltip />
          <Bar dataKey="income" fill="#FFB300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
