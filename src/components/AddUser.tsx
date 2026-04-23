import { Button, TextField, Paper, Typography, Stack, Box } from '@mui/material';
import React, { useState } from 'react'
import type { FullUserData } from '../types';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface AddUserProps {
    addUser: (newUser: FullUserData) => void;
}

const AddUser: React.FC<AddUserProps> = ({ addUser }) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: FullUserData = {
            name: name,
            username: username,
            password: password
        };
        addUser(newUser);
        setName("");
        setUsername("");
        setPassword("");
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Box component="form" onSubmit={onSubmit}>
                <Stack spacing={2}>
                    <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonAddIcon color="primary" />
                        Add New User
                    </Typography>
                    <TextField 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        label="Name" 
                        fullWidth 
                        required 
                    />
                    <TextField 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        label="Username" 
                        fullWidth 
                        required 
                    />
                    <TextField 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        label="Password" 
                        type="password" 
                        fullWidth 
                        required 
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        size="large"
                        startIcon={<PersonAddIcon />}
                    >
                        Add User
                    </Button>
                </Stack>
            </Box>
        </Paper>
    );
};

export default AddUser;