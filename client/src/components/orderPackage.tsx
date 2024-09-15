import { useState } from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { OrderPackage } from '../interfaces/orderPackage.interface';
import { addOrder } from '../api/orderPackage.api';

const packages = ['Chalake', 'NewBorn', 'SmathCake', 'Family', 'Children'];

const inputStyle = {
    width: '300px',
};

export default function OrderFormComponent() {
    const userId = 1;
    const [open, setOpen] = useState(false);
    const [packageName, setPackageName] = useState('');
    const [packageId, setPackageId] = useState(0);
    const [date, setDate] = useState('');
    const [beginningHour, setBeginningHour] = useState('');
    const [endHour, setEndHour] = useState('');

    const handleAddOrder = async () => {
        try {
            const order : OrderPackage = {
                id: 0,
                userId,
                packageId,
                date,
                beginningHour,
                endHour
            };
            console.log(order);
            // const response = await addOrder(order);
            // console.log('Order added successfully:', response);
            setPackageId(0);
            setDate('');
            setBeginningHour('');
            setEndHour('');
        } catch (error) {
            console.log('Error adding order:', error);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Add Order</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Order Form</DialogTitle>
                <DialogContent>
                    <br />
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{ width: '390px' }}>photography package</InputLabel>
                            <Select
                                label="photography package"
                                value={packageName}
                                onChange={(e) => setPackageName(e.target.value)}
                                style={inputStyle}
                            >
                                {packages.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <br /><br />
                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        // InputLabelProps={{ style: { paddingLeft: '25px' } }}
                        style={inputStyle}
                    />
                    <br /><br /><br />
                    <TextField
                        label="Beginning Hour"
                        type="time"
                        value={beginningHour}
                        onChange={(e) => setBeginningHour(e.target.value)}
                        // InputLabelProps={{ style: { paddingLeft: '25px' } }}
                        style={inputStyle}
                    />
                    <br /><br /><br />
                    <TextField
                        label="End Hour"
                        type="time"
                        value={endHour}
                        onChange={(e) => setEndHour(e.target.value)}
                        // InputLabelProps={{ style: { paddingLeft: '25px' } }}
                        style={inputStyle}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddOrder} variant="contained">send</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
