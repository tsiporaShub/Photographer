import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo from '../assets/logo.png';

export default function SignFormComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height:'50px' , width: '100%', bgcolor: 'background.paper', '& .MuiTab-root': { '&:focus': { outline: 'none' }, '&.Mui-selected': { outline: 'none' } }}}>
      <img src={logo} alt="Logo" style={{ height: '40px', margin: '0 10px' }} />
      <Tabs value={value} onChange={handleChange}>
        <Tab label="home" />
        <Tab label="gallery" />
        <Tab label="orders" />
        <Tab label="contact" />
      </Tabs>
    </Box>
  );
}