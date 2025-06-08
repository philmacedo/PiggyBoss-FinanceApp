import styles from "./CardsAndBanks.module.css"
import SelectBox from "../../components/cardsandbanks/SelectBox";
import DarkBox from "../../components/DarkBox";

export default function CardsAndBanks(){

    const CARDS_AND_BANKS = (
        <div className={styles["cardsandbanks"]}>
            <div className={styles["sidebar"]}>
                <SelectBox label="Banks"  cardstyle={{ width : "70%", height: "30%" }}/>
                <SelectBox label="Cards" cardstyle={{ width : "70%", height: "30%" }}/>
                <SelectBox label="Categories" cardstyle={{ width : "70%", height: "30%" }}/>
            </div>
            <div className={styles["content"]}>
                <DarkBox style={{ height : "90%" , width : "90%" }}/>
            </div>
        </div>
    )

    return CARDS_AND_BANKS;
}
