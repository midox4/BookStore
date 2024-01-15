import {
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Api from "../../Api/axios";
import Message from "../../components/Message";
import { useNavigate } from "react-router";
import { SnackbarProvider } from "notistack";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";

const Book = () => {
  const [DATA, setDATA] = useState([]);
  const [render, setRender] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: allBooks } = await Api.get("/BOOK/GET_ALL");
        setDATA(allBooks);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [render]);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // const [//loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const HandleValidation = () => {
    const myVar = undefined;
    if (Title === myVar) {
      Message("Title is required", "error");
      return false;
    } else if (Title.length < 4) {
      Message("Title should be greater 3 characters", "error");
      return false;
    }
    if (Description === myVar) {
      Message("Description is required", "error");
      return false;
    } else if (Description.length < 5) {
      Message("Description should be greater 3 characters", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (HandleValidation()) {
      setLoading(true);
      try {
        const { data } = await Api.post("/BOOK/AJOUTER", {
          Title,
          Description,
        });
        console.log(data);
        setLoading(false);
        setTitle("");
        setDescription("");
        setRender(!render);
        Message("Succes Adding Book", "success");

        return Navigate("/book");
      } catch (error) {
        setLoading(false);
        console.log(error);
        return Message(error.response.data.message, "error");
      }
    } else {
      return setLoading(false);
    }
  };
  return (
    <>
      <SnackbarProvider autoHideDuration={2500} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        <Navbar></Navbar>
        <br />
        <br />
        <Box sx={{ display: "flex", gap: "10px", width: "100%" }}>
          <Box sx={{ width: "600px", mt: "50px" }}>
            <Typography sx={{ fontSize: 30, mb: "20px" }}>
              Add New Book
            </Typography>
            <TextField
              placeholder="Type anything…"
              sx={{ margin: "5px", width: "80%" }}
              id="outlined-multiline-flexible"
              label="Title"
              maxRows={4}
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
            />{" "}
            <br />
            <TextField
              placeholder="Type anything…"
              sx={{ margin: "5px", width: "80%" }}
              id="filled-textarea"
              label="Description"
              multiline
              minRows={10}
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />{" "}
            <br />
            <br />
            {loading && <CircularProgress />}
            {!loading && (
              <Button
                variant="contained"
                sx={{ margin: "5px", width: "80%" }}
                onClick={handleSubmit}
              >
                ADD
              </Button>
            )}
          </Box>
          <Box
            sx={{ width: "600px", display: "flex", flexDirection: "column" }}
          >
            <h3>
              <b>ALL BOOKS</b>
            </h3>
            <br />
            {error && <span>Error Server </span>}
            {DATA?.length <= 0 ? (
              <Typography
                sx={{
                  color: "white",
                  padding: "15px",
                  borderRadius: "5px",
                  bgcolor: "red",
                }}
              >
                No Data Exist here
              </Typography>
            ) : (
              DATA.map((elem) => (
                <Box key={elem._id}>
                  <Link to={`/books/${elem._id}`}>{elem.Title}</Link>
                  <br />
                  <Typography>{elem.Description}</Typography>
                  <Link to={`/book/favories/${elem._id}`}>
                    <Button variant="outlined">book details</Button>
                  </Link>
                  <hr />
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Book;
