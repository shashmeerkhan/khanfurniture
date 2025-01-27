import Image from "next/image";
import React from "react";
import logo from "../../public/WhatsApp_Image_2025-01-26_at_06.05.59_a09059da-removebg-preview.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Info */}
          <div className="space-y-4">
            <Image src={logo} alt="Logo" width={50} height={50} />
            <h2 className="text-xl font-bold text-white">Khan Furniture</h2>
            <p className="text-sm leading-relaxed">
              17 Princess Road, London, Greater London NW1 8JR, UK
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="hover:text-blue-400 transition duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-blue-400 transition duration-200"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-blue-400 transition duration-200"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-400 transition duration-200"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@khanfurniture.com</li>
              <li>Phone: +44 123 456 7890</li>
              <li>Hours: Mon-Fri, 9 AM - 5 PM</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li className="bg-gray-700 hover:bg-blue-500 transition h-10 w-10 rounded-full flex items-center justify-center">
                <a
                  href="https://www.facebook.com/kshahmeer10/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f text-white"></i>
                </a>
              </li>
              <li className="bg-gray-700 hover:bg-blue-600 transition h-10 w-10 rounded-full flex items-center justify-center">
                <a
                  href="https://www.linkedin.com/in/shahmeer-khan-96b1a42b4/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin-in text-white"></i>
                </a>
              </li>
              <li className="bg-gray-700 hover:bg-gray-600 transition h-10 w-10 rounded-full flex items-center justify-center">
                <a
                  href="https://github.com/shashmeerkhan/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github text-white"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>© 2025 Khan Furniture. All rights reserved.</p>
          <ul className="flex space-x-6 mt-4 sm:mt-0">
            <li>
              <a
                href="#privacy"
                className="hover:text-blue-400 transition duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#terms"
                className="hover:text-blue-400 transition duration-200"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
