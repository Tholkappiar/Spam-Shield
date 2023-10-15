import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
import Popup from "reactjs-popup";
import "./Popup.css";
import Footer_Terms from "./Footer-Terms";
import Footer_Policy from "./Footer-policy";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const Nav = useNavigate();

  // Define the social media profile URLs
  const facebookURL = "https://www.facebook.com/";
  const instagramURL = "https://www.instagram.com/";
  const twitterURL = "https://twitter.com/";
  const githubURL = "https://github.com/";
  const dribbbleURL = "https://dribbble.com/";

  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-900">
        <div>
          <h1 className="w-full text-3xl font-bold text-[#3B82F6]">
            SPAM SHIELD
          </h1>
          <p className="py-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id odit
            ullam iste repellat consequatur libero reiciendis, blanditiis
            accusantium.
          </p>
        </div>
        <div className="lg:col-span-2 flex justify-between mt-6">
          <div>
            <h6 className="font-medium text-gray-400" onClick={() => { Nav("/AdminLogin") }}>Admin</h6>
            <ul>
              <li className="py-2 text-sm"><Footer_Policy /></li>
              <li><Footer_Terms /></li>
            </ul>
          </div>
          <div className="flex justify-between md:w-[75%] my-6">
            {/* Add anchor tags with href attributes for each social media icon */}
            <a href={facebookURL} target="_blank" rel="noopener noreferrer">
              <FaFacebookSquare size={30} color="#333" />
            </a>
            <a href={instagramURL} target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} color="#333" />
            </a>
            <a href={twitterURL} target="_blank" rel="noopener noreferrer">
              <FaTwitterSquare size={30} color="#333" />
            </a>
            <a href={githubURL} target="_blank" rel="noopener noreferrer">
              <FaGithubSquare size={30} color="#333" />
            </a>
            <a href={dribbbleURL} target="_blank" rel="noopener noreferrer">
              <FaDribbbleSquare size={30} color="#333" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
