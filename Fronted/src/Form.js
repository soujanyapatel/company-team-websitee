import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'
const Form = () => {
  const navigate= useNavigate();
  const [name,setname] = useState("");
  const [role,setrole] = useState("");
  const [thoughts,setthoghts] = useState("");
  const [imageUrl,setImageUrl]=useState("");
  console.log(imageUrl)
  const changeName = (e)=>{
    setname(e.target.value);
  }
  const changeRole = (e) => {
    console.log("Selected role:", e.target.value);
    setrole(e.target.value);
    e.preventDefault();
  }
  
  const changeThoughts = (e)=>{
    setthoghts(e.target.value);
  }
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('thoughts', thoughts);
    formData.append('image',imageUrl)
    await fetch('http://localhost:9999/insert', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate("/");
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
      });
  };
  const getUrl=(event)=>{
       setImageUrl(event.target.value) 
       //setImageUrl("https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
  }
  
  return (
    <div className="form-container">
      <form onSubmit={submitForm}>
        <label htmlFor="name">Enter Name</label>
        <input type="text" id="name" onChange={changeName} value={name} />
        <br />
        <label htmlFor="profile-pic-upload">Upload Profile Pic</label>
        <input type="text" id="profile-pic-upload"  onChange={getUrl} />
        <br />
        <label htmlFor="role">Your Role:</label>
        <select name="role" id="role" onChange={changeRole} value={role}>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Junior Developer">Junior Developer</option>
          <option value="Tester">Tester</option>
          <option value="HR">HR</option>
        </select>
        <br />
        <label htmlFor="thoughts">Say Your Thoughts About the Company:</label>
        <textarea
          id="thoughts"
          onChange={changeThoughts}
          value={thoughts}
          rows="4"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form;