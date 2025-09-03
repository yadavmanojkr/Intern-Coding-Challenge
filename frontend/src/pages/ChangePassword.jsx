import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Container, Typography } from "@mui/material";


export default function ChangePassword() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);


    return (
        <Container maxWidth="sm">
            <Typography variant="h5">Change Password</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField fullWidth margin="normal" label="Current Password" type="password" {...register("currentPassword")} />
                <TextField fullWidth margin="normal" label="New Password" type="password" {...register("password")} />
                <Button type="submit" variant="contained" fullWidth>Update</Button>
            </form>
        </Container>
    );
}