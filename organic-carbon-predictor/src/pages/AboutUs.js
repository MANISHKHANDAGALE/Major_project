import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./AboutUs.css";
import Navbar from "../Components/Navbar";

const teamMembers = [
  {
    name: "Manish S Khandagale",
    role: "Full-Stack Developer",
    github: "https://github.com/manish",
    linkedin: "https://linkedin.com/in/manish",
    instagram: "https://instagram.com/manish",
  },
  {
    name: "Akshay B Satpute",
    role: "Data Scientist",
    github: "https://github.com",
    linkedin: "https://linkedin.com/in",
    instagram: "https://instagram.com",
  },
  {
    name: "Pradeep Rathod",
    role: "Backend Developer",
    github: "https://github.com",
    linkedin: "https://linkedin.com/in",
    instagram: "https://instagram.com",
  },
];

const AboutUs = () => {
  return (
    <div className="about-container">
     <Navbar/>
      <h1 className="about-title glass-effect">Meet Our Team</h1>
      <div className="about-list">
        {teamMembers.map((member, index) => (
          <div key={index} className="about-card">
            <h2 className="about-name">{member.name}</h2>
            <p className="about-role">{member.role}</p>
            <div className="about-icons">
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="about-icon">
                <FaGithub />
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="about-icon">
                <FaLinkedin />
              </a>
              <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="about-icon">
                <FaInstagram />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
