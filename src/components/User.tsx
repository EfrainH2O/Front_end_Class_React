import React from "react";
import { useNavigate } from "react-router-dom";
import type { UserData } from "../types";
import { TableRow, TableCell, IconButton, Tooltip, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface UserProps {
    user: UserData;
    delUser: (id: string) => void;
}

const User: React.FC<UserProps> = ({ user, delUser }) => {
    const navigate = useNavigate();

    return (
        <TableRow hover>
            <TableCell>{user._id}</TableCell>
            <TableCell>{user.userName}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Tooltip title="View Details">
                        <IconButton onClick={() => navigate(`/user/${user._id}`)} color="primary">
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                        <IconButton onClick={() => delUser(user._id)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default User;