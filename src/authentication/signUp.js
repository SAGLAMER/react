import React, { useState, useEffect } from "react";
import { Container, CssBaseline, Avatar, Typography, Button, Grid, Link, makeStyles, Card, CardContent } from '@material-ui/core';
import { LockRounded } from "@material-ui/icons";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import fire from '../helpers/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }
    const handlerSignUp = () => {
        fire.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                if (response) {
                    props.toggle();
                    toast.success('User created successfully');
                }
            }).catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        toast.error(error.message);
                        break;
                    case 'auth/invalid-email':
                        toast.error(error.message);
                        break;
                    case 'auth/weak-password':
                        toast.error(error.message);
                        break;
                }
            });
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== password) {
                return false;
            }
            return true;
        });
        return () => {
            ValidatorForm.removeValidationRule('isPasswordMatch');
        }
    }, [password])
    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.card}>
                <CardContent>
                    <ToastContainer />
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockRounded />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            SIGN UP
                        </Typography>
                        <ValidatorForm
                            onSubmit={handlerSignUp}
                            className={classes.form}
                        >
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Email"
                                onChange={handleEmail}
                                name="email"
                                value={email}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                                autoComplete='off'
                            />
                            <br />
                            <TextValidator
                                variant="outlined"
                                fullWidth
                                label="Password"
                                onChange={handlePassword}
                                name="password"
                                type="password"
                                value={password}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete="off"
                            />
                            <br />
                            <TextValidator
                                variant="outlined"
                                fullWidth
                                label="Confirm Password"
                                onChange={handleConfirmPassword}
                                name="confirmPassword"
                                type="password"
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['password mismatch', 'this field is required']}
                                value={confirmPassword}
                                autoComplete="off"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link onClick={props.toggle} className={classes.pointer} variant="body2">
                                        {"Already have an account ? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>

                        </ValidatorForm>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'turquoise',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        background: 'linear-gradient(45deg, #00ff80 30%, #00e8ff 90%)',
        margin: theme.spacing(3, 0, 2),
        color: 'black',
    },
    card: {
        marginTop: '60px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px',
    },
    pointer: {
        cursor: 'pointer',
        color: 'purple',
    }
}))

export default SignUp;