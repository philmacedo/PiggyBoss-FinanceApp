import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar(){

    const NAVBAR = (
        <nav>
            <div className={styles['left-side']}>
                <p>Dashboard</p>
                <p>Cards and Banks</p>
            </div>
            <div className={styles['right-side']}>
                <p>Profile</p>
            </div>
        </nav>
    )
    
    return NAVBAR
}

