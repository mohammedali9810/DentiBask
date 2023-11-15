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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(Theme);
  const { lang, setLang } = useContext(Lang);
  const [edit,setEdit]= useState({username:false, password:false,phone:false,image:false});
  const [user,setUser]= useState({});
  const [modifieduser,setModifiedUser]= useState({username:'',password:'',phone:'',image:"",vertifypassword:""});
  const [usererr,setUserErr]= useState({username:'',password:'',phone:'',vertifypassword:""});

useEffect(()=>{
  axiosinstance.get('/User/userdata/',
  {headers: {'Content-Type': 'application/json',
  'Authorization': 'Bearer '+localStorage.getItem('dentibask-access-token'),
}
  ,withCredentials:true})
  .then((response)=>{setUser(response.data);}).catch((err)=>{console.log(err)});
},[])

const handlechanges = (e)=>{
  if(e.target.name === 'username'){
    setModifiedUser({...modifieduser,username:e.target.value});
  }
  else if(e.target.name === 'password'){
    setModifiedUser({...modifieduser,password:e.target.value});
  }
  else if(e.target.name === 'phone'){
    setModifiedUser({...modifieduser,phone:e.target.value});
  }
  else if(e.target.name === 'image'){
    setModifiedUser({...modifieduser,image:e.target.files[0]});
  }
  else if (e.target.name === 'vertifypassword') {
    setModifiedUser({ ...modifieduser, vertifypassword: e.target.value });
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
const senddata = async (e)=>{
  e.preventDefault();
  if(modifieduser.vertifypassword === ""){
    setUserErr({...usererr, vertifypassword:"Required!"})
  }
  else if (usererr.password ==="" && usererr.phone ==="" && usererr.username===""){
    const csrfToken = await axiosinstance.get("/Products/get_csrf_token/");
    console.log(csrfToken.data.csrfToken);
    axiosinstance.put('/User/update_customer/',modifieduser,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': csrfToken.data.csrfToken,
        'Authorization': 'Bearer '+localStorage.getItem('dentibask-access-token'),
      },
      withCredentials: true,
    }
    )
    .then((res)=>{navigate('/')})
    .catch((err)=>{console.log(err)});
  }
  
}
/////////////////////////////////////////////////////////////////////////////////////////
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
                 <label style={{textAlign:"left",width:"5rem",marginRight:"5rem",color:"#1976d2"}}>
                  {lang ? " اسم المستخدم":"Username"}</label>
                  <label >{user.name}</label>
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
                </>}
                  {!edit.username && <Button variant="contained" color="warning"
                   onClick={()=>setEdit({...edit,username:true})}>{lang ? "تغيير":"Change"}</Button>}
                  {edit.username &&<>
                  <Button  onClick={()=>{setEdit({...edit,username:false});setModifiedUser({...modifieduser,username:""})}} 
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
                 <label style={{textAlign:"left",width:"5rem",marginRight:"5rem",color:"#1976d2"}}>
                  {lang ? " كلمة السر ":"Password"}</label>
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
                </>}
                  {!edit.password && <Button variant="contained" color="warning"
                   onClick={()=>setEdit({...edit,password:true})}>{lang ? "تغيير":"Change"}</Button>}
                  {edit.password &&<>
                  <Button  onClick={()=>{setEdit({...edit,password:false});setModifiedUser({...modifieduser,password:""})}}
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
                  <label >{user.phone}</label>
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
                </>}
                  {!edit.phone && <Button variant="contained" color="warning"
                   onClick={()=>setEdit({...edit,phone:true})}>{lang ? "تغيير":"Change"}</Button>}
                  {edit.phone &&<>
                  <Button  onClick={()=>{setEdit({...edit,phone:false});setModifiedUser({...modifieduser,phone:""})}}
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
                 <label style={{textAlign:"left",width:"5rem",marginRight:"5rem",color:"#1976d2"}}>
                  {lang ? "الصورة الشخصيه":"Image"}</label>
                  <label ><img src={user.image} alt='user image'/></label>
          </div>
          {edit.image &&<>
            <label className="custom-upload-button">
  <Button
    fullWidth
    component="span"
    variant="contained"
    startIcon={<CloudUploadIcon />}
  >
    Upload Image
  </Button>
  <input
    type="file"
    name="image"
    accept="image/*"
    style={{display:"none"}}
    onChange={handlechanges}
  />
      </label>
                </>}
                  {!edit.image && <Button variant="contained" color="warning"
                   onClick={()=>setEdit({...edit,image:true})}>{lang ? "تغيير":"Change"}</Button>}
                  {edit.image &&<>
                  <Button  onClick={()=>{setEdit({...edit,image:false});setModifiedUser({...modifieduser,image:""})}}
                   variant="contained" color="warning">{lang ? " إلغاء ":"Cancel"}</Button> </>}      
        </div>

        </Paper>

{(modifieduser.password !=="" || modifieduser.phone !=="" || modifieduser.username !=="" || modifieduser.image !=="") && <Paper
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
        <div style={{fontWeight:"bold", fontSize:"1.2rem", display:"flex"}}> 
                 <label style={{textAlign:"left",width:"18rem",marginRight:"5rem",color:"#1976d2"}}>
                  {lang ? " تأكيد رمز المرور":"Vertify Password"}</label>
                 <TextField
                  required
                  style={{width:"80%",color: theme && 'white'}}
                  id="vertifypassword"
                  label={lang ? " تأكيد رمز المرور":"Vertify Password"}
                  name="vertifypassword"
                  autoComplete="vertifypassword"
                  InputProps={{
                    style: {height:"2.5rem",backgroundColor:"white"},
                  }}
                  onChange={handlechanges}
                  value={modifieduser.vertifypassword}
                />
          </div>
                  {<Button variant="contained" color="success" onClick={senddata}>{lang ? " تعديل ":"Apply modifications"}
                  </Button>}      
        </div>

        </Paper>}


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
