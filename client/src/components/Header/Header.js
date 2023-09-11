import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { getAllProducts } from '../../redux/product/productSlice';
import { logout } from '../../redux/auth/userSlice';
import { sellerLogout } from '../../redux/seller/auth';
import { toast } from 'react-hot-toast';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Header = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.products);
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { isSeller, seller } = useSelector(state => state.sellerAuth);
  const { isAdmin } = useSelector(state => state.superAdmin);
  const { cartItems } = useSelector(state => state.cart);
  const [cartItemCount, setCartItemCount] = useState(0)
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginDropdownOpen = () => {
    setIsLoginDropdownOpen(true);
  };





  const handleProfileDropdownOpen = () => {
    setIsProfileDropdownOpen(true);
  };

  const handleProfileDropdownClose = () => {
    setIsProfileDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(async () => {
        dispatch(getAllProducts())
        setSearchResults(data.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())));

      }, 300)
    );
  };

  useEffect(() => {
    navigate(`?keyword=${encodeURIComponent(searchTerm)}`, { replace: true });
  }, [searchTerm, navigate])





  const clearSetResult = () => {
    setSearchResults([])

  }
  const logoutHandler = async () => {
    const res = await dispatch(logout())
    if (logout.fulfilled.match(res)) {
      toast.success(res.payload)
    } else if (logout.rejected.match(res)) {
      toast.error(res.payload)
    }
  }


  const sellerLogoutHandler = async () => {
    const res = await dispatch(sellerLogout())
    if (sellerLogout.fulfilled.match(res)) {
      toast.success(res.payload)
    } else if (sellerLogout.rejected.match(res)) {
      toast.error(res.payload)
    }

  }


  const cartPage = () => {
    navigate("/cart")
  }
  return (
    <nav className="bg-white shadow border-b border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-10">
      <Link to="/" className="text-xl font-bold text-gray-800">Logo</Link>
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 w-full bg-gray-100 z-100 py-4`}>

        <div className='flex gap-4 flex-col'><Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="block text-gray-800 hover:text-gray-600 px-4 py-2">Home</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} to="/products" className="block text-gray-800 hover:text-gray-600 px-4 py-2">Products</Link></div>
      </div>
      <form className=" flex items-center" >
        <div className='relative  '>
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-8 pr-3 py-1 border border-gray-200 shadow-sm focus:outline-none md:w-[400px] w-[200px]"

          />
          <AiOutlineSearch className='absolute left-2 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer' />
          {searchResults.length > 0 && searchTerm && (
            <div className="absolute top-full left-0 w-full bg-white py-4 border border-gray-200 shadow-sm">
              {searchResults.map((product) => (
                <Link
                  onClick={clearSetResult}
                  key={product._id}
                  to={`/products?keyword=${product.name.split(" ")[0]}`}
                  className="flex gap-2 items-center block text-gray-800 hover:text-gray-600 px-4 py-2"

                >
                  <AiOutlineSearch />  <span>{product.name.split(" ")[0]}</span>
                </Link>
              ))}
            </div>
          )}


        </div>
      </form>



      <div className='hidden  md:flex gap-2 items-center'>
        <Link to="/" className="block text-gray-800 hover:text-gray-600 px-4 py-2">Home</Link>
        <Link to="/products" className="block text-gray-800 hover:text-gray-600 px-4 py-2">Products</Link></div>

      <div className='flex md:gap-8 gap-4 items-center'>

        {
          !isSeller && !isAdmin && <button className="relative text-gray-500 " onClick={cartPage}>
            <ShoppingCartIcon />
            {cartItems && cartItems.length > 0 && (
              <span className="absolute top-[-8px] right-[-13px] text-white shadow bg-orange-500 px-2 py-1 text-black rounded-full text-xs">
                {cartItems && cartItems.length}
              </span>
            )}
          </button>
        }
        <div className='flex items-center gap-4'>

          {
            !isAuthenticated && !isSeller && !isAdmin ? <>

              <div className="relative"  >
                <button
                  className=" text-black bg-gray-50 rounded hover:bg-gray-100 py-1 px-2"
                  onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                  onMouseEnter={handleLoginDropdownOpen}
                >
                  Login
                </button>
                {isLoginDropdownOpen && (
                  <div className="absolute left-0 mt-4 w-40 bg-gray-100 border border-gray-200 shadow-sm py-2 z-10" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      Login as Buyer
                    </Link>
                    <Link
                      to="/seller/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      Login as Seller
                    </Link>
                  </div>
                )}
              </div>


            </> :

              <div></div>
          }
        </div>
        <div className='flex items-center gap-4'>

          {
            isSeller && seller && seller.avatar && <div
              className="relative rounded-full w-12 h-12 cursor-pointer"
              onMouseEnter={handleProfileDropdownOpen}
              onMouseLeave={handleProfileDropdownClose}
            >
              <img
                src={seller.avatar.url}
                alt={seller.name}
                className="rounded-full w-12 h-12"
              />
              {isProfileDropdownOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full bg-white border border-gray-200 shadow-sm py-2 z-10 w-[250%]">
                  <Link
                    to="/seller/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link to={"/seller/dashboard"} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Dashboard</Link>
                  <div
                    onClick={sellerLogoutHandler}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          }
          {
            isAuthenticated && user && user.avatar && <div
              className="relative rounded-full w-12 h-12 cursor-pointer"
              onMouseEnter={handleProfileDropdownOpen}
              onMouseLeave={handleProfileDropdownClose}
            >
              <img
                src={user.avatar.url}
                alt={user.name}
                className="rounded-full w-12 h-12"
              />
              {isProfileDropdownOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full bg-white border border-gray-200 shadow-sm py-2 z-10 w-[250%]">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  <div
                    onClick={logoutHandler}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          }


          {
            isAdmin && <Link className='px-2 py-1 bg-gray-100 shadow' to={"/admin/dashboard"}>Dashboard</Link>
          }



        </div></div>

      <div className="md:hidden">
        <button
          className="text-gray-800 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>



    </nav>
  );
};

export default Header;
