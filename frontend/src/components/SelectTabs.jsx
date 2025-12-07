import React from 'react'; // Removido o 'useState'
import { Tabs, Tab, Box } from '@mui/material'; // Removido o 'colors' (não usado)

// 1. Adicionada a prop 'value' (o valor selecionado)
// 2. Removida a prop 'def' (agora controlada pelo 'value')
export default function SelectTabs({ options = [], onSelect, value, styles, indicator = true }) {

  // 3. REMOVIDO o useState interno:
  // const [selectedIndex, setSelectedIndex] = useState(def);

  // 4. Calcular o índice com base no 'value' recebido do pai
  const selectedIndex = options.indexOf(value);

  const handleChange = (event, newIndex) => {
    // 5. Enviar o VALOR (não o índice) para o pai
    onSelect?.(options[newIndex]);
  };

  return (
    <Box sx={{ width: '100%', display: "flex", justifyContent: "center", alignItems: "center", ...styles }}>
      <Tabs
        // 6. O 'value' do Tabs é o índice. 
        //    Se o 'value' da prop for null/undefined, selectedIndex será -1.
        //    'false' no MUI Tabs significa "nenhuma aba selecionada".
        value={selectedIndex === -1 ? false : selectedIndex}
        onChange={handleChange}
        textColor="inherit" 
        scrollButtons="auto"
        variant="scrollable"
        slotProps={{
          indicator: {
            sx: {
              backgroundColor: indicator ? '#f1109b' : "transparent"
            }
          }
        }}
      > 
        
        {options.map((opt, idx) => (
          <Tab
            key={idx}
            label={opt}
            sx={{
              color: indicator ? "#FF66C4" : "#F5F5F5",
              '&.Mui-selected': {
                color:'#FF66C4',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}