import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users,setUsers] = useState([]);
  //useRef is a react hook
  const nameRef = useRef()
  const emailRef = useRef()

  useEffect( ()=>{
    fetch('http://localhost:5000/users')
    .then(response => response.json())
    .then(data => setUsers(data))
 },[]);

 const handleAddUser= e =>{
   const name = nameRef.current.value;
   const email = emailRef.current.value;
   const newUser = {name:name,email:email}
   //or id property name and key is same: const newUser = {name,email}

    console.log(name,email);

   //send data to server by using axios or async ,other method see mDN node post using fetch:
   fetch('http://localhost:5000/users',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
   body: JSON.stringify(newUser)
   })
   .then(res => res.json())
   .then(data => {
     console.log(data);
     const addeduser =data;
     const newUsers =[...users,addeduser];
     setUsers(newUsers);

     
   })
nameRef.current.value='';
emailRef.current.value='';
    e.preventDefault()
 }
  
  return (
    <div className="App">
      <h2>This is my new website888.</h2>
      <p>It will connected with node start in port 5000</p>
      <p>All users:{users.length}</p>




        <form onSubmit={handleAddUser}>
          <input type='text' ref={nameRef} placeholder='name'></input>
          <br></br>
           <input type='email'ref={emailRef} placeholder='Your email'></input>
          <br></br>
          <input type='submit' placeholder='submit'></input>
        </form>



      <ul>
        {
          users.map(user =><li>{user.name} - {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
