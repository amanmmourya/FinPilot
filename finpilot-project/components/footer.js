import React from 'react'

const Footer = () => {
  return (
    <div>
    <footer style={{
        backgroundColor: '#111',
        color: '#fff',
        padding: '40px 0',
        marginTop: '40px',
        width: '100%',
    }}>
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '0 20px'
        }}>
            <div style={{ flex: '1 1 300px', marginBottom: '20px' }}>
                <h2 style={{ color: '#fff', marginBottom: '10px' }}>FinPilot</h2>
                <p style={{ color: '#bbb', maxWidth: '350px' }}>
                    Your trusted partner in financial planning and investment. Empowering you to make smarter decisions for a brighter future.
                </p>
            </div>
            <div style={{ flex: '1 1 200px', marginBottom: '20px' }}>
                <h3 style={{ color: '#fff', marginBottom: '10px' }}>Quick Links</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: '#bbb' }}>
                    <li><a href="/" style={{ color: '#bbb', textDecoration: 'none' }}>Home</a></li>
                    <li><a href="/about" style={{ color: '#bbb', textDecoration: 'none' }}>About</a></li>
                    <li><a href="/services" style={{ color: '#bbb', textDecoration: 'none' }}>Services</a></li>
                    <li><a href="/contact" style={{ color: '#bbb', textDecoration: 'none' }}>Contact</a></li>
                </ul>
            </div>
            <div style={{ flex: '1 1 200px', marginBottom: '20px' }}>
                <h3 style={{ color: '#fff', marginBottom: '10px' }}>Contact Us</h3>
                <p style={{ color: '#bbb' }}>Email: support@finpilot.com</p>
                <p style={{ color: '#bbb' }}>Phone: +1 (555) 123-4567</p>
                <div style={{ marginTop: '10px' }}>
                    <a href="#" style={{ color: '#bbb', marginRight: '10px', textDecoration: 'none' }}>Twitter</a>
                    <a href="#" style={{ color: '#bbb', marginRight: '10px', textDecoration: 'none' }}>LinkedIn</a>
                    <a href="#" style={{ color: '#bbb', textDecoration: 'none' }}>Facebook</a>
                </div>
            </div>
        </div>
        <div style={{
            borderTop: '1px solid #222',
            marginTop: '30px',
            paddingTop: '20px',
            textAlign: 'center',
            color: '#888',
            fontSize: '14px'
        }}>
            &copy; {new Date().getFullYear()} FinPilot. All rights reserved.
        </div>
    </footer>
    </div>
  )
}

export default Footer
