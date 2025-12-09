import { Card, CardContent, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';
import styles from "./SelectBox.module.css"

export default function SelectBox({ 
    label, 
    options, 
    titlebuttonlabel, 
    titlebuttoncallback, 
    selectcallback, 
    deletecallback,
    cardstyle, 
    displayKey, // Chave para exibir o nome (ex: "name")
    displayFn,  // Função opcional para exibir nome complexo
    colorKey,   // Chave para cor (categorias)
    selectedIndex = -1 // Padrão -1 significa "nada selecionado"
}) {
    const [selected, setSelected] = useState(selectedIndex);

    // Sincroniza o estado visual interno com a prop externa
    useEffect(() => {
        setSelected(selectedIndex);
    }, [selectedIndex]);

    // Função para pegar o valor de texto do objeto
    const getName = (item) => {
        if (displayFn) return displayFn(item);
        if (displayKey) {
            // Suporta chaves aninhadas como 'institution.name'
            return displayKey.split('.').reduce((obj, key) => obj?.[key], item) || '';
        }
        return item; // Fallback se for string simples
    }

return (
        <Card sx={{ backgroundColor: "#16102f", borderRadius: "15px", color: 'white', ...cardstyle }}>
            <CardContent style={{ height: "100%", padding: "10px" }}>
                
                <Typography variant="h6" gutterBottom style={{ marginBottom: "10px", padding: "0 5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}> 
                    {label}
                    <button onClick={titlebuttoncallback} className={styles["title-button-label"]}>
                        {titlebuttonlabel}
                    </button>
                </Typography>

                <div className={styles["list"]}>
                    <List style={{ padding: 0 }}> 
                        {options.map((option, index) => (
                            <ListItemButton
                                key={index}
                                selected={selected === index}
                                onClick={() => selectcallback(option)} 
                                sx={{
                                    borderRadius: "10px",
                                    backgroundColor: selected === index ? '#f1109b' : 'rgba(255, 255, 255, 0.05)',
                                    '&:hover': { backgroundColor: selected === index ? '#f1109b' : 'rgba(255, 255, 255, 0.1)' },
                                    '&.Mui-selected': { backgroundColor: '#f1109b' },
                                    '&.Mui-selected:hover': { backgroundColor: '#f1109b' },
                                    marginTop: "5px",
                                    padding: "8px 10px",
                                    // Flexbox para separar texto do botão X
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {colorKey && option[colorKey] && (
                                        <span style={{ color: option[colorKey], fontSize: '1.5em', marginRight: '10px', lineHeight: '0', textShadow: '0 0 5px rgba(0,0,0,0.5)' }}>&#9679;</span>
                                    )}
                                    <ListItemText 
                                        primary={getName(option)} 
                                        primaryTypographyProps={{ color: 'white', fontSize: '0.9rem' }}
                                    />
                                </div>

                                {/* BOTÃO DE DELETAR (X) */}
                                <span 
                                    onClick={(e) => { 
                                        e.stopPropagation(); // Impede que selecione ao deletar
                                        if(deletecallback) deletecallback(option); 
                                    }}
                                    style={{ 
                                        color: '#ff4c4c', 
                                        fontWeight: 'bold', 
                                        fontSize: '1rem', 
                                        cursor: 'pointer',
                                        paddingLeft: '10px'
                                    }}
                                    title="Delete"
                                >
                                    ✕
                                </span>

                            </ListItemButton>
                        ))}
                    </List>
                </div>
            </CardContent>
        </Card>
    );
};