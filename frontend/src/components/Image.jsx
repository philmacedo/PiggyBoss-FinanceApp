import styles from "./Image.module.css"

export default function Image({ scr, style }) {
    
    return <img src={scr} alt="Logo" style={{ ...style }} className={styles["logo"]}/>
}
