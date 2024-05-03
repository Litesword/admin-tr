import React, { useState } from 'react';
import './MyForm.css';
import axios from "axios";

function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [mobile, setmobile] = useState('')
  const [number, setnumber] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams({
        userName: formData.name,
        email: formData.email,
        mobilePhone: formData.phone
      }).toString();

      const res = await axios.post(`http://localhost:8080/api/registrate?${queryParams}`);
      
      console.log("Form submitted successfully!");
      
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
    } catch (error) {
      console.error('Error occurred while submitting the form:', error);
    }
  };
  const Change = (event) =>{
    
    setmobile(event.target.value)
  }

  const Remove = (event) =>{
  
    setnumber(event.target.value)
  }

  const get_details = async (e) => {
    e.preventDefault();
    const result = await axios.get(`http://localhost:8080/api/registrate/${mobile}`);
  console.log(result.data);
  setFormData({
    name: result.data.userName,
    email: result.data.email,
    phone: result.data.mobilePhone
  });
  if(!result.data){
    console.log("no such record exist with given phone number")
  }
  }

  const del = async (e) => {
    e.preventDefault();
    const result =await axios.delete(`http://localhost:8080/api/registrate/${mobile}`);
  console.log(result);
  }

  return (
    <>
    
    <form className="my-form" onSubmit={handleSubmit}>
    <h2>create user</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input id="phone" name="phone" value={formData.phone} onChange={handleChange}></input>
      </div>
      <button type="submit">Submit</button>
    </form>
    <form className="my-form" onSubmit={get_details}>
    <h2>view user</h2>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input id="phone" name="phone" value={mobile} onChange={Change}></input>
      </div>
      <button type="submit">GET</button>
    </form>
    <form className="my-form" onSubmit={del}>
    <h2>delete user</h2>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input id="phone" name="phone" value={number} onChange={Remove}></input>
      </div>
      <button type="submit">Delete</button>
    </form>
    </>
  );
}

export default MyForm;