import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { OrderPackage } from '../../interfaces/orderPackage.interface';
import { PhotographyPackage } from '../../interfaces/photographyPackage.interface';
import { getOrderPackages } from '../../api/orderPackage.api';
import { getPhotographyPackages } from '../../api/photographyPackage.api';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const localizer = momentLocalizer(moment);

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<OrderPackage[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderPackage | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [photographyPackages, setPhotographyPackages] = useState<PhotographyPackage[]>([]);

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

        fetchOrders();
        fetchPhotographyPackages();
    }, []);

    const handleSelectEvent = (event: OrderPackage) => {
        setSelectedOrder(event);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedOrder(null);
        setOpenDialog(false);
    };

    return (
        <div style={{ height: 500, margin:'30px 10px 20px 10px' }}>
            <Calendar
                localizer={localizer}
                events={orders.map(order => ({
                    ...order,
                    title: `Order ID: ${order.id}`,
                }))}
                startAccessor={(event) => new Date(event.date)}
                endAccessor={(event) => new Date(event.date)}
                style={{ textDecoration: 'none' }}
                onSelectEvent={handleSelectEvent}
            />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <>
                            <Typography variant="h6">Order ID: {selectedOrder.id}</Typography>
                            <Typography variant="body1">User ID: {selectedOrder.userId}</Typography>
                            <Typography variant="body1">Package Type: {selectedOrder.packageId && photographyPackages.find(pkg => pkg.id === selectedOrder.packageId)?.type}</Typography>
                            <Typography variant="body1">Date: {selectedOrder.date}</Typography>
                            <Typography variant="body1">Beginning Hour: {selectedOrder.beginingHour}</Typography>
                            <Typography variant="body1">End Hour: {selectedOrder.endHour}</Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Orders;
