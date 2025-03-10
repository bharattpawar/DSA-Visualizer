import React from "react";
import "./ContactUs.css";
import { FaInstagram, FaTwitter, FaEnvelope, FaGithub } from "react-icons/fa"; // Import icons from react-icons

const ContactUs = () => {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/kairi_747/",
      icon: <FaInstagram className="social-icon" />,
    },
    {
      name: "Twitter",
      url: "https://x.com/Bharatp26246423",
      icon: <FaTwitter className="social-icon" />,
    },
    {
      name: "Gmail",
      url: "mailto:bharat1234512345777@gmail.com",
      icon: <FaEnvelope className="social-icon" />,
    },
    {
      name: "GitHub",
      url: "https://github.com/bharattpawar",
      icon: <FaGithub className="social-icon" />,
    },
  ];

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <p>Feel free to reach out to me on any of these platforms:</p>
      <div className="social-links">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;