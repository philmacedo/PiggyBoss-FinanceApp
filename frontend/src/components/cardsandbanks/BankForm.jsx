import { useState, useEffect } from "react";
import FormField from "../../components/FormField";
import DarkBox from "../DarkBox";
import PinkButton from "../PinkButton";
import API from "../../utils/api";
import Image from "../Image";
import logo from "../../assets/nerd.png";
import { useAuth } from "../../context/AuthContext"

export default function BankForm( styles ){

    const { userInfo, loading } = useAuth()
    const [institutions, setInstitutions] = useState([])
    const accountTypeOptions = ["checking", "savings", "investment", "joint"]
    const [formData, setFormData] = useState({
        institution: '',
        accountType: '',
    })

    const fetchData = async () => {
        try {
            const getInstitutions = await API["finance"].get("institution")
            console.log(getInstitutions.data)

            setInstitutions(getInstitutions.data)
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

        const requiredFields = ['institution', 'accountType'];
        const isValid = requiredFields.every(field => formData[field].trim() !== '');
        if (!isValid) {
            return;
        }

        try {
            await API["finance"].post("/bank_account/", formData);
            setFormData({ institution: '', accountType: '',});
        } catch (err) {
            if (err.response?.data){
                console.log(Object.values(err.response.data).flat().join(' '));
            } else{
                console.log('Error adding bank_account');
            }
        
            setSuccess('');
        }
    };

    const BANK_FORM = (
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
                        key="institution"
                        name="institution"
                        label="Institution"
                        required={true}
                        style={{
                            width : "90%",
                            paddingBottom: "5%",
                        }}
                        >
                        <select
                            name="institution"
                            value={formData["institution"]}
                            onChange={handleChange}
                            required={true}
                            >
                            <option value="" disabled>
                                Select a institution
                            </option>
                            {institutions.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.name}
                                </option>
                            ))}
                        </select>
                    </FormField>
                    <FormField
                        key = "accountType"
                        name = "accountType"
                        label = "Account Type"
                        required= {true}
                        style={{
                            width : "90%"
                        }}
                        >
                        <select
                            name="accountType"
                            value={formData["accountType"]}
                            onChange={handleChange}
                            required={true}
                            >
                            <option value="" disabled>
                                "Select a Account Type"
                            </option>
                            {accountTypeOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </FormField>
                </form>

                <PinkButton text = "Add a Bank" style = {{ width: "40%", margin: "20px" }}/>
            </DarkBox>
    )

    return BANK_FORM
}
