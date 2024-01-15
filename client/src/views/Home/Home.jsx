import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import Api from "../../Api/axios";
import Message from "../../components/Message";
import { SnackbarProvider } from "notistack";
import { useNavigate } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Context } from "../../CONTEXT_API/ContextApi";

function Home() {
  const { user, setUser } = useContext(Context);
  console.log(user);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const [loading, setLoading] = useState(false);
  const [EmailLogin, setEmailLogin] = useState(false);
  const [PasswordLogin, setPasswordLogin] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const HandleValidation = () => {
    const myVar = undefined;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const { FirstName, LastName, Email, Password, ConfirmPassword } = form;
    if (FirstName === myVar) {
      Message("FirstName is required", "error");
      return false;
    } else if (FirstName.length < 2) {
      Message("FirstName should be greater 3 characters", "error");
      return false;
    }
    if (LastName === myVar) {
      Message("LastName is required", "error");
      return false;
    } else if (LastName.length < 3) {
      Message("LastName should be greater 3 characters", "error");
      return false;
    } else if (Email === myVar) {
      Message("Email is required", "error");
      return false;
    } else if (!emailRegex.test(Email) & (Email.length > 0)) {
      Message("Email is not defined", "error");
      return false;
    } else if (Password === myVar) {
      Message("Password is required", "error");
      return false;
    } else if (Password.length <= 5) {
      Message("Password should be greater 5 characters", "error");
      return false;
    } else if (Password !== ConfirmPassword) {
      Message("Password and confirm passsword should be same", "error");
      return false;
    }
    return true;
  };

  const HandleValidationLogin = () => {
    const myVar = undefined;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (EmailLogin  === myVar) {
      Message("Email is required", "error");
      return false;
    } else if (!emailRegex.test(EmailLogin) & (EmailLogin.length > 1)) {
      Message("Email is not defined", "error");
      return false;
    } else if (PasswordLogin === myVar) {
      Message("Password is required", "error");
      return false;
    } else if (PasswordLogin.length < 3) {
      Message("Password should be greater 3 characters", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (HandleValidation()) {
      setLoading(true);
      try {
        const { data } = await Api.post("/USER/AJOUTER", { form });
        console.log(data);
        setLoading(false);
        Message("Success registration", "success");
        setTimeout(() => {
          window.location.reload("/home");
        }, 3000);
      } catch (error) {
        setLoading(false);
        console.log(error);
        return Message(error.response.data.message, "error");
      }
    } else {
      return setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (HandleValidationLogin()) {
      setLoading(true);
      try {
        const { data } = await Api.post("/USER/AUTH", {
          EmailLogin,
          PasswordLogin,
        });
        console.log(data);
        setLoading(false);
        setUser(data);

        navigate("/book");
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
      <Typography sx={{ fontSize: "40px", color: "#027bce" }}>
        Book Store Mern Application
      </Typography>

      <div>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            width: "100%",
            height: "80vh",
            justifyContent: "center",
            alignItems: "center",
            mb: "30px",
          }}
        >
          <Box sx={{ width: "600px" }}>
            <Typography sx={{ fontSize: "60px" }}>Registration</Typography>
            <TextField
              sx={{ margin: "5px", width: "80%" }}
              id="outlined-multiline-flexible"
              label="Firstname"
              name="FirstName"
              maxRows={4}
              autoFocus
              onChange={(e) => handleChange(e)}
              value={form.FirstName}
            />{" "}
            <br />
            <TextField
              sx={{ margin: "5px", width: "80%" }}
              id="outlined-multiline-flexible"
              label="Lastname"
              name="LastName"
              maxRows={4}
              onChange={(e) => handleChange(e)}
              value={form.LastName}
            />{" "}
            <br />
            <TextField
              sx={{ margin: "5px", width: "80%" }}
              id="outlined-multiline-flexible"
              label="Email"
              type="email"
              name="Email"
              maxRows={4}
              onChange={(e) => handleChange(e)}
              value={form.Email}
            />{" "}
            <br />
            <FormControl
              sx={{ margin: "5px", width: "80%" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="Password"
                onChange={(e) => handleChange(e)}
                type={showPassword ? "text" : "password"}
                value={form.Password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>{" "}
            <br />
            <FormControl
              sx={{ margin: "5px", width: "80%" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                onChange={(e) => handleChange(e)}
                name="ConfirmPassword"
                type={showPassword ? "text" : "password"}
                value={form.ConfirmPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <br />
            {loading && <CircularProgress />}
            {!loading && (
              <Button
                variant="contained"
                sx={{ margin: "5px", width: "80%" }}
                onClick={handleSubmit}
              >
                Register
              </Button>
            )}
          </Box>

          <Box sx={{ width: "600px" }}>
            <Typography sx={{ fontSize: "60px" }}>Login</Typography>
            <TextField
              sx={{ margin: "5px", width: "80%" }}
              id="outlined-multiline-flexible"
              label="Email"
              type="email"
              maxRows={4}
              onChange={(e) => setEmailLogin(e.target.value)}
            />{" "}
            <br />
            <FormControl
              sx={{ margin: "5px", width: "80%" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                onChange={(e) => setPasswordLogin(e.target.value)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>{" "}
            <br />
            <br />
            <Button
              variant="contained"
              sx={{ margin: "5px", width: "80%" }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Home;
