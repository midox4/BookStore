import { Box, Button, TextField, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import Api from "../../Api/axios";
import { useParams } from "react-router";
import { SnackbarProvider } from "notistack";
import { Context } from "../../CONTEXT_API/ContextApi";
import Message from "../../components/Message";

const BookFavoris = () => {
  const { id } = useParams();
  const [DATA, setDATA] = useState([]);
  const [error, setError] = useState(false);
  const { user } = useContext(Context);
  const userIdd = user._id;
  console.log(DATA);
  const favorite = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Api.put(`/BOOK/FAVORITE/${id}`, { userIdd });
      console.log(data);
      setDATA(data);
      // return Navigate("/book");
    } catch (error) {
      console.log(error);
      return Message(error.response.data.message, "error");
    }
  };

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
      }}
    >
      <SnackbarProvider autoHideDuration={2500} />

      <Navbar></Navbar>
      <br />
      <br />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          gap: "10px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            textAlign: "left",
            flexDirection: "column",
            gap: "10px",
            width: "300px",
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
          added by:
          <Typography>Hafsi</Typography>
          added on:
          <Typography>{DATA.createdAt}</Typography>
          Last updated on:
          <Typography>{DATA.updatedAt}</Typography> <br /> <br />
          Description: <br /> <br />
          <TextField
            sx={{ width: "300px" }}
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            defaultValue={DATA.Description}
            disabled
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            textAlign: "left",
            flexDirection: "column",
            gap: "10px",
            width: "300px",
          }}
        >
          {error && <>Error Server</>}
          <Typography>Users Who Like This Book</Typography>
          {DATA.Likes?.map((useR, index) => {
            <div key={index}>{useR._id}</div>;
          })}
          <Button variant="outlined" onClick={favorite}>
            add to favorite
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookFavoris;
