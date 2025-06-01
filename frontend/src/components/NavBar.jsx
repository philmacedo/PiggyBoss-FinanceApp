import { useEffect, useState } from "react";
import API from "../api";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import { useAuth } from "../context/AuthContext";

export default function NavBar(){
    const { userInfo, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const NAVBAR = (
        <nav>
            <div className={styles['left-side']}>
                <Link to="/">
                    <img src={logo} alt="Logo" className={styles['logo']} />
                </Link>
                <p>Dashboard</p>
                <p>Cards and Banks</p>
                <Link to="/transactions" className={styles['nav-link']}>Transactions</Link>
            </div>
            
            <div className={styles['right-side']}>
                {userInfo ? (
                    <>
                        <span className={styles["user-info"]}>
                            Welcome, {userInfo.full_name}
                        </span>
                        <button onClick={handleLogout} className={styles['logout-button']}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/" className={styles['nav-link']}>Login</Link>
                )}
                
            </div>
        </nav>
    );
    
    return NAVBAR;
}
