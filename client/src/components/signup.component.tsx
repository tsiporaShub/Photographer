import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { SignUp } from '../api/user.api'
import { User } from '../interfaces/user.interface';
import { useDispatch } from 'react-redux';
import { FillDataCurrentUser } from '../redux/userAction'; 

const inputStyle = {
    height: '70px',
    width: '300px',
};

export default function SignupFormComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const dispatch = useDispatch();

    const validateName = (name: string) => {
        const nameRegex = /^[\u0590-\u05FFa-zA-Z]{3,15}$/;

        if (!nameRegex.test(name)) {
            setNameError('Name should be between 3 and 15 characters long');
            return;
        }
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            setEmailError('Email should be in the format "example@example.com"');
            return;
        }
    };

    const validatePassword = (password: string) => {
        if (!password.match(/[A-Z]/)) {
            setPasswordError('Password must contain at least one uppercase letter');
            return;
        }

        if (!password.match(/[0-9]/)) {
            setPasswordError('Password must contain at least one number');
            return;
        }

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return;
        }
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        const phoneRegex = /^(?:[0-9] ?){6,14}[0-9]$/;

        if (!phoneRegex.test(phoneNumber)) {
            setPhoneError('Phone number should be in the format "1234567890"');
            return;
        }
    };

    const handleSignUp = async () => {
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setPhoneError('');

        validateEmail(email);
        validatePassword(password);
        validateName(name);
        validatePhoneNumber(phone);

        try {
            const user: User = {
                id: "",
                name,
                email,
                password,
                phone
            }
            console.log(user);

            const response = await SignUp(user);
            console.log('Signup successful:', response);

            dispatch(FillDataCurrentUser(user));

            setEmail('');
            setPassword('');
            setPhone('');
            setName('');
        }
        catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div>
            <Typography variant="h1">Signup Form</Typography>
            <TextField
                label="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError ? true : false}
                helperText={nameError}
                style={inputStyle}
            />
            <br />
            <br />
            <br />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError ? true : false}
                helperText={emailError}
                style={inputStyle}
            />
            <br />
            <br />
            <br />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError ? true : false}
                helperText={passwordError}
                style={inputStyle}
            />
            <br />
            <br />
            <br />
            <TextField
                label="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={phoneError ? true : false}
                helperText={phoneError}
                style={inputStyle}
            />
            <br />
            <br />
            <br />
            <Button variant="contained" onClick={handleSignUp}>signup</Button>
        </div>
    );
}