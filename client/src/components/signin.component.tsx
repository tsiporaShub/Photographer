import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { SignIn } from '../api/user.api'
import { SignInData } from '../interfaces/user.interface';

const inputStyle = {
    height: '70px',
    width: '300px',
};

export default function SigninFormComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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

    const handleSignIn = async () => {
        setEmailError('');
        setPasswordError('');

        validateEmail(email);
        validatePassword(password);

        try {
            const user: SignInData = {
                email,
                password
            }
            console.log(user);

            const response = await SignIn(user);
            console.log('Signip successful:', response);

            setEmail('');
            setPassword('');
        }
        catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div>
            <Typography variant="h1">Signin Form</Typography>
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
            <Button variant="contained" onClick={handleSignIn}>signin</Button>
        </div>
    );
}