import styles from './FormField.module.css';

export default function FormField({ name, label, type, value, onChange, placeholder, required = false }){
    return <div className={styles['form-field']}>
        <label htmlFor={label}>{label}</label>
        <input
            type={type}
            id={label}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required = {required}
        />  
    </div>
}
