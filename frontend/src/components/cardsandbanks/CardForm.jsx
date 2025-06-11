import { useState, useEffect } from "react";
import FormField from "../../components/FormField";
import DarkBox from "../DarkBox";
import PinkButton from "../PinkButton";
import API from "../../utils/api";
import Image from "../Image";
import logo from "../../assets/nerd.png";
import { useAuth } from "../../context/AuthContext"


export default function CardForm( styles ){

    const { userInfo, loading } = useAuth()
    const [banks, setBanks] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        bank: '',
    })

    const fetchData = async () => {
        try {
            const getBanks = await API["finance"].get("bank_account")
            console.log(getBanks.data)

            setBanks(getBanks.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!userInfo && !loading) return
        
        fetchData()
      }, [userInfo])

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['bank', 'name'];
        const isValid = requiredFields.every(field => formData[field].trim() !== '');
        if (!isValid) {
            return;
        }

        try {
            await API["finance"].post("/card/", formData);
            setFormData({ name: '', bank: '',});
        } catch (err) {
            if (err.response?.data){
                console.log(Object.values(err.response.data).flat().join(' '));
            } else{
                console.log('Error adding card');
            }
        
            setSuccess('');
        }
    };

    const CARD_FORM = (
            <DarkBox 
                style = {{ 
                    height : "70%", 
                    width : "40%",
                    maxHeight: "600px",
                    display : "flex",
                    flexDirection : "column",
                    justifyContent : "space-around",
                    alignItems : "center",
                    }}>
                <div style={{ height: '25%', margin: '5% 0 0 0' }}> 
                    <Image scr = {logo} />
                </div>
                <form 
                    onSubmit={handleSubmit}
                    style = {{ 
                        height : "40%", 
                        width : "100%",
                        display : "flex",
                        flexDirection : "column",
                        justifyContent : "flex-start",
                        alignItems : "center",
                    }}>
                    <FormField
                        key="cardName"
                        name="cardName"
                        label="Card Name"
                        required={true}
                        style={{
                            width : "90%",
                            paddingBottom: "5%",
                        }}
                    >
                    </FormField>
                    <FormField
                        key="bank"
                        name="bank"
                        label="bank"
                        required={true}
                        style={{
                            width : "90%",
                            paddingBottom: "5%",
                        }}
                        >
                        <select
                            name="institution"
                            value={formData["bank"]}
                            onChange={handleChange}
                            required={true}
                            >
                            <option value="" disabled>
                                Select a bank
                            </option>
                            {banks.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.institution.name}
                                </option>
                            ))}
                        </select>
                    </FormField>
                </form>

                <PinkButton text = "Add a Card" style = {{ width: "40%", margin: "20px" }}/>
            </DarkBox>
    )

    return CARD_FORM
}
