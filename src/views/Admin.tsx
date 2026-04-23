import React from "react";
import User from "../components/User";
import AddUser from "../components/AddUser";
import type { FullUserData, UserData } from "../types";
import { 
    Container, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Typography,
    Box
} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';

interface AdminProps {
    users: UserData[];
    delUser: (id: string) => void;
    addUser: (newUser: FullUserData) => void;
}

const Admin: React.FC<AdminProps> = ({ users, delUser, addUser }) => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <PeopleIcon fontSize="large" color="primary" />
                Admin Panel
            </Typography>
            
            <AddUser addUser={addUser} />
            
            <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: 650 }} aria-label="users table">
                    <TableHead sx={{ backgroundColor: 'primary.main' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Username</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <User key={user._id} user={user} delUser={delUser} />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Box sx={{ py: 3 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            No users found.
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Admin;