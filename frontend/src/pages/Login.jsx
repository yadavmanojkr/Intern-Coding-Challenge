import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Container, Typography } from "@mui/material";


export default function Login() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);


    return (
        <Container maxWidth="sm">
            <Typography variant="h5">Login</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField fullWidth margin="normal" label="Email" {...register("email")} />
                <TextField fullWidth margin="normal" label="Password" type="password" {...register("password")} />
                <Button type="submit" variant="contained" fullWidth>Login</Button>
            </form>
        </Container>
    );
}