import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full p-10 bg-black text-white flex flex-wrap justify-around border-t border-gray-800">
      <div className="m-5 min-w-[200px]">
        <h3 className="text-lg font-bold mb-4">Explore</h3>
        <ul className="space-y-2">
          <li className="text-sm cursor-pointer transition-colors duration-300 hover:text-gray-400">Home</li>
          <li className="text-sm cursor-pointer transition-colors duration-300 hover:text-gray-400">Questions</li>
          <li className="text-sm cursor-pointer transition-colors duration-300 hover:text-gray-400">Articles</li>
          <li className="text-sm cursor-pointer transition-colors duration-300 hover:text-gray-400">Tutorials</li>
        </ul>
      </div>
      <div className="m-5 min-w-[200px]">
        <h3 className="text-lg font-bold mb-4">Support</h3>
        <ul className="space-y-2">
          <li className="text-sm cursor-pointer transition-colors duration-300 hover:text-gray-400">FAQs</li>
          <li className="text-sm cursor-pointer transition-colors duration-300 hover:text-gray-400">Help</li>
          <li className="text-sm cursor-pointer transition-colors duration-300 hover:text-gray-400">Contact Us</li>
        </ul>
      </div>
      <div className="m-5 min-w-[200px]">
        <h3 className="text-lg font-bold mb-4">Stay Connected</h3>
        <div className="space-y-2">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-gray-400">
            <i className="fab fa-facebook"></i> Facebook
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-gray-400">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-gray-400">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>
      <div className="w-full text-center pt-5 mt-5 border-t border-gray-800">
        <p>DEV@Deakin 2024</p>
        <ul className="flex justify-center gap-5 mt-3">
          <li className="text-sm cursor-pointer transition-colors duration-300 hover:text-gray-400">Privacy Policy</li>
          <li className="text-sm cursor-pointer transition-colors duration-300 hover:text-gray-400">Terms</li>
          <li className="text-sm cursor-pointer transition-colors duration-300 hover:text-gray-400">Code of Conduct</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
