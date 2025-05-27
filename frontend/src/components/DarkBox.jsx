import styles from './DarkBox.module.css';

export default function DarkBox({ children, width, height, minwidth, minheight, background }){
    const style = {
        width: width || 'auto',
        height: height || 'auto',
        minWidth: minwidth || 'auto',
        minHeight: minheight || 'auto',
        backgroundColor: background
    };

    return <div className={styles['dark-box']} style={style}>
        {children}
    </div>
}