import * as React from 'react';

import { useHistory, Link } from 'react-router-dom'
import Cookies from 'js-cookie';

import { makeStyles, Theme } from '@material-ui/core';
import  AppBar  from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/MenuItem';

import { signOut } from 'lib/api/auth';

import { AuthContext } from 'App';

const useStyles = makeStyles((theme: Theme) => ({
    IconButton : {
        marginRight : theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        textDecoration: "none",
        color: "inherit"
    },
    linkBtn: {
        textTransform: "none"
    }
}))

const Header = () => {
    const { loading, isSignedIn, setIsSignIn } = React.useContext(AuthContext)
    const classes = useStyles();
    const history = useHistory();

    const handleSignOut = async(e: React.MouseEvent<HTMLButtonElement>) => {
        try{
            const res = await signOut();

            if(res.data.success) {
                Cookies.remove('_access_token');
                Cookies.remove('_client');
                Cookies.remove('_uid');

                setIsSignIn(false);
                history.push("/signin");

                console.log("Successed in Sign Out");
            } else {
                console.log("Failed in sign out");
            }
        } catch(e){
            console.log(e);
        }
    }

    const AuthButton = () => {
        if(!loading) {
            if(isSignedIn){
                return (
                    <Button
                        color="inherit"
                        className={classes.linkBtn}
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </Button>
                )
            } else {
                return (
                    <>
                        <Button
                            component={Link}
                            to="/signin"
                            color="inherit"
                            className={classes.linkBtn}
                        >
                            Sign In
                        </Button>
                        <Button
                            component={Link}
                            to="/signup"
                            color="inherit"
                            className={classes.linkBtn}
                        >
                            Sign up
                        </Button>
                    </>
                )
            }
        } else {
            return <></>
        }
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.IconButton}
                        color='inherit'
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component={Link}
                        to='/'
                        variant="h6"
                        className={classes.title}
                    >
                        Sample
                    </Typography>
                    <AuthButton />
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;