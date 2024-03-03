import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoMdLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const SignupData = new FormData(e.currentTarget);
    const name = SignupData.get("name") as string;
    const email = SignupData.get("email") as string;
    const password = SignupData.get("password") as string;
    try {
      toast.loading("Signing Up", {id : "signup"});
      await auth?.signup(name, email, password);
      toast.success("Sign Up Successfully", {id : "signup"});
    } catch (error) {
      console.log(error);
      toast.error("Sign Up Failed", {id : "signup"});
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
          onSubmit={handleSignupSubmit}
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
              SIGN UP
            </Typography>
            <CustomizedInput
              type="text"
              name="name"
              label="Enter Your Full Name"
            />
            <br />
            <CustomizedInput
              type="email"
              name="email"
              label="Enter Your Email"
            />
            <br />
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
              SIGN UP
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Signup;
