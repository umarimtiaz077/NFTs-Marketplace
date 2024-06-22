import React, { useState } from 'react';

const UserProfileForm = ({ walletAddress, onSubmit }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (event) => {
    setProfilePic(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Prepare form data
    const formData = new FormData();
    formData.append('walletAddress', walletAddress);
    formData.append('displayName', displayName);
    formData.append('email', email);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Display Name:</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Profile Picture:</label>
        <input type="file" onChange={handleFileChange} accept="image/*" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserProfileForm;
