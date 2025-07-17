"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
// id title category amount date
const Transactions = ({ filteredTransactions,currentAccount,currentLimit }) => {
    const totalExpense= filteredTransactions.reduce((acc, tx) => acc + Number((tx.type == 'expense' ? tx.amount : 0)), 0);
    const email= useSelector((state) => state.userInfo.email);
    const [transactions, setTransactions] = useState(filteredTransactions.map(tx => ({
        id: tx.id,
        title: tx.title,
        category: tx.category,
        amount: tx.amount,
        date: new Date(tx.timestamp).toLocaleDateString(),
    })).sort((a, b) => new Date(b.date) - new Date(a.date)));
    useEffect(() => {
        setTransactions(filteredTransactions.map(tx => ({
            id: tx.id,
            title: tx.title,
            category: tx.category,
            amount: tx.amount,
            date: new Date(tx.timestamp).toLocaleDateString(),
        })).sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, [filteredTransactions]);
    const handleDelete = async (id) => {
        const response = await fetch(`/api/deletetnx/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            console.error('Failed to delete transaction:', response.statusText);
            return;
        }
        console.log('Transaction deleted successfully:', id);
        alert('Transaction deleted successfully');
        setTransactions(transactions.filter(tx => tx.id !== id));
    };

    const [showModal, setShowModal] = React.useState(false);
    const [form, setForm] = React.useState({
        title: '',
        category: 'none',
        type:'income',
        amount: '',
        date: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddTransaction =async (e) => {
        e.preventDefault();
        if (!form.title || !form.amount || !form.date) return;
        if (isNaN(form.amount) || Number(form.amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        if (new Date(form.date) > new Date()) {
            alert('Date cannot be in the future');
            return;
        }
        if(form.category=='income' && form.type!='none'){
            alert('Income transactions cannot have a type');
            return;
        }
        const response=await fetch('/api/addtnx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_email: email,
                title: form.title,
                category: form.category,
                type: form.type,
                amount: Number(form.amount),
                date: form.date,
                description: form.description,
                currentAccount: currentAccount,
            }),
        });
        if (!response.ok) {
            console.error('Failed to add transaction:', response.statusText);
            alert('Failed to add transaction');
            return;
        }
        const data= await response.json();
        setTransactions([
            ...transactions,
            {
                id:data.idTnx,
                title: form.title,
                category: form.category,
                amount: Number(form.amount),
                date: form.date,
            },
        ]);
        alert('Transaction added successfully');
        if(totalExpense+ Number(form.amount) > currentLimit && currentLimit > 0){
            const mailData=await fetch('/api/sendLimitMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_email: email,
                    currentAccount: currentAccount,
                    totalExpense: totalExpense + Number(form.amount),
                    currentLimit: currentLimit,
                }),
            });
        }
        console.log(totalExpense+ Number(form.amount), currentLimit);
        setForm({ title: '', category: 'none',type:'income', amount: '', date: '' });
        setShowModal(false);
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto mt-8 rounded-2xl shadow-lg p-4 sm:p-8 bg-gradient-to-br from-[#eaf3ff] to-[#f8fbff]">
            <button
                className="bg-[#1a4fa3] hover:bg-[#17428c] transition-colors text-white px-4 sm:px-6 py-2 rounded-lg font-semibold mb-6 shadow-md flex items-center gap-2"
                onClick={() => setShowModal(true)}
            >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
                Add Transaction
            </button>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-2xl w-full max-w-lg relative border border-[#eaf3ff] mx-2">
                        <button
                            className="absolute top-3 right-3 text-[#e23d3d] font-bold text-2xl hover:text-red-700 transition"
                            onClick={() => setShowModal(false)}
                            title="Close"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-[#1a4fa3] mb-6 text-center">Add New Transaction</h2>
                        <form onSubmit={handleAddTransaction} className="flex flex-col gap-2">
                            <div>
                                <label className="block text-[#1a4fa3] font-semibold mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleInputChange}
                                    className="w-full border border-[#c7dbf7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a4fa3] transition"
                                    required
                                    placeholder="e.g. Grocery Shopping"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block text-[#1a4fa3] font-semibold mb-1">Type</label>
                                    <select
                                        name="type"
                                        value={form.type}
                                        onChange={handleInputChange}
                                        className="w-full border border-[#c7dbf7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a4fa3] transition"
                                    >
                                        <option value="income">Income</option>
                                        <option value="expense">Expense</option>
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[#1a4fa3] font-semibold mb-1">Category</label>
                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleInputChange}
                                        className="w-full border border-[#c7dbf7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a4fa3] transition"
                                        required
                                    >
                                        <option value="none">Select Category</option>
                                        <option value="rents">Rents</option>
                                        <option value="food">Food</option>
                                        <option value="transport">Travel</option>
                                        <option value="shopping">Shopping</option>
                                        <option value="study">Study</option>
                                        <option value="tech">Tech</option>
                                        <option value="education">Education</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[#1a4fa3] font-semibold mb-1">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={form.amount}
                                    onChange={handleInputChange}
                                    className="w-full border border-[#c7dbf7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a4fa3] transition"
                                    required
                                    min="0"
                                    placeholder="e.g. 100"
                                />
                            </div>
                            <div>
                                <label className="block text-[#1a4fa3] font-semibold mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleInputChange}
                                    className="w-full border border-[#c7dbf7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a4fa3] transition"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[#1a4fa3] font-semibold mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleInputChange}
                                    className="w-full border border-[#c7dbf7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a4fa3] transition resize-none"
                                    rows={3}
                                    placeholder="Add details (optional)"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-[#1bb76e] hover:bg-[#159e5c] transition-colors text-white px-6 py-2 rounded-lg font-semibold mt-2 shadow-md"
                            >
                                Add Transaction
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {transactions.length === 0 ? (
                <div className="text-center text-[#6b8fcf] text-lg mt-10">No transactions found.</div>
            ) : (
                <div className="flex flex-col gap-5">
                    {transactions.map((tx) => (
                        <div
                            key={tx.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#f8fbff] rounded-xl p-4 sm:p-5 mb-2 sm:mb-5 shadow transition-shadow w-full border border-[#eaf3ff] hover:shadow-lg"
                        >
                            <div className="flex-1">
                                <div className="font-bold text-lg text-[#1a4fa3] mb-0.5">{tx.title}</div>
                                <div className="text-base text-[#3a6fc1] mt-0.5 font-medium">{tx.category}</div>
                                <div className="text-sm text-[#6b8fcf] mt-0.5">{tx.date}</div>
                                {tx.type && (
                                    <div className="text-xs text-[#7a8ca7] mt-1">{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</div>
                                )}
                                {tx.description && (
                                    <div className="text-xs text-[#7a8ca7] mt-1 italic">{tx.description}</div>
                                )}
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-0">
                                <div
                                    className={`font-bold text-xl ${tx.category === 'Income'
                                        ? 'text-[#1bb76e] bg-[#f0fcf7]'
                                        : tx.category === 'Expense'
                                            ? 'text-[#e23d3d] bg-[#fff5f5]'
                                            : 'text-[#1a4fa3] bg-[#eaf3ff]'
                                        } px-4 sm:px-6 py-2.5 rounded-lg min-w-[110px] text-right shadow`}
                                >
                                    {tx.category === 'Income' ? '+' : tx.category === 'Expense' ? '-' : ''} {tx.amount} Rs.
                                </div>
                                <button
                                    onClick={() => handleDelete(tx.id)}
                                    className="bg-[#e23d3d] text-white border-none rounded-md px-4 py-2 font-semibold cursor-pointer text-base transition-colors hover:bg-red-600 flex items-center justify-center"
                                    title="Delete Transaction"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                        <path stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6h12z" />
                                        <path stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10 11v6M14 11v6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Transactions
