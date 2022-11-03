import React from "react";
import { useState } from "react";
import { Container, CssBaseline, Avatar, Typography, FormControlLabel, Button, Checkbox, Grid, Link, makeStyles, Card, CardContent } from '@material-ui/core';
import { LockRounded } from "@material-ui/icons";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import fire from '../helpers/database';
import { ToastContainer, toast } from "react-toastify";
import { MoonLoader } from "react-spinners";

const Login = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const override = `
        display: block;
        margin-left: 100px;
        border-color: red;
    `;


    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handlerLogin = () => {
        setLoading(true);
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const { user } = response;
                const data = {
                    userId: user.uid,
                    email: user.email,
                }
                localStorage.setItem('user', JSON.stringify(data));
                const storage = localStorage.getItem('user');
                const loggedInUser = storage !== null ? JSON.parse(storage) : null;
                props.loggedIn(loggedInUser);

                setLoading(false);
            }).catch(error => {
                toast.error(error.message);
                setLoading(false);
            });
    }
    return (
        <div>
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
                                SIGN IN
                            </Typography>
                            <ValidatorForm
                                onSubmit={handlerLogin}
                                onError={errors => {
                                    for (const err of errors) {
                                        console.log(err.props.errorMessages[0])
                                    }
                                }}
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
                                {loading ? (
                                    <MoonLoader
                                        css={override}
                                        size={70}
                                        color={"#eb4034"}
                                        loading={loading}
                                    />
                                ) : (
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={classes.submit}
                                    >
                                        Sign In
                                    </Button>
                                )}

                                <Grid container>
                                    <Grid item>
                                        <Link onClick={props.toggle} className={classes.pointer} variant="body2">
                                            {"Don't have an account ? Sign Up !"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </ValidatorForm>
                        </div>
                    </CardContent>
                </Card>
            </Container>Card
        </div>
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
}));

export default Login;