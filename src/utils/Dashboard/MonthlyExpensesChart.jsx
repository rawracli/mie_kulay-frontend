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
    <div className="p-4 w-full h-full">
      <h2 className="text-lg font-semibold mb-2">Pengeluaran bulanan</h2>
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
          <Bar dataKey="pengeluaran" fill="#FFB300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
