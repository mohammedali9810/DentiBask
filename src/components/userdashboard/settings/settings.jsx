import React, { useContext, useEffect, useState } from 'react';
import { Theme } from '../../themecontext';
import { Lang} from "../../langcontext";
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import "./settings.css";
import TextField from '@mui/material/TextField';
import axiosinstance from '../../../axiosconfig';
import {useNavigate} from "react-router-dom";
const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(Theme);
  const { lang, setLang } = useContext(Lang);
  const [edit,setEdit]= useState({username:false, password:false,email:false,phone:false});
  const [user,setUser]= useState();
  const [modifieduser,setModifiedUser]= useState({username:'',password:'',email:'',phone:'',
  usercheck:'',emailcheck:'',passcheck:'',phonecheck:''});
  const [usererr,setUserErr]= useState({username:'',password:'',email:'',phone:''});

useEffect(()=>{
  axiosinstance.get('/userdata',{headers: {'Content-Type': 'application/json'},withCredentials:true})
  .then((response)=>{setUser(response.data.user)}).catch((err)=>{console.log(err)});
},[])

const handlechanges = (e)=>{
  if(e.target.name === 'username'){
    setModifiedUser({...modifieduser,username:e.target.value});
  }
  if(e.target.name === 'password'){
    setModifiedUser({...modifieduser,password:e.target.value});
  }
  if(e.target.name === 'email'){
    setModifiedUser({...modifieduser,email:e.target.value});
  }
  if(e.target.name === 'phone'){
    setModifiedUser({...modifieduser,phone:e.target.value});
  }
  if(e.target.name === 'usercheck'){
    setModifiedUser({...modifieduser,usercheck:e.target.value});
  }
  if(e.target.name === 'passcheck'){
    setModifiedUser({...modifieduser,passcheck:e.target.value});
  }
  if(e.target.name === 'emailcheck'){
    setModifiedUser({...modifieduser,emailcheck:e.target.value});
  }
  if(e.target.name === 'phonecheck'){
    setModifiedUser({...modifieduser,phonecheck:e.target.value});
  }
}

  const handleThemeChange = () => {
    setTheme(!theme);
  };


  const handleChangeLanguage = () => {
    console.log(lang)
    setLang(!lang);
  };

  return (
    <>
      <Paper
        elevation={3}
        style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme ? '#0e0449' : 'white',
          color: theme ? 'white' : '#1976D2',
          justifyContent:"space-around",
          
        }}
        className='firstpaper'
      >
        <div style={{ display: 'flex', alignItems: 'center',justifyContent:"space-around", width:"20%" }}>
          <p style={{margin:"0", fontSize:"1.2rem",fontWeight:"bold"}}>{lang ? "الوضع الليلي":"Dark Mode"}</p>
          <Switch
            checked={theme}
            onChange={handleThemeChange}
            name="mode"
            color="primary"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleChangeLanguage}
        >
          {lang ? "قم بتغيير اللغه ":"Change Language"}
        </Button>
      </Paper>
        <Paper
          elevation={3}
        style={{
          marginTop:"1rem",
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme ? '#0e0449' : 'white',
          color: theme ? 'white' : 'black',
          flexDirection:"column", justifyContent:"space-around"
        }}
      >
        <div className='settings-data'>
          <div style={{fontWeight:"bold", fontSize:"1.2rem"}}> 
                 <label style={{textAlign:"left",width:"5rem",marginRight:"5rem",color:"#1976d2"}}>{lang ? " اسم المستخدم":"Username"}</label>
                  <label >Shaher emad mohammed</label>
          </div>
         
          {edit.username &&<><TextField
                  required
                  style={{width:"20%",color: theme && 'white'}}
                  id="username"
                  label={lang ? " اسم المستخدم":"Username"}
                  name="username"
                  autoComplete="username"
                  InputProps={{
                    style: {height:"2.5rem",backgroundColor:"white"},
                  }}
                  onChange={handlechanges}
                  value={modifieduser.username}
                />
                <TextField
                  required
                  style={{width:"20%",color: theme && 'white'}}
                  id="password"
                  label={lang ? " كلمة السر":"Password"}
                  name="usercheck"
                  autoComplete="password"
                  type='password'
                  InputProps={{
                    style: {height:"2.5rem",backgroundColor:"white"},
                  }}
                  onChange={handlechanges}
                  value={modifieduser.usercheck}
                />
                </>}
                  {!edit.username && <Button variant="contained" color="warning"
                   onClick={()=>setEdit({...edit,username:true})}>{lang ? "تغيير":"Change"}</Button>}
                  {edit.username &&<> <Button variant="contained" color="success">{lang ? " تعديل ":"Edit"}</Button>
                  <Button  onClick={()=>setEdit({...edit,username:false})} 
                  variant="contained" color="warning">{lang ? " إلغاء ":"Cancel"}</Button> </>}      
        </div>
        </Paper>
        <Paper
          elevation={3}
        style={{
          marginTop:"1rem",
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme ? '#0e0449' : 'white',
          color: theme ? 'white' : 'black',
          flexDirection:"column", justifyContent:"space-around"
        }}
      >
        <div className='settings-data'>
        <div style={{fontWeight:"bold", fontSize:"1.2rem"}}> 
                 <label style={{textAlign:"left",width:"5rem",marginRight:"5rem",color:"#1976d2"}}>{lang ? " البريد الإلكتروني ":"Email"}</label>
                  <label >Shaher@gmail.com</label>
          </div>
          {edit.email &&<><TextField
                  required
                  style={{width:"20%",color: theme && 'white'}}
                  id="email"
                  label={lang ? " البريد الإلكتروني ":"Email"}
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    style: {height:"2.5rem",backgroundColor:"white"},
                  }}
                  onChange={handlechanges}
                  value={modifieduser.email}
                />
                <TextField
                  required
                  style={{width:"20%",color: theme && 'white'}}
                  id="password"
                  label={lang ? " كلمة السر":"Password"}
                  name="emailcheck"
                  autoComplete="password"
                  type='password'
                  InputProps={{
                    style: {height:"2.5rem",backgroundColor:"white"},
                  }}
                  onChange={handlechanges}
                  value={modifieduser.emailcheck}
                />
                </>}
                  {!edit.email && <Button variant="contained" color="warning"
                   onClick={()=>setEdit({...edit,email:true})}>{lang ? "تغيير":"Change"}</Button>}
                  {edit.email &&<> <Button variant="contained" color="success">{lang ? " تعديل ":"Edit"}</Button>
                  <Button  onClick={()=>setEdit({...edit,email:false})} 
                  variant="contained" color="warning">{lang ? " إلغاء ":"Cancel"}</Button> </>}      
        </div>
        </Paper>
        <Paper
          elevation={3}
        style={{
          marginTop:"1rem",
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme ? '#0e0449' : 'white',
          color: theme ? 'white' : 'black',
          flexDirection:"column", justifyContent:"space-around"
        }}
      >
        <div className='settings-data'>
        <div style={{fontWeight:"bold", fontSize:"1.2rem"}}> 
                 <label style={{textAlign:"left",width:"5rem",marginRight:"5rem",color:"#1976d2"}}>{lang ? " كلمة السر ":"Password"}</label>
                  <label >********</label>
          </div>
          {edit.password &&<><TextField
                  required
                  style={{width:"20%",color: theme && 'white'}}
                  id="password"
                  label={lang ? " كلمة السر الجديده ":"New Password"}
                  name="password"
                  autoComplete="password"
                  type='password'
                  InputProps={{
                    style: {height:"2.5rem",backgroundColor:"white"},
                  }}
                  onChange={handlechanges}
                  value={modifieduser.password}
                />
                <TextField
                  required
                  style={{width:"20%",color: theme && 'white'}}
                  id="password"
                  label={lang ? " كلمة السر القديمه ":"Old Password"}
                  name="passcheck"
                  autoComplete="password"
                  type='password'
                  InputProps={{
                    style: {height:"2.5rem",backgroundColor:"white"},
                  }}
                  onChange={handlechanges}
                  value={modifieduser.passcheck}
                />
                </>}
                  {!edit.password && <Button variant="contained" color="warning"
                   onClick={()=>setEdit({...edit,password:true})}>{lang ? "تغيير":"Change"}</Button>}
                  {edit.password &&<> <Button variant="contained" color="success">{lang ? " تعديل ":"Edit"}</Button>
                  <Button  onClick={()=>setEdit({...edit,password:false})}
                   variant="contained" color="warning">{lang ? " إلغاء ":"Cancel"}</Button> </>}      
        </div>
        </Paper>
        <Paper
          elevation={3}
        style={{
          marginTop:"1rem",
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme ? '#0e0449' : 'white',
          color: theme ? 'white' : 'black',
          flexDirection:"column", justifyContent:"space-around"
        }}
      >
        <div className='settings-data'>
        <div style={{fontWeight:"bold", fontSize:"1.2rem"}}> 
                 <label style={{textAlign:"left",width:"5rem",marginRight:"5rem",color:"#1976d2"}}>{lang ? " رقم الموبايل":"Phone"}</label>
                  <label >0111216161</label>
          </div>
          {edit.phone &&<><TextField
                  required
                  style={{width:"20%",color: theme && 'white'}}
                  id="phone"
                  label={lang ? " رقم الموبايل":"Phone"}
                  name="phone"
                  autoComplete="phone"
                  InputProps={{
                    style: {height:"2.5rem",backgroundColor:"white"},
                  }}
                  onChange={handlechanges}
                  value={modifieduser.phone}
                />
                <TextField
                  required
                  style={{width:"20%",color: theme && 'white'}}
                  id="password"
                  label={lang ? " كلمة السر":"Password"}
                  name="phonecheck"
                  autoComplete="password"
                  type='password'
                  InputProps={{
                    style: {height:"2.5rem",backgroundColor:"white"},
                  }}
                  onChange={handlechanges}
                  value={modifieduser.phonecheck}
                />
                </>}
                  {!edit.phone && <Button variant="contained" color="warning"
                   onClick={()=>setEdit({...edit,phone:true})}>{lang ? "تغيير":"Change"}</Button>}
                  {edit.phone &&<> <Button variant="contained" color="success">{lang ? " تعديل ":"Edit"}</Button>
                  <Button  onClick={()=>setEdit({...edit,phone:false})}
                   variant="contained" color="warning">{lang ? " إلغاء ":"Cancel"}</Button> </>}      
        </div>

        </Paper>
        <Paper
        elevation={3}
        style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme ? '#0e0449' : 'white',
          color: theme ? 'white' : '#1976D2',
          justifyContent:"space-around",
          marginTop:"2rem"
          
        }}
        className='firstpaper'
      >
        <Button
          variant="contained"
          color="primary"
          onClick={()=>{navigate("/")}}
          style={{width:"80%"}}
        >
          {lang ? "العودة إلى القائمة الرئيسيه":"Back To Home"}
        </Button>
      </Paper>   
        </>
  );
};

export default Settings;
