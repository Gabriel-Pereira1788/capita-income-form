import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import imageCard from "../Assets/image-card.jpg";

export default function Result({name,RPC,address}) {
  return (
    <Card sx={{ maxWidth: 450 ,width:'100%',minWidth:300}} elevation={3}>
      <CardMedia
        component="img"
        height="140"
        image={imageCard}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" >
          {'Endereço:' + address}
        </Typography>
         <Typography variant="body2" color="text.secondary">
          {'RPC:' + RPC}
        </Typography>
      </CardContent>
    </Card>
  );
}
