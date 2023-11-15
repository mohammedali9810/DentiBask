import React from 'react'
import logoimg from "./logo.png";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
const Emailsent = () => {
    const navigate = useNavigate();
  return (
    <div style={{display:"flex", justifyContent:"space-around", flexDirection:"column",alignItems:"center"}}>
        <p>A vertification email has been sent please vertify it!</p>
        <img src={logoimg} alt="logo image" />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={()=>{navigate("/Login")}}
          >
            Go to Login
          </Button>
    </div>
  )
}

export default Emailsent