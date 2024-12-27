// import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function RegistrationsTable() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const getRegistrations = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/registrations`,
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          method: "get",
        }
      );
      response = await response.json();
      console.log(response); // Log the full response to inspect the structure
      if (response.registrations) {
        setRegistrations(response.registrations);
      } else {
        console.log("No registrations found in the response.");
      }
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.log("Error while fetching data: " + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRegistrations();
  }, []);

  // Display loading message while fetching data
  if (loading) {
    return <p>Loading registrations...</p>;
  }

  // Check if registrations is an array before mapping
  if (!Array.isArray(registrations)) {
    return <p>No registrations available.</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Event Name</StyledTableCell>
            <StyledTableCell align="right">Registered By</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Registration Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registrations.map((registration) => (
            <StyledTableRow key={registration._id}>
              <StyledTableCell component="th" scope="row">
                {registration.event_id?.eventName || "No event name"}
              </StyledTableCell>
              <StyledTableCell align="right">
                {registration.user_id?.firstName +
                  " " +
                  registration.user_id?.lastName || "No name"}
              </StyledTableCell>
              <StyledTableCell align="right">
                {registration.user_id?.email || "No email"}
              </StyledTableCell>
              <StyledTableCell align="right">
                {registration.registration_date || "No date"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
