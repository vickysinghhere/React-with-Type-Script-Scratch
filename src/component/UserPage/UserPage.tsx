import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';
import styled from '@emotion/styled';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';
import { Service } from '../../service/Service';
import { StyledContainer } from '../../App';
import { RouteComponentProps } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        maxWidth: 345,
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
  }),
);

export const StyledGrid = styled('span')`
	font-weight: 800;
`;

export const StyledCompany = styled('span')`
    font-size: 0.9rem;
    font-weight: 600;
    color: grey;
`;

// interface for user to be shown
export interface IUser {
    first_name: string,
    last_name: string,
    avatar: string,
    email: string,
    company: string,
    text: string
}

interface Props extends RouteComponentProps<{id: string}> {}

export const UserPage: React.FC<Props> = ({match}) => {
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        new Service().getUserDetail(match.params.id).then(data => setUser(data));
    }, [match.params.id])

    const classes = useStyles();
    
    return (
        <StyledContainer>
        <Card className={classes.root}>
            <CardContent className={classes.root}>
                
            {user && <Grid container direction="column">
                <Grid container justify="center">
                     <Avatar alt="Remy Sharp" src={user.avatar} className={classes.large} />
                </Grid>
                <Grid container justify="center">
                    <StyledGrid>{`Mr. ${user.first_name} ${user.last_name}`}</StyledGrid>
                </Grid>
                <Grid>
                    <StyledCompany> Co-founder & CEO  </StyledCompany> <StyledCompany> at </StyledCompany> <StyledCompany> {user.company ? user.company : 'No Company'} </StyledCompany>
                </Grid>
                <Grid>
                <Typography variant="body2" color="textSecondary" component="p">{user.text}</Typography>
                </Grid>
                <Grid style={{paddingTop: "1rem"}} container direction="row">
                <Grid container direction="row" alignItems="center" item xs={3}>
                    <CallIcon style={{fontSize: "0.8rem"}} color="disabled" /><Typography variant="body2" color="textSecondary" component="p">{'xxx'}</Typography>
                </Grid>
                <Grid container direction="row" alignItems="center" item xs={9}>
                    <MailIcon style={{fontSize: "0.8rem"}} color="disabled" /><Typography variant="body2" color="textSecondary" component="p">{user.email}</Typography>
                </Grid>
                </Grid>
            </Grid>}
            </CardContent>
        </Card>
        </StyledContainer>
    );
};