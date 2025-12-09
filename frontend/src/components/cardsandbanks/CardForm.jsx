import { useState, useEffect } from "react";
import FormField from "../../components/FormField";
import PiggyBox from "../PiggyBox";
import PinkButton from "../PinkButton";
import API from "../../utils/api";
import Image from "../Image";
import logo from "../../assets/images/nerd.png";
import { useAuth } from "../../context/AuthContext"
import { fetchBanks, fetchInstitution } from "../../services/financeServices";

// Adicionamos a prop 'onClose' aqui
export default function CardForm({ onFormSubmit, onClose }){

    const { userInfo, loading } = useAuth()
    const [banks, setBanks] = useState([])
    const [formData, setFormData] = useState({ name: '', bank: '' })

    function capitalize(str) {
            if (!str) return ''; 
            return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const fetchData = async () => {
        try {
            const getBanks = await fetchBanks()
            setBanks(getBanks)
        } catch (err) { console.log(err) }
    }

    useEffect(() => {
        if (!userInfo && !loading) return
        fetchData()
      }, [userInfo])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || formData.name.trim() === '' || !formData.bank) return;

        try {
            await API["finance"].post("/card/", formData);
            setFormData({ name: '', bank: '',});
            onFormSubmit?.();
            onClose?.(); // Fecha ao salvar
        } catch (err) { console.log(err); }
    };

    const backButtonStyle = {
        position: 'absolute',
        left: '20px',
        top: '20px',
        background: 'transparent',
        border: '1px solid #FF66C4',
        color: '#FF66C4',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        zIndex: 10
    };

    const CARD_FORM = (
            <PiggyBox 
                style = {{ 
                    height : "55%", 
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
                    &larr; Back
                </button>

                <div style={{ height: '25%', margin: '5% 0 0 0' }}> 
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
                    <FormField key="name" name="name" label="Card Name" value={formData.name} onChange={handleChange} required={true} style={{ width : "90%", paddingBottom: "5%" }} />
                    <FormField key="bank" name="bank" label="Bank" required={true} style={{ width : "90%", paddingBottom: "5%" }}>
                        <select name="bank" value={formData["bank"]} onChange={handleChange} required={true}>
                            <option value="" disabled>Select a bank</option>
                            {banks.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.institution?.name} - {capitalize(opt.account_type)}
                                </option>
                            ))}
                        </select>
                    </FormField>
                    </div>
                    <PinkButton text = "Add a Card" style = {{ width: "40%", margin: "5%" }}/>
                </form>
            </PiggyBox>
    )

    return CARD_FORM
}