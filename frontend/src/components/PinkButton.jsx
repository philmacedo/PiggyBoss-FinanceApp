import styles from './PinkButton.module.css';

export default function PinkButton({ text }) {
    return <button type="submit" className={styles['pink-button']}>{text}</button>
}
