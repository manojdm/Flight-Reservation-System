import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { USER_LOGIN_RESET } from '../constants/userConstants'
import '../css/header.css'

const Header = ({history}) => {

    const userLogin = useSelector(state => state.userLogin);
    const {userData , loading} = userLogin;

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({type : USER_LOGIN_RESET});
        localStorage.removeItem('userData');
    }

    return (
        <section id="header">
            <nav className="container">
                <div className="left">
                    <Link to='/' className="left">Fly With Us</Link>
                </div>
                <div className="right">
                    <ul>
                        {!loading && !userData ?  <>
                            <Link to='/login'><li>SIGN IN <i className="fas fa-user"></i></li></Link>
                        </> :
                        <>  
                            { !loading && userData.isAdmin  ? <Link to='/admin'><li>Admin <i className="fas fa-user-shield"></i></li></Link> : ''}
                            <Link to='/user/profile'><li>Profile <i className="fas fa-user"></i></li></Link>
                            <li style={{cursor : "pointer"}} onClick={handleLogout}>Logout <i className="fas fa-sign-out-alt"></i></li>
                        </>
                        
                        }
                    </ul>
                </div>
            </nav>
        </section>
    )
}

export default Header
