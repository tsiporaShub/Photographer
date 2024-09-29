import { ChangeEvent, useEffect, useState } from 'react';
import { Typography, Button, TextField, IconButton } from '@mui/material';
import { BusinessDetails } from '../../interfaces/businessDetails.interface';
import { getBusinessDetails, editBusinessDetails } from '../../api/businessDetails.api';
import CloseIcon from '@mui/icons-material/Close';

const BusinessDetailsComponent = () => {
    const [businessDetails, setBusinessDetails] = useState<BusinessDetails | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState<BusinessDetails | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getBusinessDetails();
                setBusinessDetails(data[0] as BusinessDetails);
            } catch (error) {
                console.error('Error fetching business details:', error);
            }
        };

        fetchDetails();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedDetails(businessDetails);
    };

    const handleSave = async () => {
        try {
            if (editedDetails) {
                await editBusinessDetails(editedDetails)
                setBusinessDetails(editedDetails);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating business details:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (editedDetails) {
            const { name, value } = e.target;
            setEditedDetails({ ...editedDetails, [name]: value });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', margin: 'auto', marginTop: '11vh', marginBottom: '11vh' }}>
            <>
                {isEditing ? (
                    <>
                        <IconButton onClick={handleCancelEdit} style={{ alignSelf: 'flex-end', marginRight: '10px' }}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h4">Business Details</Typography>
                        {editedDetails && (
                            <>
                                <br></br>
                                <TextField
                                    name="name"
                                    label="Business Name"
                                    value={editedDetails.name}
                                    onChange={handleChange}
                                />
                                <br></br>
                                <TextField
                                    name="adress"
                                    label="Business Address"
                                    value={editedDetails.adress}
                                    onChange={handleChange}
                                />
                                <br></br>
                                <TextField
                                    name="phone"
                                    label="Business Phone"
                                    value={editedDetails.phone}
                                    onChange={handleChange}
                                />
                                <br></br>
                                <Button onClick={handleSave}>Save</Button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Typography variant="h4">Business Details</Typography>
                        {businessDetails && (
                            <>
                                <Typography variant="h6">Name: {businessDetails.name}</Typography>
                                <Typography variant="h6">adress: {businessDetails.adress}</Typography>
                                <Typography variant="h6">phone: {businessDetails.phone}</Typography>
                                <Button onClick={handleEdit}>Edit</Button>
                            </>
                        )}
                    </>
                )}
            </>
        </div>
    );
};

export default BusinessDetailsComponent;
