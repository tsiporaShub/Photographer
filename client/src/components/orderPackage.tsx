import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Select, MenuItem, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { OrderPackage } from '../interfaces/orderPackage.interface';
import { useSelector } from 'react-redux';
import { getPhotographyPackages } from '../api/photographyPackage.api';
import { addOrderPackage } from '../api/orderPackage.api';
import { validateFields, validateDate, validateHours } from '../utils/validation';
import Swal from 'sweetalert2';

export default function OrderFormComponent() {
    const userId: number = useSelector((state: any) => (state.userReducer.currentUser.id));
    const [packageId, setPackageId] = useState('');
    const [date, setDate] = useState('');
    const [beginingHour, setBeginingHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [note, setNote] = useState('');
    const [packages, setPackages] = useState([{ id: 0, type: '', moneyToHour: 0 }]);

    useEffect(() => {
        const fetchPhotographyPackage = async () => {
            try {
                const data = await getPhotographyPackages();
                console.log(data);
                setPackages(data);
            } catch (error) {
                console.error('Error fetching photography package:', error);
            }
        };

        fetchPhotographyPackage();
    }, []);

    const handleAddOrder = async () => {
        try {
            const fieldsError = validateFields(packageId, date, beginingHour, endHour);
            if (fieldsError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: fieldsError,
                });
                return;
            }

            const dateError = validateDate(date);
            if (dateError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: dateError,
                });
                return;
            }

            const hoursError = validateHours(beginingHour, endHour);
            if (hoursError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: hoursError,
                });
                return;
            }

            const selectedPackage = packages.find(item => item.id === Number(packageId));
            const totalHours = (new Date(`2000-01-01T${endHour}:00`).getTime() - new Date(`2000-01-01T${beginingHour}:00`).getTime()) / 3600000;
            const totalPrice = selectedPackage!.moneyToHour * totalHours;

            Swal.fire({
                icon: 'info',
                title: 'Total Price',
                text: `Total Price: $${totalPrice.toFixed(2)}`,
                showCancelButton: true,
                confirmButtonText: 'Continue',
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    const order: OrderPackage = {
                        id: 0,
                        userId,
                        packageId: Number(packageId),
                        date: date.replace(/-/g, '/'),
                        beginingHour,
                        endHour,
                        note
                    };

                    addOrderPackage(order).then((response) => {
                        console.log('Order added successfully:', response);

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Order added successfully!',
                        });
                        setPackageId('');
                        setDate('');
                        setBeginingHour('');
                        setEndHour('');
                        setNote('');
                    }).catch((error: any) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.response.data,
                        });
                    });
                }
            });
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data,
            });
        }
    };


    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '400px',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '10px',
        margin: 'auto',
        marginTop: '8vh',
        marginBottom: '10vh',
    };

    const inputStyle: React.CSSProperties = {
        height: '55px',
        width: '100%',
        marginBottom: '30px',
    };

    return (
        <div style={containerStyle}>
            <Typography variant="h4">Add Order Form</Typography>
            <FormControl fullWidth style={inputStyle}>
                <InputLabel id="demo-simple-select-label">Photography Package</InputLabel>
                <Select
                    label="Photography Package"
                    value={packageId}
                    onChange={(e) => setPackageId(e.target.value)}
                >
                    {packages.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <span style={{ marginRight: 'auto' }}>{`${option.type}`}</span>
                                <span style={{ marginLeft: 'auto' }}>{`${option.moneyToHour}$ per hour`}</span>
                            </div>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={inputStyle}
            />
            <TextField
                label="Begining Hour"
                type="time"
                value={beginingHour}
                onChange={(e) => setBeginingHour(e.target.value)}
                style={inputStyle}
            />
            <TextField
                label="End Hour"
                type="time"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                style={inputStyle}
            />
            <TextField
                label="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={inputStyle}
            />
            <Button variant="contained" onClick={handleAddOrder}>Add Order</Button>
        </div>
    );
};
