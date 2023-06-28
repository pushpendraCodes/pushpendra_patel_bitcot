
import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";



const EditUser = ({handleClose ,onchangeinputenput,handleShow,show1 ,name , email, mobile ,Update}) => {



  return (
    <>
      <Modal show={show1} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={Update} >
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
            <button

                type="submit"
                class="btn btn-primary"
              >
                update user
              </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUser;
