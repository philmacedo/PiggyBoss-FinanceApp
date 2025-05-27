import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function SimpleCard({ title, value, width, height, }) {
  return (
    <Card sx={{ 
      minWidth: 200, 
      borderRadius: 2, 
      boxShadow: 3, 
      bgcolor : "#16102f", 
      height : height, 
      width : width,
    }}>
      <CardContent  align="center" sx={{
        height : "100%",
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        padding : "0 0 0 5%",
        '&:last-child': {
          paddingBottom: 0,
        }
      }}>
        <Typography variant="h6" component="div" gutterBottom sx={{ color: "#f5f5f5" }} align='left'>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ color: "#f5f5f5" }} align='left'>
          $ {value}
        </Typography>
      </CardContent>
    </Card>
  );
}