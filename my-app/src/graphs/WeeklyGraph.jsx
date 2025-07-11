import React from 'react';
import '../styles/Graphs.css';
import Loading from '../assets/loading/loading.jsx'; 
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function WeekChart({ data }) {
  if (!data) return <p><Loading /></p>; 



const hoje = new Date();

function getNomeDia(date) {
  return date.toLocaleDateString("pt-BR", { weekday: "short" });
}

const diasDaSemana = [...Array(7)].map((_, i) => {
  const dia = new Date(hoje);
  dia.setDate(hoje.getDate() - (6 - i)); 
  if (dia.toDateString() === hoje.toDateString()) {
    return "(Hoje)";
  }else{
      return getNomeDia(dia); 
  }
});

const chartData = [
  { name: diasDaSemana[0], Presenças: data.domingo },
  { name: diasDaSemana[1], Presenças: data.sabado },
  { name: diasDaSemana[2], Presenças: data.sexta },
  { name: diasDaSemana[3], Presenças: data.quinta },
  { name: diasDaSemana[4], Presenças: data.quarta },
  { name: diasDaSemana[5], Presenças: data.terca },
  { name: diasDaSemana[6], Presenças: data.segunda },
];
  return (
    <div>
      <h2 className="finance-chart-title">Presenças Semanal</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData} margin={{}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Presenças"
            fill="#2196f3"
            radius={[8, 8, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
