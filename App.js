//This file defines the main React component that renders the list of users, 
//allows the user to create a new user, update and delete an existing user.
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, createUser, updateUser, deleteUser, } from './store';

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleCreateUser = () => {
    dispatch(createUser({ name, email, gender, status }));
    setName('');
    setEmail('');
    setGender('');
    setStatus('');
  };

  const handleUpdateUser = (id) => {
    const user = users.find((user) => user.id === id);
    dispatch(updateUser(id, { ...user, name, email, gender, status }));
    setName('');
    setEmail('');
    setGender('');
    setStatus('');
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <input
              id='1'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              id='2'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id='3'
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <input
              id='4'
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <button onClick={() => handleUpdateUser(user.id)}>Update user</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete user</button>
            {user.name} - {user.email} - {user.gender} - {user.status}
          </li>
        ))}
      </ul>
      <h2>Create User</h2>
      <input
        id='5'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        id='6'
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        id='7'
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <input
        id='8'
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={handleCreateUser}>Create</button>
    </div>
  );
}

export default App;
