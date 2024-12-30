import React, { useState, useEffect, useContext } from "react";
import data from "../../assets/data.json";
import { useParams } from "react-router-dom";
import axios from "../Api";
import AuthContext from "../context/AuthContext";

const EditProfile = () => {
  const { handle } = useParams();
  const { getLoggedIn, user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState(0);
  const [district, setDistrict] = useState(0);
  const [address, setAddress] = useState("");
  const [blood, setBlood] = useState(0);
  const [organ, setOrgan] = useState(0);
  const [edit, setEdit] = useState(true);
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const organs = [
    "Kidney",
    "Liver",
    "Heart",
    "Lung",
    "Pancreas",
    "Intestine",
    "Cornea",
    "Skin",
    "Bone and Tendons",
    "Heart Valve",
  ];

  useEffect(() => {
    setName(user.name);
    setAge(user.age);
    setGender(user.gender);
    setMail(user.email);
    setPhone(user.phone);
    data.states.map((e, i) => {
      if (e.state === user.state) {
        setState(i);
        setDistrict(e.districts.indexOf(user.district));
      }
    });
    setPassword("Lorem ipsum dolor sit amet consectetur adipisicing elit.");
    setAddress(user.address);
    setBlood(bloodGroups.indexOf(user.bloodGroup));
    setOrgan(organs.indexOf(user.organ));
  }, []);

  const update = async (e) => {
    const formData = {
      name: name,
      age: age,
      gender: gender,
      bloodGroup: bloodGroups[blood],
      organ: organs[organ],
      email: mail,
      phone: phone,
      state: data.states[state].state,
      district: data.states[state].districts[district],
      address: address,
    };

    await axios.put(`/user/`, formData).then(
      async (response) => {
        setEdit(!edit);
        await getLoggedIn();
        alert("User updated successfully");
      },
      (error) => {
        alert("User not updated");
      }
    );
  };

  return (
    <div>
      <section className="flex justify-center items-center">
        <form
          className="space-y-4 w-full max-w-4xl p-4 md:p-8"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            update();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold leading-8">
                Name:<font color="red">*</font>
              </label>
              <input
                className="w-full p-3 text-md border border-silver rounded"
                type="text"
                placeholder="Enter your full name"
                required
                disabled={edit}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="font-semibold leading-8">
                Age:<font color="red">*</font>
              </label>
              <input
                className="w-full p-3 text-md border border-silver rounded"
                type="number"
                placeholder="Enter your age"
                required
                disabled={edit}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label className="font-semibold leading-8">
                Gender:<font color="red">*</font>
              </label>
              <select
                className="w-full p-3 text-md border border-silver rounded"
                disabled={edit}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male" selected={gender === "male"}>
                  Male
                </option>
                <option value="female" selected={gender === "female"}>
                  Female
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold leading-8">
                Blood Group:<font color="red">*</font>
              </label>
              <select
                className="w-full p-3 text-md border border-silver rounded"
                disabled={edit}
                onChange={(e) => setBlood(e.target.value)}
              >
                {bloodGroups.map((e, i) => (
                  <option value={i} selected={blood === i}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold leading-8">
                Organ:<font color="red">*</font>
              </label>
              <select
                className="w-full p-3 text-md border border-silver rounded"
                disabled={edit}
                onChange={(e) => setOrgan(e.target.value)}
              >
                {organs.map((e, i) => (
                  <option value={i} selected={organ === i}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold leading-8">
                Mobile:<font color="red">*</font>
              </label>
              <input
                className="w-full p-3 text-md border border-silver rounded"
                type="number"
                placeholder="Enter your mobile"
                required
                disabled={edit}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold leading-8">Email:</label>
              <input
                className="w-full p-3 text-md border border-silver rounded"
                type="email"
                placeholder="Enter your email"
                disabled={edit}
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <div>
              <label className="font-semibold leading-8">Address:</label>
              <input
                className="w-full p-3 text-md border border-silver rounded"
                type="text"
                placeholder="Enter your address"
                disabled={edit}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={() => setEdit(!edit)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
            >
              {edit ? "Edit" : "Cancel"}
            </button>
            <button
              type="submit"
              className={`px-6 py-2 bg-blue-500 text-white rounded-md ${
                edit && "hidden"
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
