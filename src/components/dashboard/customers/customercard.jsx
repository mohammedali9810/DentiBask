import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import theimage from "./door.jpg";
const Customercard = () => {
  return (
    <Card sx={{ width:345 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="200"
        image={theimage}
        alt="green iguana"

      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Shaher emad
        </Typography>
        <Typography variant="body2" color="text.secondary">
          birth date : 1 / 1 /1996
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: Giza
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email : shaher@gmail.com
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="large" color="success">
        See Orders
      </Button>
      <Button size="large" color="error">
        Delete
      </Button>
    </CardActions>
  </Card>
  )
}

export default Customercard;