// MyComponent.jsx
import React, { useState, useEffect } from 'react';
import '../components/Assignment.css'; // Import the CSS file
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons

const Assignment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState({ admins: [], members: [] });

  useEffect(() => {
    // Fetch user profiles from the API
    const fetchProfiles = async () => {
      try {
        const response = await fetch('https://nijin-server.vercel.app/api/team-members');
        if (!response.ok) {
          throw new Error('Failed to fetch profiles');
        }
        const data = await response.json();
        // Separate profiles into admins and members based on role
        const admins = data.filter(profile => profile.role === 'admin');
        const members = data.filter(profile => profile.role === 'member');
        setProfiles({ admins, members });
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  // Function to filter profiles based on search query
  const filteredProfiles = (list) => {
    return list.filter(profile => 
      profile.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div>
      <div className="header-container">
        <header className="header">
          <h1>Team</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>
        </header>
      </div>
      <div className="content-container">
        <div className="content">
          <div className="admins-container">
            <h2>Administrators</h2>
            <div className="grid-container">
              {filteredProfiles(profiles.admins).map((profile, index) => (
                <div key={index} className="profile-container">
                  <img src={profile.img} alt={`${profile.first_name} ${profile.last_name}`} className="profile-image" />
                  <div className="profile-info">
                    <p className='username'>{profile.first_name} {profile.last_name}</p>
                    <p className='email'>{profile.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr></hr>
          <div className="members-container">
            <h2>Members</h2>
            <div className="grid-container">
              {filteredProfiles(profiles.members).map((profile, index) => (
                <div key={index} className="profile-container">
                  <img src={profile.img} alt={`${profile.first_name} ${profile.last_name}`} className="profile-image" />
                  <div className="profile-info">
                    <p className='username'>{profile.first_name} {profile.last_name}</p>
                    <p className='email'>{profile.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
