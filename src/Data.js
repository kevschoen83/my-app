import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
    TableContainer, 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell, 
    Paper,
    makeStyles} from "@mui/material";

function Data() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios("http://localhost:8080/references").then(
            (res) => {
                setData(res.data);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            }
        );
    }, []);

    if(loading) return "Loading...";
    if(error) return "Error!";

    return (
        <div>
            <header>
                <h1>My Quick Reference App</h1>
            </header>
            <TableContainer component={Paper} className="table" sx={{ maxHeight: '500px', width: 800, margin: "auto" }}>
                <Table aria-label="Quick Reference" sx={{border: 2}} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Symbol</TableCell>
                            <TableCell align="center">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.referenceId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0} }}
                            >
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.symbol}</TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Data;