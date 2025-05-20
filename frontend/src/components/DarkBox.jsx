import styles from './DarkBox.module.css';

export default function DarkBox({ children }){
    return <div className={styles['dark-box']}>
        {children}
    </div>
}