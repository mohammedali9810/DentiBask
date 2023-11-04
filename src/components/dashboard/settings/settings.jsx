import React, { useContext } from 'react';
import { Theme } from '../../themecontext';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Settings = () => {
  const { theme, setTheme } = useContext(Theme);

  const handleThemeChange = () => {
    setTheme(!theme);
  };

  const handleResetPassword = () => {
    // Add logic to reset the password here
    console.log('Resetting password...');
  };

  const handleChangeLanguage = () => {
    // Add logic to change the language here
    console.log('Changing language...');
  };

  return (
    <div>
      <h2>Settings</h2>
      <Paper
        elevation={3}
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme ? 'black' : 'white',
          color: theme ? 'white' : 'black',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p>Dark Mode</p>
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
          Reset Password
        </Button>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
          onClick={handleChangeLanguage}
        >
          Change Language
        </Button>
      </Paper>
    </div>
  );
};

export default Settings;
