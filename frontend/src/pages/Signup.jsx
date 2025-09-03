import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Container, Typography } from "@mui/material";


export default function Signup() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);


    return (
        <Container maxWidth="sm">
            <Typography variant="h5">Signup</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField fullWidth margin="normal" label="Name" {...register("name")} />
                <TextField fullWidth margin="normal" label="Email" {...register("email")} />
                <TextField fullWidth margin="normal" label="Address" {...register("address")} />
                <TextField fullWidth margin="normal" label="Password" type="password" {...register("password")} />
                <Button type="submit" variant="contained" fullWidth>Signup</Button>
            </form>
        </Container>
    );
}