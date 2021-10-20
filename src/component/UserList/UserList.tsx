import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import { Service } from '../../service/Service';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar, Grid, CircularProgress } from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { StyledContainer } from '../../App';
import { RouteComponentProps } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 900,
      background: '#a5d3e0',
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    table: {
      minWidth: 650,
      background: '#a5d3e0',
    },
    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
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

const StyledLoaderPage = styled(Grid)`
	height: 100%;
`;

export interface IUserDataProps {
  id: number;
  first_name: string,
  last_name: string,
  avatar: string,
  email: string
}

export interface IUserData {
  data: Array<IUserDataProps>;
  total_pages: number;
}

interface Props extends RouteComponentProps { }

export const UserList: React.FC<Props> = ({ history }) => {
  const [userList, setUserList] = useState<IUserData>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    new Service().getUsers(pageNumber).then(data => {
      setUserList(data);
      setIsLoading(false);
    });
  }, [])

  const Pagination = () => {
    return (
      <Grid container justify="flex-end" alignItems="center">
        <SkipPreviousIcon style={{ cursor: "pointer" }} onClick={() => { getUserData(pageNumber - 1) }} />
        <span> {`Page ${pageNumber} of ${getPageNumber()}`} </span>
        <SkipNextIcon style={{ cursor: "pointer" }} onClick={() => { getUserData(pageNumber + 1) }} />
      </Grid>
    )
  }

  const handleOnClick = (id: number): void => {
    history.push(`/users/${id}`)
  }

  const getUserData = (pageNumber: number): void => {
    if (pageNumber <= getPageNumber() && pageNumber > 0) {
      setIsLoading(true);
      new Service().getUsers(pageNumber).then(data => {
        setUserList(data);
        setIsLoading(false);
        setPageNumber(pageNumber);
      });
    }
  }

  const getPageNumber = () => {
    return userList ? userList.total_pages : pageNumber;
  }

  const classes = useStyles();
  return (
    <StyledContainer>
      {isLoading ? <StyledLoaderPage container justify="center" alignItems="center">
        <CircularProgress color="inherit" size={50} />
      </StyledLoaderPage>
        :
        <Card className={classes.root}>
          <CardContent className={classes.root}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Id</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Avatar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList && userList.data && userList.data.map((row: IUserDataProps) => (
                    <TableRow key={row.id} style={{ cursor: "pointer" }} onClick={() => handleOnClick(row.id)}>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.first_name}
                      </TableCell>
                      <TableCell align="right">{row.last_name}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right"><Avatar alt="Remy Sharp" src={row.avatar} className={classes.large} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Grid style={{ backgroundColor: "#1e71ad", color: "#fff" }} container direction="column">
                {Pagination()}
              </Grid>
            </TableContainer>
          </CardContent>
        </Card>
      }
    </StyledContainer>
  );
};