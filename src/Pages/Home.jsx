import React, { useEffect, useState } from "react";
import data from "../data";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { GrView } from "react-icons/gr";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal1 from "@mui/material/Modal";
import EditUser from "./EditUser";

const Home = () => {
  const [userdata, setdata] = useState([
    {
      id: 1,
      name: "Aaron",
      mobile: "5785664545",
      email: "aaron@gmail.com",
    },
    {
      id: 2,
      name: "Buincy Hanson",
      mobile: "5785664545",
      email: "hanson@gmail.com",
    },
  ]);
  console.log(userdata, "userdata");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [users, setusers] = useState({
    id: userdata.length + 1,
    name: "",
    email: "",
    mobile: "",
  });

  const handleClose2 = () => {
    setShow1(false);
    setusers({ users: {} });
  };
  const handleShow1 = () => {
    setShow1(true);
  };
  const handleClose = () => {
    setShow(false);
    setusers({ users: {} });
  };
  const handleShow = () => {
    setShow(true);
  };

  console.log(userdata, "user");

  // onchange function
  const onchangeinputenput = (e) => {
    setusers({ ...users, [e.target.name]: e.target.value });
  };
  const { name, email, mobile } = users;

  const [id, setId] = useState(null);

  //   add user

  const addUser = (e) => {
    e.preventDefault();
    console.log(id, "id");

    console.log(users, "users");
    setdata([...userdata, users]);
    setusers({});
    handleClose();
  };

  //   update function
  const Update = (e) => {
    e.preventDefault();
    if (name && email && mobile) {
      let newState = userdata.map((obj) => {
        console.log(id);
        if (obj.id === id) {
          return { ...obj, id: id, name: name, email: email, mobile: mobile };
        }
        return obj;
      });
      setdata(newState);
      setusers({});
      handleClose2();
      setId("");
    } else {
      alert("all field required");
    }
  };

  //  open edit modal function

  const handelEdit = (id) => {
    let objIndex = userdata.findIndex((obj) => obj.id == id);
    setId(id);
    console.log(id);
    setusers(userdata[objIndex]);
    handleShow1();

    console.log(users, "users");
  };

  //   delete function
  const HandelDelete = (id) => {
    setdata(userdata.filter((item) => item.id !== id));
  };

  //   view user section
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose1 = () => setOpen(false);
  const [userView, setUserview] = useState(Object);

  const HandelView = (id) => {
    handleOpen();
    console.log(userdata[id], "users");

    let objIndex = userdata.findIndex((obj) => obj.id == id);

    setUserview(userdata[objIndex]);
  };

  // search user
  const [text, setText] = useState("");
  useEffect(() => {
    const searchUser = () => {
      let map = userdata.filter((person) => {
        return (
          person.name.toLowerCase().includes(text.toLowerCase()) ||
          person.email.toLowerCase().includes(text.toLowerCase()) ||
          person.mobile.toLowerCase().includes(text.toLowerCase())
        );
      });

      if (text) {
        setdata(map);
      } else {
        setdata([
          {
            id: 1,
            name: "Aaron",
            mobile: "5785664545",
            email: "aaron@gmail.com",
          },
          {
            id: 2,
            name: "Buincy Hanson",
            mobile: "5785664545",
            email: "hanson@gmail.com",
          },
        ]);
      }
    };

    searchUser();
  }, [text]);

  return (
    <>
      <EditUser
        Update={Update}
        name={name}
        email={email}
        mobile={mobile}
        show1={show1}
        onchangeinputenput={onchangeinputenput}
        handleClose={handleClose2}
        handleShow={handleShow1}
      />
      <div className="container my-5">
        <h3 className="text-center my-5">User Application</h3>
        <div className="mx-auto text-center">
          <Button variant="primary" onClick={handleShow}>
            Add Contacts
          </Button>

          <input
            placeholder="search user"
            className="mx-3"
            onChange={(e) => {
              setText(e.target.value);
            }}
            type="text"
            value={text}
          />
        </div>

        <table class="table my-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">contact</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {userdata.length > 0
              ? userdata.map((item, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>
                        <BiSolidEdit
                          onClick={() => {
                            handelEdit(item.id);
                          }}
                          style={{ cursor: "pointer" }}
                          title="edit user"
                          size={20}
                          className="mr-3"
                          color="blue"
                        />{" "}
                        <AiFillDelete
                          style={{ cursor: "pointer" }}
                          title="delete user"
                          onClick={() => {
                            HandelDelete(item.id);
                          }}
                          size={20}
                          color="red"
                          className="mr-3"
                        />
                        &nbsp;{" "}
                        <GrView
                          style={{ cursor: "pointer" }}
                          title="view user"
                          onClick={() => {
                            HandelView(item.id);
                          }}
                          size={20}
                          className="mr-3"
                        />
                        &nbsp;{" "}
                      </td>
                    </tr>
                  );
                })
              : "no data found"}
          </tbody>
        </table>
      </div>

      {/* add user modal  */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={addUser}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                type="text"
                value={name}
                name="name"
                onChange={(e) => {
                  onchangeinputenput(e);
                }}
                placeholder="Enter your Name"
                className="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email
              </label>
              <input
                type="text"
                value={email}
                name="email"
                onChange={(e) => {
                  onchangeinputenput(e);
                }}
                placeholder="Enter your Name"
                className="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label">mobile</label>
              <input
                type="text"
                value={mobile}
                name="mobile"
                onChange={(e) => {
                  onchangeinputenput(e);
                }}
                placeholder="Enter your Name"
                className="form-control"
                required
              />
            </div>

            <br />
            <br />
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* user view modal */}
      <Modal1
        open={open}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            user details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            name :{userView?.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            email :{userView?.email}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            mobile :{userView?.mobile}
          </Typography>
        </Box>
      </Modal1>
    </>
  );
};

export default Home;
