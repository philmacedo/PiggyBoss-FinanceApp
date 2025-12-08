import { useState } from "react";
import FormField from "../../components/FormField";
import PiggyBox from "../PiggyBox";
import PinkButton from "../PinkButton";
import API from "../../utils/api";
import Image from "../Image";
import logo from "../../assets/images/nerd.png";
import { useAuth } from "../../context/AuthContext"

// Adicionamos a prop 'onClose' aqui
export default function CategoriesForm( { onFormSubmit, onClose } ){

    const { userInfo } = useAuth()
    const [formData, setFormData] = useState({
        name: '',
        color: '#ff00d4',
        balance_type: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || formData.name.trim() === '') return;
        if (!formData.balance_type) return;

        try {
            await API["finance"].post("/category/", formData)
            setFormData({ name: '', color: '#ff00d4', balance_type: ''})
            onFormSubmit?.();
            onClose?.(); // Fecha ao salvar
        } catch (err) { console.log(err); }
    };

    const TYPE_OPTIONS = [ 
            { value: "income", label: "Income" }, 
            { value: "expense", label: "Expense" } 
        ];

    const backButtonStyle = {
        position: 'absolute', left: '20px', top: '20px', background: 'transparent',
        border: '1px solid #FF66C4', color: '#FF66C4', padding: '5px 10px',
        borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', zIndex: 10
    };

    const CATEGORIES_FORM = (
            <PiggyBox 
                style = {{ 
                    height : "65%", 
                    width : "40%",
                    maxHeight: "600px",
                    display : "flex",
                    flexDirection : "column",
                    justifyContent : "flex-start",
                    alignItems : "center",
                    position: "relative"
                    }}>
                
                {/* Botão de Voltar */}
                <button onClick={onClose} style={backButtonStyle}>
                    &larr; Voltar
                </button>

                <div style={{ height: '20%', margin: '5% 0 0 0' }}> 
                    <Image scr = {logo} />
                </div>
                <form
                    onSubmit={handleSubmit}
                    style = {{ 
                        height : "50%", 
                        width : "100%",
                        margin: "5%",
                        display : "flex",
                        flexDirection : "column",
                        justifyContent : "flex-start",
                        alignItems : "center",
                        gap: "5%"
                    }}>

                    <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '100%'}}>
                    
                        <FormField key="name" name="name" label="Category Name" value={formData.name} onChange={handleChange} required={true} style={{ width : "90%", paddingTop: "5%" }} />
                        
                        <div style={{ width: "90%", paddingTop: "5%", textAlign: "left" }}>
                            <label style={{ display: "block", marginBottom: "0.5rem", color: "#ccc", fontSize: "0.9rem" }}>Color</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input 
                                    type="color" 
                                    name="color" 
                                    value={formData.color} 
                                    onChange={handleChange}
                                    style={{
                                        width: '50px', height: '40px', border: 'none', 
                                        borderRadius: '5px', cursor: 'pointer', backgroundColor: 'transparent'
                                    }} 
                                />
                                <span style={{ color: '#fff', fontSize: '0.9rem' }}>{formData.color}</span>
                            </div>

                            <FormField key="balance_type" name="balance_type" label="Category Type" required={true} style={{ width : "90%", paddingTop: "5%" }}>
                                <select name="balance_type" value={formData.balance_type} onChange={handleChange} style={{ width: '100%', height: '2.5rem', fontSize: '1rem', padding: '0.25rem' }} required>
                                    <option value="" disabled>Select a Category Type</option>
                                    {TYPE_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </FormField>

                        </div>
                    </div>
                
                <PinkButton text = "Add a Category" style = {{ width: "40%", margin: "5%" }}/>
                
                </form>
            </PiggyBox>
    )

    return CATEGORIES_FORM
}