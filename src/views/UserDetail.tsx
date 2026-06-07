import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Box, Button, CircularProgress } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { UserData } from "../types";

interface UserDetailProps {
    users: UserData[];
}

const UserDetail: React.FC<UserDetailProps> = ({ users }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (users.length > 0) {
            const foundUser = users.find((u) => u._id === id);
            setUser(foundUser || null);
            setLoading(false);
        } else {
            // If users list is empty, we might be waiting for the initial fetch in App.tsx
            setLoading(true);
        }
    }, [id, users]);

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!user) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h5" color="error">User with ID "{id}" not found</Typography>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mt: 2 }}>
                    Go Back to Admin
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                Back to Admin
            </Button>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    User Details
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary" display="block">ID</Typography>
                        <Typography variant="body1">{user._id}</Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary" display="block">Username</Typography>
                        <Typography variant="body1">{user.userName}</Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary" display="block">Full Name</Typography>
                        <Typography variant="body1">{user.name}</Typography>
                    </Paper>
                </Box>
            </Paper>
        </Container>
    );
};

export default UserDetail;
