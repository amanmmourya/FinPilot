"use client";
import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLimit } from '../features/userInfo/userInfoSlice';

const Limiter = ({ transactions,currentLimit,setCurrentLimit,currentAccount}) => {
    const dispatch = useDispatch();
    const reduxlimit = useSelector((state) => state.userInfo.limit);
    const truncateToTwoDecimalPlaces = (num) => {
        return Math.round(num * 100) / 100;
    };
    const usedInThisMonth = transactions.reduce((acc, tx) => {
        const txDate = new Date(tx.timestamp);
        const currentDate = new Date();
        if (txDate.getMonth() === currentDate.getMonth() && txDate.getFullYear() === currentDate.getFullYear()) {
            return acc + (Number(tx.amount) || 0);
        }
        return acc;
    }, 0);
    const [used, setUsed] = React.useState(truncateToTwoDecimalPlaces(usedInThisMonth));

    const handleSetLimit =async () => {
        const input = prompt('Enter your limit amount in Rs:');
        const value = Number(input);
        if(value<=usedInThisMonth){
            alert('Limit cannot be less than or equal to the amount already used this month.');
            return;
        }
        if (!isNaN(value) && value > 0) {
            setLimit(value);
            dispatch(setLimit(value));
        }
        const response=await fetch('/api/setLimit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ limit: value,account: currentAccount }),
        });
        if(!response.ok) {
            alert('Failed to set limit. Please try again.');
            return;
        }
        alert('Limit set successfully!');
        setCurrentLimit(value);
    };

    if (currentLimit <=0) {
        return (
            <div style={{
                maxWidth: '1000px',
                margin: '40px auto',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h2 style={{ marginBottom: '16px', color: '#333' }}>Set Limit & Save Your Money</h2>
                <button
                    style={{
                        padding: '10px 24px',
                        background: 'linear-gradient(90deg, #4f8cff 60%, #38e7b7 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '16px',
                        boxShadow: '0 2px 8px rgba(79,140,255,0.12)'
                    }}
                    onClick={handleSetLimit}
                >
                    Set Limit
                </button>
            </div>
        );
    }

    return (
        <div>
            <div style={{
                maxWidth: '1000px',
                margin: '40px auto',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h2 style={{ marginBottom: '16px', color: '#333' }}>Usage Limit</h2>
                <div style={{ width: '100%', marginBottom: '24px' }}>
                    <div style={{
                        height: '24px',
                        width: '100%',
                        background: '#eee',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${(used / currentLimit) * 100}%`,
                            background: 'linear-gradient(90deg, #4f8cff 60%, #38e7b7 100%)',
                            transition: 'width 0.3s'
                        }} />
                        <span style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontWeight: 'bold',
                            color: '#222',
                            fontSize: '14px'
                        }}>
                            {used} / {currentLimit}
                        </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '13px', color: '#666' }}>
                        <span>Used: {used}</span>
                        <span>Remaining: {currentLimit - used}</span>
                    </div>
                </div>
                <button
                    style={{
                        padding: '10px 24px',
                        background: 'linear-gradient(90deg, #4f8cff 60%, #38e7b7 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '16px',
                        boxShadow: '0 2px 8px rgba(79,140,255,0.12)'
                    }}
                    onClick={handleSetLimit}
                >
                    Set Limit
                </button>
            </div>
        </div>
    );
}

export default Limiter
