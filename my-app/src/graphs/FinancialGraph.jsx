import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Loading from '../assets/loading/loading.jsx';

export default function FinanceChart({ entrada, saida }) {
      if (entrada === null || saida === null) return <p><Loading /></p>; 

  const data = [
    {
      name: 'Relação Financeira',
      Entrada: entrada,
      Saída: saida,
    },
  ];

  return (
<ResponsiveContainer width="100%" height={300}>
    <h2 className="finance-chart-title">Resumo Financeiro</h2>
    <BarChart
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
      <XAxis dataKey="name" tick={{ fill: '#333', fontSize: 14 }} />
      <YAxis tick={{ fill: '#333', fontSize: 14 }} />
      <Tooltip
        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ccc' }}
        labelStyle={{ fontWeight: 'bold', color: '#555' }}
      />
      <Legend verticalAlign="top" height={36} iconType="circle" />
      <Bar
        dataKey="Entrada"
        fill="#4caf50"
        radius={[8, 8, 0, 0]}
        barSize={40}
      />
      <Bar
        dataKey="Saída"
        fill="#f44336"
        radius={[8, 8, 0, 0]}
        barSize={40}
      />
    </BarChart>
  </ResponsiveContainer>
);

}


