import * as React from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo from '../assets/logo.png';

export default function SignFormComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '50px', width: '100%', marginBottom: '3px', bgcolor: 'background.paper', '& .MuiTab-root': { '&:focus': { outline: 'none' }, '&.Mui-selected': { outline: 'none' } } }}>
      <img src={logo} alt="Logo" style={{ height: '40px', margin: '0 10px',paddingLeft:'100px' }} />
      <Tabs value={value} onChange={handleChange}>
        <Tab label="home" component={Link} to="/home" />
        <Tab label="gallery" component={Link} to="/gallery" />
        <Tab label="orders" component={Link} to="/order" />
        <Tab label="contact" />
      </Tabs>
    </Box>
  );
}
