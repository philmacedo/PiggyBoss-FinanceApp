import { useEffect, useState } from "react";
import API from "../api";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function NavBar(){
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const fetchUserInfo = async () => {
            try {
                const response = await API["main"].get("/account/me/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserInfo(response.data);
            } catch (err) {
                console.error("User search error:", err);
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserInfo(null);
        navigate("/login");
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
                <Link to="/login" className={styles['nav-link']}>Login</Link>
                <p>Profile</p>
          
            </div>
        </nav>
    )
    
    return NAVBAR
}

