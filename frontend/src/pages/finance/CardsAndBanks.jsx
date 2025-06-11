import styles from "./CardsAndBanks.module.css"
import SelectBox from "../../components/cardsandbanks/SelectBox";
import DarkBox from "../../components/DarkBox";
import BankForm from "../../components/cardsandbanks/BankForm";
import CardForm from "../../components/cardsandbanks/CardForm";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"
import API from "../../utils/api";
import * as financeServices from "../../services/financeServices"

export default function CardsAndBanks(){

    const { userInfo, loading } = useAuth()
    const [categories, setCategories] = useState([]);
    const [cards, setCards] = useState([]);
    const [banks, setBanks] = useState([]);
    const [callCreateForm, setCallCreateForm] = useState("");

    useEffect(() => {
        if (!userInfo && !loading) return 

        fetchOptions()
    }, [userInfo, loading])

    const fetchOptions = async () => {
        try {
            const [catRes, cardRes, bankRes] = await Promise.all([
                API["finance"].get("/category/"),
                API["finance"].get("/card/"),
                API["finance"].get("/bank_account/"),
            ]);

            setCategories(catRes.data)
            setCards(cardRes.data)
            setBanks(bankRes.data)

        } catch (err) {
            if (err.response?.status === 401) {
                console.log("Session Expired.");
            } else if (err.response?.data) {
                console.log(Object.values(err.response.data).flat().join(' '));
            }
        }
    }

    const CARDS_AND_BANKS = (
        <div className={styles["cardsandbanks"]}>
            <div className={styles["sidebar"]}>

                <SelectBox label="Banks" 
                options = {banks.map(bank => bank.institution.name)} 
                cardstyle={{ width : "70%", height: "30%" }}
                titlebuttonlabel="+"
                titlebuttoncallback={() => console.log("teste")}
                />

                <SelectBox label="Cards" 
                options = {cards.map(card => card.name)} 
                cardstyle={{ width : "70%", height: "30%" }}
                titlebuttonlabel="+"
                titlebuttoncallback={() => console.log("teste")}
                />

                <SelectBox label="Categories" 
                options = {categories.map(cat => cat.name)} 
                cardstyle={{ width : "70%", height: "30%" }}
                titlebuttonlabel="+"
                titlebuttoncallback={() => console.log("teste")}
                />

            </div>
            <div className={styles["content"]}>
                
                    {/* <BankForm/>  */}
                    <CardForm />
                
            </div>
        </div>
    )

    return CARDS_AND_BANKS;
}
