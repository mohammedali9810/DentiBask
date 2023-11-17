import React,{useState, useContext} from 'react';
import { Button, CardActionArea, CardActions, Dialog, DialogContent, DialogTitle,Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper, DialogContentText,
  DialogActions,Select, MenuItem } from '@mui/material';
import userimage from "./logo.png";
import axiosinstance from "../../../axiosconfig";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Theme } from "../../themecontext";
import { useNavigate } from 'react-router';
const Customercard = (props) => {
  const navigate = useNavigate();
  const [showorders, setShoworders] = useState(false);
  const { theme } = useContext(Theme);
  const [orders,setOrders] = useState([]);

  const showuserorders = async()=>{
    axiosinstance.get(`/User/get_one_user_orders/?customer_email=${props.customer.email}`,
    {headers:{'Content-Type':'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('dentibask-access-token')},
withCredentials:true})
.then((res)=>{setOrders(res.data.orders); setShoworders(!showorders);})
.catch((err)=>{console.log(err)});

  }
  const handleCloseShowProductsDialog = () => {
    setShoworders(false);
  };
  return (<>
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        <CardMedia
        style={{height:"20rem",objectFit: 'contain' }}
          component="img"
          image={props.customer.image ? props.customer.image : userimage}
          alt="Customer Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.customer.name} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {props.customer.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phone: {props.customer.phone}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" color="success" onClick={showuserorders}>
          See Orders
        </Button>
        <Button onClick={()=>{
          axiosinstance.delete(`/User/delete_user/`, {
            data: { customer_email: props.customer.email },
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + localStorage.getItem('dentibask-access-token'),
            },
          })
          .then(res => {
          })
          .catch(err => {
            console.error(err);
          });
          
        }} size="large" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
    <Dialog open={showorders} onClose={handleCloseShowProductsDialog} fullWidth
    maxWidth="lg">
      <DialogTitle>Orders</DialogTitle>
      <DialogContent>
      {orders.length> 0 ? <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length && orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{props.customer.email}</TableCell>
                <TableCell>{order.created_at}</TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>
  <Select
    value={order.status}
  >
    <MenuItem value="Canceled" style={{ color: 'red' }}>
      Canceled
      
    </MenuItem>
    <MenuItem value="Processing" style={{ color: 'blue' }}>
      Processing
    </MenuItem>
    <MenuItem value="Shipped" style={{ color: 'gray' }}>
      Shipped
    </MenuItem>
    <MenuItem value="Delivered" style={{ color: 'green' }}>
      Delivered
    </MenuItem>
    <MenuItem value="Other" style={{ color: 'black' }}>
      Other
    </MenuItem>
  </Select>
</TableCell>

                <TableCell>
                  <Button
                    onClick={() => {navigate(`/orderdetails/${order.id}`)}}
                    variant="outlined"
                    color="primary"
                  >
                    See Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> : <p style={{textAlign:"center", fontSize:"1.5rem", fontWeight:"bold"}}>
        This Customer Has No previous Orders</p>}
    </DialogContent>
  </Dialog>
  </>
  );
};

export default Customercard;
