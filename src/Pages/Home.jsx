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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [users, setusers] = useState({
    id: userdata.length + 1,
    name: "",
    email: "",
    mobile: "",
  });
  console.log(userdata, "user");
  const onchangeinputenput = (e) => {
    setusers({ ...users, [e.target.name]: e.target.value });
  };
  const { name, email, mobile } = users;

  const [id, setId] = useState(null);

  const addUser = (e) => {
    e.preventDefault();
    console.log(id, "id");

      console.log(users, "users");
      setdata([...userdata, users]);
      setusers({});
      handleClose();

  };


  const Update = (e)=>{
e.preventDefault()
if(name &&email&&mobile){
    let newState = userdata.map(obj => {


    console.log(id)
    if (obj.id === id) {
      return {...obj,
        id :id,
        name: name,
        email:email,
        mobile:mobile
    };
    }

    // 👇️ otherwise return the object as is
    return obj;
  });

    setdata(newState);
    setusers({});
    handleClose();
}else{
    alert("all field required")
}

  }
  console.log(users);




  const handelEdit = (id) => {

    let objIndex = userdata.findIndex((obj) => obj.id == id);
    setId(id);
    console.log(id);

    setusers(userdata[objIndex]);
    handleShow();

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
  const [text, setText] = useState(" ");

  const searchUser = () => {

    if(text){
        let user = userdata.filter((item) => {
            return (
              item.name.toLowerCase().includes(text.toLowerCase()) ||
              item.email.toLowerCase().includes(text.toLowerCase()) ||
              item.mobile.toLowerCase().includes(text.toLowerCase())
            );
          });
          setdata(user)
    }else{
        location.reload()
    }


};

//   useEffect(() => {


//     searchUser();
//   }, [text]);

  return (
    <>
      <div className="container my-5">
        <h3 className="text-center my-5">Crud Application</h3>
        <div className="mx-auto text-center">
          <Button variant="primary" onClick={handleShow}>
            Add user
          </Button>

          <input
          placeholder="search user"
          className="mx-3"
            onChange={(e) => {
              setText(e.target.value);
            }}
            type="text"
          />
          <button  onClick={searchUser}>search</button>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {userdata.length > 0 ?
              userdata.map((item, i) => {
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
                        size={20}
                        className="mr-3"
                      />{" "}
                      <AiFillDelete
                        onClick={() => {
                          HandelDelete(item.id);
                        }}
                        size={20}
                        className="mr-3"
                      />
                      &nbsp;{" "}
                      <GrView
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
              :"no data found"
              }
          </tbody>
        </table>
      </div>

      {/* add user modal  */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
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
            {id ? (
              <button
                onClick={(e) => {
                  Update(e);
                }}
                type="submit"
                class="btn btn-primary"
              >
                update user
              </button>
            ) : (
              <button
                onClick={(e) => {
                  addUser(e);
                }}
                type="submit"
                class="btn btn-primary"
              >
                Submit
              </button>
            )}
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
