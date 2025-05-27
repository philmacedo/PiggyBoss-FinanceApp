import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

export default function SelectButton({label, options, width, height}) {

  if(!options || options.length === 0) {
    options = ['option1']
  }

  const [option, setOption] = useState(options[0]);

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <FormControl fullWidth sx = {{ display: 'flex', flexDirection: 'column',  alignItems: 'center', width: "100%" }}>
        <InputLabel id="select-label" sx={{ color: '#f5f5f5', padding: '0 10%' }}>Bank</InputLabel>
        <Select
          labelId="select-label"
          value={option}
          label={label}
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#0f0b1f',
                color: '#f5f5f5',
              },
            },
          }}
          sx={{
            color: '#f5f5f5',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#f5f5f5',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#9B59B6',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF66C4',
            },
            '.MuiSvgIcon-root': {
              color: '#f5f5f5',
            },
            width : width,
            height : height
          }}

        >{options.map((opt, index) => (
          <MenuItem key={index} value={opt}>
            {opt}
          </MenuItem>
        ))}
        </Select>
    </FormControl>
  );
}