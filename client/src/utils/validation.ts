export const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        return 'Email should be in the format "example@example.com"';
    }
    return '';
};

export const validatePassword = (password: string) => {
    if (!password.match(/[A-Z]/)) {
        return 'Password must contain at least one uppercase letter';
    }

    if (!password.match(/[0-9]/)) {
        return 'Password must contain at least one number';
    }

    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }

    return '';
};

export const validateName = (name: string) => {
    const nameRegex = /^[\u0590-\u05FFa-zA-Z\s]{3,15}$/;

    if (!nameRegex.test(name)) {
        return 'Name should be between 3 and 15 characters long';
    }
    return '';
};

export const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^(?:[0-9] ?){6,14}[0-9]$/;

    if (!phoneRegex.test(phoneNumber)) {
        return 'Phone number should be in the format "1234567890"';
    }
    return '';
};