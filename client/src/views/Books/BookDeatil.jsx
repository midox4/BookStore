import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import Api from "../../Api/axios";
import { useNavigate, useParams } from "react-router";
import Message from "../../components/Message";
import { SnackbarProvider } from "notistack";
import { Context } from "../../CONTEXT_API/ContextApi";

const BookDeatil = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [DATA, setDATA] = useState([]);
  const [error, setError] = useState(false);
  const [Description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: BookId } = await Api.get(`/BOOK/GET/${id}`);
        setDATA(BookId);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const HandleValidation = () => {
    const myVar = "";
    if (Description === myVar) {
      Message("Description is required", "error");
      return false;
    } else if (Description.length < 5) {
      Message("Description should be greater 3 characters", "error");
      return false;
    }
    return true;
  };
  const updateBook = async (e) => {
    e.preventDefault();
    if (HandleValidation()) {
      setLoading(true);
      try {
        const { data } = await Api.put(`/BOOK/UPDATE/${id}`, {
          Description,
        });
        console.log(data);
        setLoading(false);
        setDescription("");
        Message("Updated with Success", "success");
        setTimeout(() => {
          nav("/book");
        }, 1000);
      } catch (error) {
        setLoading(false);
        console.log(error);
        return Message(error.response.data.message, "error");
      }
    } else {
      return setLoading(false);
    }
  };

  const deleteBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await Api.delete(`/BOOK/DELETE/${id}`);
      console.log(data);
      setLoading(false);
      setDescription("");
      Message("Delete Success", "warning");
      setTimeout(() => {
        nav("/book");
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log(error);
      return Message(error.response.data.message, "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
      }}
    >
      <Navbar></Navbar>

      <SnackbarProvider autoHideDuration={2500} />

      <br />
      <br />
      <Box
        sx={{
          display: "flex",
          textAlign: "left",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        {error && <>Error Server</>}
        <TextField
          sx={{ width: "300px" }}
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={DATA.Title}
          disabled
        />
        <h3>BOOK ADDED BY :</h3>
        <Typography
          sx={{ fontSize: "20px", color: "green", fontWeight: "bold" }}
        >
          {user?.FirstName} {user?.LastName}
        </Typography>
        <h3> ADDED AT :</h3>
        <Typography>{DATA.createdAt}</Typography>
        <h3> LAST UPDATE ON:</h3>
        <Typography>{DATA.updatedAt}</Typography>
        <Box />
        
        <Box
          sx={{
            display: "flex",
            textAlign: "left",
            flexDirection: "column",
            gap: "15px",
            width: "300px",
          }}
        >
          <h3> DESCRIPTION:</h3>
          <TextField
            sx={{ width: "300px" }}
            id="outlined-multiline-flexible"
            multiline
            defaultValue={DATA.Description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {loading && <CircularProgress></CircularProgress>}
            {!loading && (
              <>
                <Button
                  sx={{ width: "40%" }}
                  variant="outlined"
                  onClick={updateBook}
                >
                  Update
                </Button>
                <Button
                  sx={{ width: "40%" }}
                  variant="contained"
                  onClick={deleteBook}
                >
                  Delete
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookDeatil;
