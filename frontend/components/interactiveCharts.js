import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie } from 'recharts';

const Interactive = () => {
  const data = [
    { date: '2024-06-01', income: 1200, expense: 800 },
    { date: '2024-06-02', income: 900, expense: 650 },
    { date: '2024-06-03', income: 1500, expense: 1200 },
    { date: '2024-06-04', income: 1100, expense: 700 },
    { date: '2024-06-05', income: 1700, expense: 900 },
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#82ca9d" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="expense" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    <ResponsiveContainer width="100%" height={250}>
        <PieChart>
            <Pie
                data={[
                    { name: 'Rent', value: 400 },
                    { name: 'Food', value: 200 },
                    { name: 'Transport', value: 100 },
                    { name: 'Entertainment', value: 150 },
                    { name: 'Other', value: 50 },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
            />
            <Tooltip />
            <Legend />
        </PieChart>
    </ResponsiveContainer>
    <h1 className='mt-8 text-2xl font-bold px-4 md:px-0'>Overview</h1>
    <div style={{ maxWidth: 900, margin: '32px auto 0 auto', padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 220, margin: '0 12px', padding: 20, background: '#e6f7ee', borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3>Income</h3>
            <p style={{ fontSize: 24, fontWeight: 'bold', color: '#2e7d32' }}>
                ${data.reduce((sum, d) => sum + d.income, 0)}
            </p>
        </div>
        <div style={{ flex: 1, minWidth: 220, margin: '0 12px', padding: 20, background: '#f3e6fa', borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3>Expense</h3>
            <p style={{ fontSize: 24, fontWeight: 'bold', color: '#6c3483' }}>
                ${data.reduce((sum, d) => sum + d.expense, 0)}
            </p>
        </div>
        <div style={{ flex: 1, minWidth: 220, margin: '0 12px', padding: 20, background: '#e6f0fa', borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3>Savings</h3>
            <p style={{ fontSize: 24, fontWeight: 'bold', color: '#1565c0' }}>
                ${data.reduce((sum, d) => sum + d.income - d.expense, 0)}
            </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Interactive
