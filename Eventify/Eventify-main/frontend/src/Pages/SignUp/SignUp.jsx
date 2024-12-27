import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [passMatch, setPassMatch] = useState("empty");
  const [pass, setPass] = useState();
  const [conPass, setConPass] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e);
    const data = {
      firstName: firstName,
      lastName: lastName,
      course: course,
      branch: branch,
      email: email,
      password: password,
      confirmPass: confirmPass,
    };
    console.log(data);
    // setFormData(data);

    let response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    response = await response.json();
    if (response.success === "false") {
      alert(response.message);
    } else {
      navigate("/login");
    }
  };

  const passHandler = (cp) => {
    if (pass === cp) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-xl">
        <h2 className="text-3xl font-bold text-center text-[#9333ea]">
          Create an Account
        </h2>
        <form onSubmit={submitHandler} className="space-y-5">
          <TextField
            id="outlined-required"
            label="First Name"
            placeholder="Enter the first name"
            className="w-full"
            onChange={(e) => setFirstName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#9333ea",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#9333ea",
              },
            }}
          />
          <TextField
            id="outlined-required"
            label="Last Name"
            placeholder="Enter the last name"
            className="w-full"
            onChange={(e) => setLastName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#9333ea",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#9333ea",
              },
            }}
          />

          <Select
            required
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            displayEmpty
            className="user-input"
            style={{ marginTop: "16px" }}
          >
            <MenuItem value="" disabled>
              Select Course
            </MenuItem>
            <MenuItem value="b.tech">B.Tech</MenuItem>
            <MenuItem value="mca">MCA</MenuItem>
            <MenuItem value="bca">MBA</MenuItem>
            <MenuItem value="b.pharma">B. pharma</MenuItem>
            <MenuItem value="m.pharma">M. pharma</MenuItem>
          </Select>

          {course == "b.tech" && (
            <>
              <Select
                required
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                displayEmpty
                className="user-input"
                style={{ marginTop: "16px" }}
              >
                <MenuItem value="" disabled>
                  Select Branch
                </MenuItem>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Civil">Civil</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="Mechanical">Mechanical</MenuItem>
              </Select>
            </>
          )}
          <TextField
            id="outlined-required"
            label="Email"
            placeholder="Enter E-mail"
            className="w-full"
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#9333ea",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#9333ea",
              },
            }}
          />

          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter Password"
            className="w-full"
            onChange={(e) => {
              setPass(e.target.value);
              setPassword(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#9333ea",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#9333ea",
              },
            }}
          />

          {passMatch === "empty" && <p></p>}
          {passMatch === true && (
            <p className="text-green-600">Passwords match!</p>
          )}
          {passMatch === false && (
            <p className="text-red-600">Passwords don't match!</p>
          )}

          <TextField
            id="outlined-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            placeholder="Confirm password"
            className="w-full"
            onChange={(e) => {
              setConPass(e.target.value);
              setConfirmPass(e.target.value);
              passHandler(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#9333ea",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#9333ea",
              },
            }}
          />

          <div className="flex justify-between items-center">
            <Link
              to="/login"
              className="text-[#9333ea] hover:underline hover:text-[#7b2acc]"
            >
              Already have an account? Login
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-[#9333ea] text-white rounded-md hover:bg-[#7b2acc] transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
