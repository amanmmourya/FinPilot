import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie } from 'recharts';
import { Cell } from 'recharts';
import { BarChart, Bar, AreaChart, Area } from 'recharts';
import { useState, useEffect } from 'react';

const Interactive = ({ filteredTransactions }) => {
  function truncateToTwoDecimals(num) {
    return Math.trunc(num * 100) / 100;
  }
  const data = filteredTransactions
    .map(tx => ({
      date: new Date(tx.timestamp).toLocaleDateString(),
      income: tx.type === 'income' ? Number(tx.amount) : 0,
      expense: tx.type === 'expense' ? Number(tx.amount) : 0,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const pieData = [
    { name: 'rents', value: filteredTransactions.reduce((sum, tx) => sum + (tx.category == 'rents' ? Number(tx.amount) : 0), 0) },
    { name: 'food', value: filteredTransactions.reduce((sum, tx) => sum + (tx.category == 'food' ? Number(tx.amount) : 0), 0) },
    { name: 'transport', value: filteredTransactions.reduce((sum, tx) => sum + (tx.category == 'transport' ? Number(tx.amount) : 0), 0) },
    { name: 'shopping', value: filteredTransactions.reduce((sum, tx) => sum + (tx.category == 'shopping' ? Number(tx.amount) : 0), 0) },
    { name: 'study', value: filteredTransactions.reduce((sum, tx) => sum + (tx.category == 'study' ? Number(tx.amount) : 0), 0) },
    { name: 'tech', value: filteredTransactions.reduce((sum, tx) => sum + (tx.category == 'tech' ? Number(tx.amount) : 0), 0) },
    { name: 'education', value: filteredTransactions.reduce((sum, tx) => sum + (tx.category == 'education' ? Number(tx.amount) : 0), 0) },
    { name: 'other', value: filteredTransactions.reduce((sum, tx) => sum + (!['rents', 'food', 'transport', 'shopping', 'study', 'tech', 'education'].includes(tx.category) ? Number(tx.amount) : 0), 0) },
  ];
  console.log(pieData);
  // Filter pieData to only include items with value > 0
  const filteredPieData = pieData.filter(item => item.value > 0);

  // Define colors for each category
  const pieColors = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFE", "#FEA8B8", "#B8FEA8", "#8884d8"
  ];

  // Determine if device is mobile based on window width
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [chartType, setChartType] = useState('line');

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="income" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="expense" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" />
            <Bar dataKey="expense" fill="#8884d8" />
          </BarChart>
        );
      default:
        return (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#82ca9d" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="expense" stroke="#8884d8" />
          </LineChart>
        );
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <label htmlFor="chartType" style={{ marginRight: 8, fontWeight: 'bold' }}>Chart Type:</label>
        <select
          id="chartType"
          value={chartType}
          onChange={e => setChartType(e.target.value)}
          style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc' }}
        >
          <option value="line">Line</option>
          <option value="area">Area</option>
          <option value="bar">Bar</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
      <h1 className='mt-8 text-2xl font-bold px-4 md:px-0 text-center'>Expenses by Category</h1>
      <ResponsiveContainer width="100%" height={400}>
        {filteredPieData.length > 0 ? (
          <PieChart>
            <Pie
              data={filteredPieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={isMobile ? 60 : 100}
              label={({ name, value }) => `${name}: ${value} Rs.`}
            >
              {filteredPieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <div style={{ textAlign: 'center', paddingTop: 80, color: '#8884d8' }}>No data available for pie chart</div>
        )}
      </ResponsiveContainer>
      <h1 className='mt-8 text-2xl font-bold px-4 md:px-0 text-center'>Overview</h1>
      <div style={{ maxWidth: 900, margin: '32px auto 0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220, margin: '0 12px', padding: 20, background: '#e6f7ee', borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3>Income</h3>
            <p style={{ fontSize: 24, fontWeight: 'bold', color: '#2e7d32' }}>
               {truncateToTwoDecimals(data.reduce((sum, d) => sum + d.income, 0))} Rs.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 220, margin: '0 12px', padding: 20, background: '#f3e6fa', borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3>Expense</h3>
            <p style={{ fontSize: 24, fontWeight: 'bold', color: '#6c3483' }}>
              {truncateToTwoDecimals(data.reduce((sum, d) => sum + d.expense, 0))} Rs.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 220, margin: '0 12px', padding: 20, background: '#e6f0fa', borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3>Savings</h3>
            <p style={{ fontSize: 24, fontWeight: 'bold', color: '#1565c0' }}>
               {truncateToTwoDecimals(data.reduce((sum, d) => sum + d.income - d.expense, 0))} Rs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Interactive
