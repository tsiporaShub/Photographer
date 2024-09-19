import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo from '../assets/logo.png';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FillDataCurrentUser } from '../redux/userAction';

export default function SignFormComponent() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUserData = sessionStorage.getItem('currentUser');

    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      dispatch(FillDataCurrentUser(currentUser));
    }

  }, [dispatch]);


  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '50px', width: '100%', marginBottom: '3px', bgcolor: 'background.paper', '& .MuiTab-root': { '&:focus': { outline: 'none' }, '&.Mui-selected': { outline: 'none' } } }}>
      <img src={logo} alt="Logo" style={{ height: '40px', margin: '0 10px', paddingLeft: '100px' }} />
      <Tabs value={value} onChange={handleChange}>
        <Tab label="home" component={Link} to="/home" />
        <Tab label="gallery" component={Link} to="/gallery" />
        <Tab label="orders" component={Link} to="/order" />
        <Tab label="contact" />
      </Tabs>
    </Box>
  );
}
