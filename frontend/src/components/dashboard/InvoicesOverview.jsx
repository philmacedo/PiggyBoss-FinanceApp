import * as financeServices from "../../services/financeServices"
import { useEffect, useState } from "react"
import PiggyBox from "../PiggyBox"
import styles from './Dashboard.module.css'

export default function InvoicesOverview() {

    const [bills, setBills] = useState([])
    const [billsTotal, setBillsTotal] = useState(0)
    
    const today = new Date()
    const currentMonth = today.getMonth() + 1
    const currentYear = today.getFullYear()

    useEffect(() => {
        fetchData()
    }, [])

     const fetchData = async () => {
        try {
            // 1. Busca Transações E a lista de Cartões ao mesmo tempo
            const [allTransactions, allCards] = await Promise.all([
                financeServices.fetchTransactions(),
                financeServices.fetchCards()
            ]);

            // 2. Cria um "Dicionário" de cartões para busca rápida: { ID: "Nome do Cartão" }
            const cardMap = {};
            if (allCards) {
                allCards.forEach(card => {
                    cardMap[card.id] = card.name;
                });
            }

            if (allTransactions) {
                // 3. Filtrar transações: Mês Atual + Cartão + Despesa
                const cardTransactions = allTransactions.filter(tx => {
                    const txDate = new Date(tx.date);
                    const userTimezoneOffset = txDate.getTimezoneOffset() * 60000;
                    const adjustedDate = new Date(txDate.getTime() + userTimezoneOffset);
                    
                    const isSameMonth = (adjustedDate.getMonth() + 1) === currentMonth && adjustedDate.getFullYear() === currentYear;
                    const isCardExpense = tx.payment_method === 'card' && tx.transactions_type === 'expense';
                    
                    return isSameMonth && isCardExpense;
                });

                // 4. Calcular Total Geral
                const total = cardTransactions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
                setBillsTotal(total.toFixed(2));

                // 5. Agrupar e SOMAR por Nome do Cartão
                const groupedBills = cardTransactions.reduce((acc, curr) => {
                    // Resolve o ID do cartão. Se vier objeto, pega o ID. Se vier ID, usa direto.
                    const cardId = (typeof curr.card === 'object') ? curr.card.id : curr.card;
                    
                    // Busca o nome no mapa que criamos. Se não achar, usa "Unknown"
                    const cardName = cardMap[cardId] || "Unknown Card";

                    if (!acc[cardName]) {
                        acc[cardName] = 0;
                    }
                    acc[cardName] += parseFloat(curr.amount);
                    return acc;
                }, {});

                // 6. Transforma o objeto agrupado em array para exibir na tela
                const billsArray = Object.keys(groupedBills).map(cardName => ({
                    card__name: cardName,
                    total: groupedBills[cardName].toFixed(2)
                }));

                setBills(billsArray);
            }
        } catch (error) {
            console.error("Erro ao carregar faturas:", error);
        }
    }

    const INVOICES_OVERVIEW = (
        <PiggyBox style = {{ width : "45%", height : "90%", minwidth : "300px", background : "#0f0b1f"}} >
                
            <div className={styles["dashboard-head"]}>
                <h4>Invoices (This Month)</h4>
            </div>

            <div className={styles["dashboard-content-invoices"]} style = {{ }}>
                {
                    bills.length > 0 ? (
                        bills.map((element, index) => (
                            <PiggyBox key = {index} style = {{  width:"90%", height : "25%", background : "#16102f", flexDirection:"row", justifyContent : 'space-between', alignItems : 'center', padding : '5%' }}>
                                <p style={{fontWeight: 'bold'}}>{element.card__name}</p>
                                <p>R$ {element.total}</p>
                            </PiggyBox>
                        ))
                    ) : (
                        <p style={{color: '#888', marginTop: '20px'}}>No invoices found</p>
                    )
                }       
            </div>

            <div style = {{ margin: '5%', width: '85%', height: '10%', display: 'flex', justifyContent : 'space-between', alignItems : 'center' }}>
                <p>Total</p>
                <p>R$ {billsTotal}</p>
            </div>

        </PiggyBox>
    )

    return INVOICES_OVERVIEW
}