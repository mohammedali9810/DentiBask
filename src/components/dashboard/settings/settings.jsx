import React, { useContext } from 'react';
import { Theme } from '../../themecontext';
import { Lang} from "../../langcontext";
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Settings = () => {
  const { theme, setTheme } = useContext(Theme);
  const { lang, setLang } = useContext(Lang);

  const handleThemeChange = () => {
    setTheme(!theme);
  };

  const handleResetPassword = () => {

    console.log('Resetting password...');
  };

  const handleChangeLanguage = () => {
    console.log(lang)
    setLang(!lang);
  };

  return (
      <Paper
        elevation={3}
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme ? 'black' : '#CDCDCD',
          color: theme ? 'white' : 'black',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p>{lang ? "الوضع الليلي":"Dark Mode"}</p>
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
          style={{ marginTop: '16px' }}
          onClick={handleResetPassword}
        >
          {lang ? "قم بتغيير كلمة المرور ":"Reset Password"}
        </Button>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
          onClick={handleChangeLanguage}
        >
          {lang ? "قم بتغيير اللغه ":"Change Language"}
        </Button>
      </Paper>
  );
};

export default Settings;
