import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { OrderPackage } from '../../interfaces/orderPackage.interface';
import { PhotographyPackage } from '../../interfaces/photographyPackage.interface';
import { addOrderPackage, deleteOrderPackage, EditOrderPackage, getOrderPackages } from '../../api/orderPackage.api';
import { getPhotographyPackages } from '../../api/photographyPackage.api';
import { Dialog, DialogTitle, DialogContent, TextField, Typography, IconButton, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { GetUsers } from '../../api/user.api';
import { User } from '../../interfaces/user.interface';
import { Add, Edit, Delete, Save, Close } from '@mui/icons-material';
import { isTokenValid } from '../../utils/checkToken';
import { validateFields, validateDate, validateHours } from '../../utils/validation';
import Swal from 'sweetalert2';

const localizer = momentLocalizer(moment);

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<OrderPackage[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderPackage | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [photographyPackages, setPhotographyPackages] = useState<PhotographyPackage[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [userId, setUserId] = useState('');
    const [packageId, setPackageId] = useState('');
    const [date, setDate] = useState('');
    const [beginingHour, setBeginningHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [note, setNote] = useState('');
    const [editedOrder, setEditedOrder] = useState<OrderPackage | null>(null);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response: OrderPackage[] = await getOrderPackages();
                setOrders(response);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        const fetchPhotographyPackages = async () => {
            try {
                const response: PhotographyPackage[] = await getPhotographyPackages();
                setPhotographyPackages(response);
            } catch (error) {
                console.error('Error fetching photography packages:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response: User[] = await GetUsers();
                setUsers(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchOrders();
        fetchPhotographyPackages();
        fetchUsers();
    }, []);

    const handleSelectEvent = (event: OrderPackage) => {
        setSelectedOrder(event);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedOrder(null);
        setOpenDialog(false);
        setOpenAddDialog(false);
        setEditMode(false);
        setPackageId('');
        setUserId('');
        setDate('');
        setBeginningHour('');
        setEndHour('');
        setNote('');
        setOpenAddDialog(false);
    };

    const handleCloseEdit = () => {
        setEditMode(false);
        setEditedOrder(null);
    };

    const getUserById = (userId1: number) => {
        return users.find(user => user.id === userId1);
    };

    const enterEditMode = () => {
        setEditMode(true);
        setEditedOrder(selectedOrder);
    };

    const handleSaveChanges = async () => {
        try {
            if (!selectedOrder) {
                return;
            }

            const updatedOrder: OrderPackage = {
                ...editedOrder!,
            };

            const dateError = validateDate(updatedOrder.date);
            if (dateError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: dateError,
                });
                return;
            }

            const hoursError = validateHours(updatedOrder.beginingHour, updatedOrder.endHour);
            if (hoursError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: hoursError,
                });
                return;
            }

            const updatedOrders = orders.map(order =>
                order.id === selectedOrder.id ? updatedOrder : order
            );
            setOrders(updatedOrders);

            const response = await EditOrderPackage(updatedOrder.id, updatedOrder);
            console.log('Order updated successfully:', response);

            setEditMode(false);
            setSelectedOrder(editedOrder);
            setEditedOrder(null);
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data,
            });
        }
    };


    const handleDeleteOrder = async () => {
        try {
            await deleteOrderPackage(selectedOrder!.id);
            setOrders(orders.filter(order => order.id !== selectedOrder!.id));
            setSelectedOrder(null);
            setOpenDialog(false);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleOpenDialog = () => {
        setOpenAddDialog(true);
    };

    const handleAddOrder = async () => {
        try {
            if (!isTokenValid()) {
                return;
            }

            const order = createOrderObject(userId, packageId, date, beginingHour, endHour, note);

            const validationError = validateOrder(order);
            if (validationError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: validationError,
                });
                return;
            }

            const selectedPackage = photographyPackages.find(item => item.id === Number(packageId));
            const totalHours = (new Date(`2000-01-01T${endHour}:00`).getTime() - new Date(`2000-01-01T${beginingHour}:00`).getTime()) / 3600000;
            const totalPrice = selectedPackage!.moneyToHour * totalHours;

            Swal.fire({
                icon: 'info',
                title: 'Total Price',
                text: `Total Price: ${totalPrice.toFixed(2)}`,
                showCancelButton: true,
                confirmButtonText: 'Continue',
                cancelButtonText: 'Cancel',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await addOrderPackage(order);

                    setOrders([...orders, response]);
                    clearOrderFields();
                    setOpenAddDialog(false);
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



    const createOrderObject = (userId: string, packageId: string, date: string, beginingHour: string, endHour: string, note: string): OrderPackage => {
        return {
            id: 0,
            userId: Number(userId),
            packageId: Number(packageId),
            date: date.replace(/-/g, '/'),
            beginingHour,
            endHour,
            note,
        };
    };

    const validateOrder = (order: OrderPackage): string | null => {
        const fieldsError = validateFields(String(order.packageId), order.date, order.beginingHour, order.endHour);
        if (fieldsError || !order.userId) {
            return fieldsError || 'Please select user';
        }

        const dateError = validateDate(order.date);
        if (dateError) {
            return dateError;
        }

        const hoursError = validateHours(order.beginingHour, order.endHour);
        if (hoursError) {
            return hoursError;
        }

        return null;
    };

    const clearOrderFields = () => {
        setPackageId('');
        setUserId('');
        setDate('');
        setBeginningHour('');
        setEndHour('');
        setNote('');
    };



    const inputStyle: React.CSSProperties = {
        height: '55px',
        width: '100%',
        marginBottom: '30px',
    };

    const eventStyleGetter = () => {
        let style: React.CSSProperties = {
            backgroundColor: 'rgb(111, 233, 224)',
            color: 'black',
            borderRadius: '5px',
            border: '1px solid black',
            padding: '5px',
            cursor: 'pointer',
        };
        return {
            style
        };
    };


    return (
        <div>
            <Button startIcon={<Add />} onClick={handleOpenDialog} style={{ marginLeft: '20px' }} >Add Order</Button>
            <Dialog open={openAddDialog} onClose={handleCloseDialog} style={{ position: 'fixed', zIndex: '100' }}>
                <IconButton aria-label="close" onClick={handleCloseDialog} style={{ position: 'absolute', right: 8 }}>
                    <Close />
                </IconButton>
                <DialogTitle>Add New Order</DialogTitle>
                <DialogContent style={{ width: '350px' }}><br />
                    <FormControl fullWidth style={inputStyle}>
                        <InputLabel id="demo-simple-select-label">User Name</InputLabel>
                        <Select
                            label="User Name"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        >
                            {users.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={inputStyle}>
                        <InputLabel id="demo-simple-select-label">Photography Package</InputLabel>
                        <Select
                            label="Photography Package"
                            value={packageId}
                            onChange={(e) => setPackageId(e.target.value)}
                        >
                            {photographyPackages.map((option) => (
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
                        label="Beginning Hour"
                        type="time"
                        value={beginingHour}
                        onChange={(e) => setBeginningHour(e.target.value)}
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
                    <Button variant="contained" onClick={handleAddOrder} style={{ marginLeft: '120px' }}>Add Order</Button>
                </DialogContent>
            </Dialog>
            <Calendar
                localizer={localizer}
                events={orders.map(order => ({
                    ...order,
                    title: `${photographyPackages.find(pkg => pkg.id === order.packageId)?.type}`,
                }))}
                startAccessor={(event) => new Date(event.date)}
                endAccessor={(event) => new Date(event.date)}
                style={{ textDecoration: 'none', height: 500, margin: '20px 20px 20px 20px', fontFamily: 'Roboto,Helvetica Neue,Arial,sans-serif' }}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
            />
            {selectedOrder && (
                <Dialog open={openDialog} onClose={handleCloseDialog} style={{ position: 'fixed', zIndex: '100' }}>
                    {editMode ? (
                        <>
                            <IconButton aria-label="close" onClick={handleCloseEdit} style={{ position: 'absolute', right: 8 }}>
                                <Close />
                            </IconButton>
                            <IconButton aria-label="save" onClick={handleSaveChanges} style={{ position: 'absolute', right: 40 }}>
                                <Save />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <IconButton aria-label="close" onClick={handleCloseDialog} style={{ position: 'absolute', right: 8 }}>
                                <Close />
                            </IconButton>
                            {!validateDate(selectedOrder!.date) && <IconButton aria-label="edit" onClick={enterEditMode} style={{ position: 'absolute', right: 40 }}>
                                <Edit />
                            </IconButton>}
                            <IconButton aria-label="delete" onClick={handleDeleteOrder} style={{ position: 'absolute', right: 72 }}>
                                <Delete />
                            </IconButton>
                        </>
                    )}
                    <DialogTitle><strong>{selectedOrder.packageId && photographyPackages.find(pkg => pkg.id === selectedOrder.packageId)?.type}</strong></DialogTitle>
                    <DialogContent style={{ width: '300px', height: '320px' }}>
                        {editMode ? (
                            <>
                                <TextField
                                    label="Date"
                                    type="date"
                                    value={moment(editedOrder?.date).format('YYYY-MM-DD')}
                                    onChange={(e) => setEditedOrder({ ...editedOrder!, date: moment(e.target.value).format('YYYY/MM/DD') })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    margin="normal"
                                />

                                <TextField
                                    label="Beginning Hour"
                                    type="time"
                                    value={editedOrder?.beginingHour}
                                    onChange={(e) => setEditedOrder({ ...editedOrder!, beginingHour: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="End Hour"
                                    type="time"
                                    value={editedOrder?.endHour}
                                    onChange={(e) => setEditedOrder({ ...editedOrder!, endHour: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Note"
                                    value={editedOrder?.note}
                                    onChange={(e) => setEditedOrder({ ...editedOrder!, note: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                />
                            </>
                        ) : (
                            <div style={{ marginLeft: '30px' }}>
                                <br /><br />
                                <Typography variant="body1">
                                    <strong>User Name:</strong> {getUserById(selectedOrder.userId)?.name}
                                </Typography><br />
                                <Typography variant="body1">
                                    <strong>User Phone:</strong> {getUserById(selectedOrder.userId)?.phone}
                                </Typography><br />
                                <Typography variant="body1">
                                    <strong>User Email:</strong> {getUserById(selectedOrder.userId)?.email}
                                </Typography><br />
                                <Typography variant="body1">
                                    <strong>Date:</strong> {moment(selectedOrder.date[0]).format('DD/MM/YYYY')}
                                </Typography><br />
                                <Typography variant="body1">
                                    <strong>Time:</strong> {selectedOrder.beginingHour} - {selectedOrder.endHour}
                                </Typography><br />
                                {selectedOrder.note && <Typography variant="body1">
                                    <strong>Note:</strong> {selectedOrder.note}
                                </Typography>}
                            </div>

                        )}
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default Orders;
