import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Admin.css'

const Admin = () => {
    return (
        <>
            <section id="admin">
            
                <div className="admin-panel-container">
                    <ul className="admin-ul">
                        <Link to='/admin/users'><li>Users <i className="fas fa-users"></i></li></Link>
                        <Link to='/admin/flights'><li>Flights <i className="fas fa-plane"></i></li></Link>
                        <Link to='/admin/orders'><li>Orders <i className="fas fa-clipboard-list"></i></li></Link>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Admin
