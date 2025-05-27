import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar(){

    const NAVBAR = (
        <nav>
            <div className={styles['left-side']}>
                <h4>Dashboard</h4>
                <h4>Cards and Banks</h4>
            </div>
            <div className={styles['right-side']}>
                <h4>Profile</h4>
            </div>
        </nav>
    )
    
    return NAVBAR
}

