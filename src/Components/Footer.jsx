import React from "react";
import Container from "./Container";
import logo from "../assets/Logo.png";

import { FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0A192F] text-white py-10 relative w-screen left-1/2 -translate-x-1/2">
      <Container>
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-col md:flex-row items-center justify-between w-full mb-8 px-4">
            <div className="mb-6 md:mb-0">
              <img src={logo} alt="HERO.IO Logo" className="h-8" />{" "}
            </div>

            <div className="flex flex-col items-center md:items-end">
              <h3 className="text-gray-300 text-lg font-semibold mb-3">
                Social Links
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaYoutube size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaFacebook size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 w-full mb-8"></div>

          <div className="text-center text-gray-500 text-sm">
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
