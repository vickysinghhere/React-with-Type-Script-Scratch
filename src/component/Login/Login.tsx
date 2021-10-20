import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Grid, Checkbox, TextField, Button, FormControl, Snackbar, IconButton } from '@material-ui/core';
import styled from '@emotion/styled';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Service } from '../../service/Service';
import CloseIcon from '@material-ui/icons/Close';
import { StyledContainer } from '../../App';
import { RouteComponentProps } from 'react-router';

export const StyledButton = styled(Button)`
    background-color: #a5d3e0 !important;
    border-radius: 2rem !important;
    height: 1.5rem;
`;

export const StyledGrid = styled(Grid)`
    font-size: 0.6rem;
`;

export const StyledLoginDetail = styled(Grid)`
    background-color: #4f95a9;
    padding-top: 1rem;
`;

export const StyledCard = styled(Card)`
    .MuiCardContent-root{
        padding: 0rem;
    }
    .MuiCardContent-root:last-child {
        padding: 0rem;
    }
    .makeStyles-margin-1 {
        margin: 0rem;
    }
`;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
    }),
);

interface Props extends RouteComponentProps { }

export const Login: React.FC<Props> = ({ history }) => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const classes = useStyles();

    const handleOnLoginClick = (): void => {
        if (!userName || !password) {
            setIsError(true);
            return;
        }
        setIsError(false);
        new Service().login(userName, password).then(data => {
            // No token get back by the endpoint -- for test purpose (commented the service post call)
            localStorage.setItem('token', "value");
            history.push('/users')
        }).catch(() => {
            setIsError(true);
        })
    }

    return (
        <StyledContainer>
            <StyledCard>
                <CardContent>
                    <FormControl className={classes.margin}>
                        <Grid style={{ padding: "2rem" }}>
                            <div className={classes.margin}>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <AccountCircle />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid" label="Username" onChange={(event) => setUserName(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.margin}>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <VisibilityOffIcon />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid" label="password" onChange={(event) => setPassword(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </FormControl>
                    <StyledLoginDetail container>
                        <StyledGrid item xs={8}>
                            <Checkbox defaultChecked color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} />
                            Keep me logged in
                        </StyledGrid>
                        <Grid item xs={4}>
                            <StyledButton variant="contained" onClick={handleOnLoginClick}>
                                Login
                            </StyledButton>
                        </Grid>
                    </StyledLoginDetail>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={isError}
                        autoHideDuration={6000}
                        onClose={() => setIsError(false)}
                        message="Invalid User Name and Password"
                        action={
                            <React.Fragment>
                                <Button color="secondary" size="small" onClick={() => setIsError(false)}>
                                    UNDO
                             </Button>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={() => setIsError(false)}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                </CardContent>
            </StyledCard>
        </StyledContainer>
    );
};