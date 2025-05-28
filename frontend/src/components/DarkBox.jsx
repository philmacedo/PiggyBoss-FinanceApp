import { heIL } from '@mui/material/locale';
import styles from './DarkBox.module.css';
import { Link } from "react-router-dom";

export default function DarkBox({ children, to, style }){
    const customstyle = {
        backgroundColor: "#16102f",
        width : "100%",
        height : "100%",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.35)",
        textDecoration :"None", 
        color : "inherit",
        ...style,
    };

    const Tag = to ? Link : 'div'

    const darkbox = <Tag to={to} className={styles['dark-box']} style={{...customstyle, }}>
        {children}
    </Tag>

    return darkbox
}