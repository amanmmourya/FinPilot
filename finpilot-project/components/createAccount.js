import React from 'react'
import { useSelector } from 'react-redux';

const CreateAccount = ({show,setShow}) => {
    const email = useSelector(state => state.userInfo.email);
    const handleSubmit =async (accountName) => {
        console.log('Creating account with name:', accountName, 'and email:', email);
       const response=await fetch('/api/createacc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accountName, email }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error creating account:', errorData);
            alert('Failed to create account. Please try again.');
            return;
        }
        const data = await response.json();
        console.log('Account created successfully:', data);
        alert('Account created successfully!');
    }
  return (
    <div
        style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '350px',
            width: '90%',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: '8px',
            padding: '24px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            ...(window.innerWidth > 600
                ? { top: '20px', right: '20px', left: 'auto', transform: 'none' }
                : {}),
        }}
    >
        <button
        onClick={() => setShow(false)}
            style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'transparent',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
            }}
            aria-label="Close"
        >
            ×
        </button>
        <h2 style={{ marginBottom: '16px', textAlign: 'center' }}>Create Account</h2>
        <form
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            onSubmit={e => {
                e.preventDefault();
                handleSubmit(e.target.accountName.value);
                setShow(false);
                // handle create
            }}
        >
            <label style={{ fontWeight: 500 }}>
                Account Name
                <input
                    type="text"
                    name="accountName"
                    required
                    style={{
                        marginTop: '6px',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        width: '100%',
                    }}
                />
            </label>
            <button
                type="submit"
                style={{
                    padding: '10px',
                    borderRadius: '4px',
                    border: 'none',
                    background: '#007bff',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                }}
            >
                Create
            </button>
        </form>
    </div>
  )
}

export default CreateAccount