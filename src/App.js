import "./App.css";
import React, { useEffect, useState } from "react";

const App = () => {
  let [employeeData, updateEmp] = useState([]);
  let [data, updatedata] = useState({
    id: Date.now().toString(),
    name: "",
    salary: "",
    email: "",
    desc: "",
  });

  useEffect(() => {
    localStorage.setItem("empData", JSON.stringify(employeeData));
  }, [employeeData]);

  function inputfunc(e) {
    updatedata({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <>
      <div id="mainDiv">
        <div id="formdiv">
          <div id="fieldDiv">
            <center>
              <h1>Add Employee</h1>
            </center>
            <form>
              <input
                readOnly
                id="inputfield"
                type="text"
                name="id"
                placeholder="Employe ID"
                value={data.id}
              />
              <input
                id="inputfield"
                type="text"
                name="name"
                placeholder="Employe Name"
                value={data.name}
                onChange={inputfunc}
              />
              <input
                id="inputfield"
                type="email"
                name="email"
                placeholder="email"
                value={data.email}
                onChange={inputfunc}
              />
              <input
                id="inputfield"
                type="text"
                name="salary"
                placeholder="salary"
                value={data.salary}
                onChange={inputfunc}
              />
              <textarea
                id="inputfieldDesciption"
                name="desc"
                rows="5"
                placeholder="Description"
                value={data.desc}
                onChange={inputfunc}
              />
            </form>
            <center>
              <button
                id="addButton"
                onClick={() => {
                  const nameReg = /^[A-Za-z ]{2,30}$/;
                  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  const salaryReg = /^[0-9]+$/;
                  const descReg = /^.{10,}$/; // at least 10 characters

                  if (!nameReg.test(data.name)) {
                    alert("Name is not valid. Use 2–30 letters only.");
                  } else if (!emailReg.test(data.email)) {
                    alert("Email is not valid.");
                  } else if (!salaryReg.test(data.salary)) {
                    alert("Salary must be numeric.");
                  } else if (!descReg.test(data.desc)) {
                    alert("Description must be at least 10 characters long.");
                  } else {
                    console.log(data);
                    updateEmp([...employeeData, data]);
                    updatedata({ ...data, id: Date.now().toString() });
                  }
                }}
              >
                Add Employee
              </button>
            </center>
          </div>
        </div>
        {/* This is a comment inside JSX */}
        <div id="mainDataDiv">
          <center>
            <h2>Todo List</h2>
          </center>
          {employeeData.length === 0 ? (
            <center>
              <h2>No Data Found</h2>
            </center>
          ) : (
            employeeData.map((v, i) => {
              return (
                <div id="dataDiv" key={i}>
                  <div id="infoRow">
                    <span>ID:- {v.id}</span>
                    <span>Name:- {v.name}</span>
                    <span>Email:- {v.email}</span>
                    <span>Salary:- {v.salary}</span>
                  </div>
                  <p id="desc">{v.desc}</p>

                  <button
                    id="deleteButton"
                    onClick={() => {
                      let tempary = employeeData.filter((value, index) => {
                        return v.id !== value.id;
                      });
                      updateEmp(tempary);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    id="updateButton"
                    onClick={() => {
                      let tempary = employeeData.filter((value, index) => {
                        return v.id !== value.id;
                      });
                      updateEmp(tempary);
                      updatedata(v);
                    }}
                  >
                    Update
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default App;
