import { Card, CardContent, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import styles from "./SelectBox.module.css"

export default function SelectBox({ label, options, cardstyle, itemstyle }) {
  const [selected, setSelected] = useState(0);
  const optionsdefault = ['Cartão de Crédito', 'Cartão de Débito', 'Cartão Pré-pago', 'Cartão de Crédito', 'Cartão de Débito', 'Cartão Pré-pago'];

  return (
    <Card
      sx={{
        backgroundColor : "#16102f",
        borderRadius : "15px",
        color: 'white',
        ...cardstyle
      }}>
      <CardContent style={{ height: "100%"}}>
        <Typography variant="h6" gutterBottom style={{ height: "10%" }}> 
          {label}

          
        </Typography>
        <div className = {styles["list"]}>
          {optionsdefault.map((option, index) => (
                <ListItemButton
                key={index}
                selected={selected === index}
                onClick={() => setSelected(index)}
                sx={{
                  borderRadius: "10px",
                  '&:hover': {
                    backgroundColor: '#710d9b',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#710d9b',
                  },
                  marginTop : "2%"
                }}
                >
              <ListItemText primary={option} />
            </ListItemButton>
          ))}
        </div>
      </CardContent>
    </Card>
  ); 
};
