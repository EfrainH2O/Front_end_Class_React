import React from "react";
import type { UserData } from "../types";
import { TableRow, TableCell, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface UserProps {
    user: UserData;
    delUser: (id: string) => void;
}

const User: React.FC<UserProps> = ({ user, delUser }) => {
    return (
        <TableRow hover>
            <TableCell>{user._id}</TableCell>
            <TableCell>{user.userName}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell align="center">
                <Tooltip title="Delete User">
                    <IconButton onClick={() => delUser(user._id)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

export default User;