"use client"
import React, { use, useEffect, useState } from 'react'
import CreateAccount from '../../components/createAccount.js';
import Interactive from '@/components/interactiveCharts.js';
import { Inter } from 'next/font/google/index.js';
import Transactions from '@/components/transactions.js';
import { useSelector } from 'react-redux';
import Limiter from '@/components/limiter.js';

const DashBoard = () => {
    const transactions = useSelector((state) => state.allTransactions.transactionsArray);
    const accounts = useSelector((state) => state.allAccounts.accountsArray);
    console.log('Accounts:', accounts);
    console.log('Transactions:', transactions);
    const [selectedMonth, setSelectedMonth] = React.useState({ month: new Date().getMonth(), year: new Date().getFullYear() });
    const handleCreateAccount = () => {
        setShow(true);
    }
    const [currentAccount, setCurrentAccount] = useState(accounts.length > 0 ? accounts[0].acc_name : "");
    const [currentLimit, setCurrentLimit] = useState(
        accounts.length > 0 && accounts[0].acc_limit !== undefined && accounts[0].acc_limit !== null
            ? Number(accounts[0].acc_limit)
            : 0
    );
    console.log('Current Account:', currentAccount, currentLimit);
    const filterByMonth = (transactions, monthNumber, year) => {
        const fromDate = new Date(Date.UTC(year, monthNumber, 1)); // 1st of month
        const toDate = new Date(Date.UTC(year, monthNumber + 1, 0, 23, 59, 59, 999)); // last day of month at 23:59:59.999

        return transactions.filter(tx => {
            const txDate = new Date(tx.timestamp); // already in UTC
            return txDate >= fromDate && txDate <= toDate && tx.account == currentAccount;
        });
    };
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = selectedMonth.month;
    const currentYear = selectedMonth.year;
    console.log('Current Month:', currentMonth, 'Current Year:', currentYear);
    const [filteredTransactions, setFilteredTransactions] = useState(filterByMonth(transactions, selectedMonth.month, selectedMonth.year))
    console.log('Filtered Transactions:', filteredTransactions);
    const [show, setShow] = useState(false);

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);
    useEffect(() => {
        setFilteredTransactions(filterByMonth(transactions, selectedMonth.month, selectedMonth.year));
        console.log('curentLimit:', accounts.find(acc => acc.acc_name === currentAccount)?.acc_limit || null);
    }
        , [selectedMonth, transactions, currentAccount]);
    return (
        <div>
            {show ? <CreateAccount show={show} setShow={setShow} /> : null}
            <div className="flex flex-col md:flex-row items-center md:items-center justify-between bg-blue-700 px-4 md:px-6 py-3 text-white gap-4 md:gap-0">
                <div className="font-bold text-xl mr-0 md:mr-8 mb-2 md:mb-0">FinPilot</div>
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 flex-1 md:justify-center w-full md:w-auto">
                    <select
                        className="bg-blue-800 md:bg-gradient-to-r md:from-blue-800 md:via-blue-700 md:to-blue-900 text-white border border-blue-400 px-3 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 w-full md:w-auto hover:bg-blue-800"
                        value={currentAccount}
                        onChange={(e) => {
                            const selectedAccName = e.target.value;
                            setCurrentAccount(selectedAccName);
                            const selectedAccount = accounts.find(acc => acc.acc_name === selectedAccName);
                            setCurrentLimit(
                                selectedAccount?.acc_limit !== undefined && selectedAccount?.acc_limit !== null
                                    ? Number(selectedAccount.acc_limit)
                                    : null
                            );
                        }}
                    >
                        {accounts.map((account, index) => (
                            <option key={index} value={account.acc_name}>{account.acc_name}</option>
                        ))}
                    </select>
                    <div className="flex gap-2 items-center">
                        <select
                            className="bg-blue-800 md:bg-gradient-to-r md:from-blue-800 md:via-blue-700 md:to-blue-900 text-white border border-blue-400 px-3 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:bg-blue-800"
                            value={selectedMonth.year}
                            onChange={e => setSelectedMonth({ ...selectedMonth, year: Number(e.target.value) })}
                        >
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <select
                            className="bg-blue-800 md:bg-gradient-to-r md:from-blue-800 md:via-blue-700 md:to-blue-900 text-white border border-blue-400 px-3 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:bg-blue-800"
                            value={selectedMonth.month}
                            onChange={e => setSelectedMonth({ ...selectedMonth, month: Number(e.target.value) })}
                        >
                            {months.map((month, idx) => (
                                <option key={month} value={idx}>{month}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2 md:mt-0">
                    <button onClick={handleCreateAccount} className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-lg shadow-lg font-semibold transition duration-200 ease-in-out w-full md:w-auto flex items-center gap-2 border border-green-400 hover:scale-105 active:scale-95">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Create Account
                    </button>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-700 font-bold text-lg shadow-lg border-2 border-blue-500">
                        FP
                    </div>
                </div>
            </div>
            <h1 className="mt-8 text-2xl font-bold px-4 md:px-0 text-center">Dashboard</h1>
            <div className='visual'>
                <Interactive filteredTransactions={filteredTransactions} />
                <div className='categories'></div>
            </div>
            <Limiter transactions={filteredTransactions} currentLimit={currentLimit} setCurrentLimit={setCurrentLimit} currentAccount={currentAccount} />
            <h1 className='mt-8 text-2xl font-bold px-4 md:px-0 text-center'>Transactions</h1>
            <Transactions filteredTransactions={filteredTransactions} currentAccount={currentAccount} currentLimit={currentLimit}/>

        </div>
    )
}

export default DashBoard
