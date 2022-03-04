import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import "./styles.css";

export default function App() {
  const [employee, setEmployee] = useState([]);
  const [searchEmp, setSearchEmp] = useState("");

  const url = "https://hub.dummyapis.com/employee?noofRecords=100&idStarts=1";

  const data = async () => {
    const emp = await axios.get(`${url}`);
    // console.log(emp);
    setEmployee(emp.data);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="App">
      <p className="search-heading">search employee here</p>
      <input
        type="text"
        placeholder="Enter Employee Name..."
        className="search-box"
        onChange={(e) => setSearchEmp(e.target.value)}
      />

      <p className="employee-list">Employee List</p>
      <Table striped bordered hover className="table">
        <thead>
          <tr className="tr">
            <th>id</th>
            <th>Firstname</th>
            <th>lastname</th>
            <th>email</th>
            <th>phone</th>
            <th>age</th>
            <th>DOB</th>
            <th>salary</th>
            <th>address</th>
          </tr>
        </thead>
        {employee
          .filter((val) => {
            if (searchEmp === "") {
              return val;
            } else if (
              val.firstName.toLowerCase().includes(searchEmp.toLowerCase()) ||
              val.lastName.toLowerCase().includes(searchEmp.toLowerCase())
            ) {
              return val;
            } else {
              return 0;
            }
          })
          .map((employee) => (
            <tbody key={employee.id}>
              <tr className="tr">
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.contactNumber}</td>
                <td>{employee.age}</td>
                <td>{employee.dob}</td>
                <td>{employee.salary * 1000}</td>
                <td>{employee.address}</td>
              </tr>
            </tbody>
          ))}
      </Table>
    </div>
  );
}
