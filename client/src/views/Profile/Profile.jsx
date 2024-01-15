import { Box, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Msg from "../../components/Message";
import { useNavigate, useParams } from "react-router";
import Api from "../../Api/axios";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { Context } from "../../CONTEXT_API/ContextApi";
import { SnackbarProvider } from "notistack";
import { Link } from "react-router-dom";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Profile = () => {
  const { setUser } = useContext(Context);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  // HandleChange des Images
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };
  const uploadPhoto = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    if (file !== null) {
      setLoading(true);
      try {
        const { data } = await Api.put(`/USER/UPDATE-PHOTO/${id}`, formData);

        console.log(data);
        setFile(null);
        setLoading(false);

        setUser(data);
        Msg("Photo Uploaded Successfully", "success");

        return navigate("/book");
      } catch (error) {
        setLoading(false);
        console.log(error);
        return Msg(error.response.data.message, "error");
      }
    } else {
      setLoading(false);
      return Msg("Photo is required", "error");
    }
  };

  return (
    <>
    <SnackbarProvider autoHideDuration={2500} />

    <Box
    
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        mt:"80px",
        alignItems: "center",
        justifyItems: "center",
        gap: 2,
      }}
    >

      <Link to="/">
        {" "}
        <Button sx={{ width: "100px" }} variant="contained">
          Home
        </Button>
      </Link>
      <img
        className="img"
        src={
          file
            ? URL.createObjectURL(file)
            : "http://localhost:5001/images/userphoto.png"
        }
        loading="lazy"
        alt="img"
      />

      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          name="photo"
          id="file"
          onChange={handleFileInputChange}
        />
      </Button>
      {loading ? (
        <LoadingButton
          loading
          sx={{ width: "100px" }}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
        >
          Save
        </LoadingButton>
      ) : (
        <Button
          sx={{ width: "100px" }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={uploadPhoto}
        >
          Send
        </Button>

      )}
      
    </Box>
    </>
  );
};

export default Profile;
