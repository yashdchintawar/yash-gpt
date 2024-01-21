import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoMdLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const LoginData = new FormData(e.currentTarget);
    const email = LoginData.get("email") as string;
    const password = LoginData.get("password") as string;
    try {
      toast.loading("Signing In", {id : "login"});
      await auth?.login(email, password);
      toast.success("Sign In Successfully", {id : "login"});
    } catch (error) {
      console.log(error);
      toast.error("Sign In Failed", {id : "login"});
    }
  };
  useEffect(() => {
    if(auth?.user){
      return navigate("/chat");
    }
  })
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={14}
      >
        <form
          onSubmit={handleLoginSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              LOGIN
            </Typography>
            <CustomizedInput
              type="email"
              name="email"
              label="Enter Your Email"
            />
            <CustomizedInput
              type="password"
              name="password"
              label="Enter Your Password"
            />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoMdLogIn />}
            >
              LOGIN
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
