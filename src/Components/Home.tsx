import { Box, CircularProgress, Container, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { usePost } from '../Context/PostContext';
import { PostsDataInterface } from '../types/index.t';

interface TableColumn {
    id: "title" | "url" | "created_at" | "author",
    label: string,
    width?: number,
    textAlign?: "right"
}

const tableColumns: readonly TableColumn[] = [
    {
        id: "title",
        label: "Title",
        width: 150
    },
    {
        id: "url",
        label: "URL",
        width: 150
    },
    {
        id: "created_at",
        label: "Created at",
        width: 150
    },
    {
        id: "author",
        label: "Author",
        width: 150
    },
]

const Home = () => {
    const { postsInfo, handlePageChange, currentPage, loading, postsInfoLength } = usePost();
    const history = useHistory();
    const pageSize: number = 20;

    const getDetailsInfo = async (post: PostsDataInterface) => {
        history.push({
            pathname: '/details',
            state: post
        })
    }

    return (
        <>
            <h1 data-testid="header" style={{"textAlign": "center"}}>Post List</h1>
            {
                loading && <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress data-testid="loaderTest" size={30} />
                </Box>
            }
            <Container style={{maxWidth: "100%"}}>
                <Paper>
                    <TableContainer sx={{height: "calc(100vh - 150px)"}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead data-testid="tableHeader">
                                <TableRow>
                                    {
                                        tableColumns.map(column => 
                                            <TableCell key={column.id} align={column.textAlign} style={{minWidth: column.width}}>
                                                {column.label}
                                            </TableCell>    
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody data-testid="tableBody">
                                {
                                    postsInfo.slice((currentPage - 1)*pageSize, (currentPage - 1)*pageSize + pageSize).map((row, index) => {
                                        return (
                                            <TableRow style={{"cursor": "pointer"}} key={index} onClick={() => getDetailsInfo(row)} >
                                                {
                                                    tableColumns.map(column => {
                                                        const postInfoValue = row[column.id];
                                                        return (
                                                            <TableCell key={column.id}>
                                                                {postInfoValue}
                                                            </TableCell>
                                                        )
                                                    })
                                                }
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Pagination data-testid="pagePagination" count={postsInfoLength / pageSize } page={currentPage} onChange={handlePageChange} />

                </Paper>
            </Container>
        </>


    );
};

export default Home;