import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const headingStyle = {
    color: '#008080'
  };
  useEffect(() => {
    axios.post('http://localhost:9999/list')
      .then(response => {
        setEmployees(response.data.employees);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  const insertClick = () => {
    navigate('/insert');
  };

  const searchClick = () => {
    navigate('/search');
  };

  return (
    <div className="landing-page-container">
     
      <h1 style={headingStyle}>Company Team Website</h1>
      <br/>
      <button className="action-button" onClick={insertClick}>Insert Your Details</button>
      <button className="action-button" onClick={searchClick}>Search Employee</button>
      <div>
        <br />
        <br />
        <h2 id="heading">Team Members</h2>
        <br />
       <ul>
          {employees.map(employee => (
            <li key={employee._id}>


            <div class="card" id="maincard">
<img 
              src={employee.image}
              alt="Employee" 
              className="employee-image"
          />
  <div className="card-body">
    <h5 className="card-title">Name: {employee.name}</h5>
    <p className="card-text">Role: {employee.role}</p>
    <p className="card-text">Thoughts: {employee.thoughts}</p>
  </div>
</div>
<br></br>
          </li>
          
          ))}
        </ul>



      </div>
    </div>
  );
};
export default LandingPage;
