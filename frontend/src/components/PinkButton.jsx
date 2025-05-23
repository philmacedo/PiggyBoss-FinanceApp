import styles from './PinkButton.module.css';

export default function PinkButton({ text, width, height, margin }) {
    const style = {
        width: width || 'auto',
        height: height || 'auto',
        margin: margin || '0'
    };

    return <button type="submit" className={styles['pink-button']} style={style}>
        {text}
    </button>
}
