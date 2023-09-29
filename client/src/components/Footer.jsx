import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-bg text-white py-12">
      <div className="container mx-auto flex flex-wrap justify-between">
        {/* Footer Section 1: About Us */}
        <div className="w-[270px]">
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className=''>Empowering sellers and shoppers. Explore a world of possibilities with our multi-seller platform. Your marketplace, your way.</p>
        </div>

        {/* Footer Section 2: Quick Links */}
        <div className="w-[150px]">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="list-none">
            <li className="mb-2">
              <Link to="/">Home</Link>
            </li>
            <li className="mb-2">
              <Link to="/products">Products</Link>
            </li>
            <li className="mb-2">
              <Link to="/about">About Us</Link>
            </li>
             <li className="mb-2">
              <Link to="/cart">Cart</Link>
            </li> 
            <li className="mb-2">
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li className="mb-2">
              <Link to="/compare">Compare Products</Link>
            </li>
         
          </ul>
        </div>

        {/* Footer Section 3: Contact */}
        <div className="w-[200px]">
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p>Email: sunraz1666@gmail.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        {/* Footer Section 4: Newsletter */}
        <div className="w-[300px]">
          <h3 className="text-xl font-bold mb-4">Newsletter</h3>
          <p>Subscribe to our newsletter for updates.</p>
          <form className="mt-2">
          <div className='bg-white p-1 rounded bg-gray-600 text-black shadow flex gap-2 '>
          <input
              type="email"
              placeholder="email"
              className="px-1"
            />
            <button
              type="submit"
              className="btn"
            >
              Subscribe
            </button>
          </div>
          </form>
        </div>
      </div>

      
      <div className="bg-gray-900 py-2">
        <div className="container mx-auto text-center text-gray-500">
          &copy; {new Date().getFullYear()}   Eng&rarr;Ecom. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
