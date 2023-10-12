import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../redux/product/productSlice';
import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { logout } from '../../redux/auth/userSlice';
import { sellerLogout } from '../../redux/seller/auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Avatar } from '@mui/material';
import { DiGitCompare } from 'react-icons/di'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
      [theme.breakpoints.up('md')]: {
        width: '24ch', // Double the width for md and larger devices
        '&:focus': {
          width: '40ch', // Double the width when focused for md and larger devices
        },
      },
    },
  },
}));
export default function Header() {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [isMenuItemsOpen, setIsMenuItemsOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.products);
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { isSeller, seller } = useSelector(state => state.sellerAuth);
  const { isAdmin } = useSelector(state => state.superAdmin);
  const { cartItems, wishlist, compareProducts } = useSelector(state => state.cart);



  const [isLoginMenuOpen, setIsLoginMenuOpen] = React.useState(false);
  const loginButtonRef = React.useRef(null);

  const handleLoginMenuOpen = () => {
    setIsLoginMenuOpen(true);
  };

  const handleLoginMenuClose = () => {
    setIsLoginMenuOpen(false);
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






  useEffect(() => {
    navigate(`?keyword=${encodeURIComponent(searchTerm)}`, { replace: true });
  }, [searchTerm, navigate])







  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };




  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };




  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };



  const handleMenuItemsClose = () => {
    setAnchorElMenu(null);
    setIsMenuItemsOpen(false)
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuItemsToggle = (event) => {
    setAnchorElMenu(event.currentTarget);
    setIsMenuItemsOpen(!isMenuItemsOpen);
  };



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ marginTop: '2.6rem' }}
    >
      {
        isAuthenticated && <>
          <MenuItem onClick={handleMenuClose}> <Link
            to="/profile"
            className=""
          >
            Profile
          </Link></MenuItem>
          <MenuItem onClick={handleMenuClose}> <div
            onClick={logoutHandler}
            className=""
          >
            Logout
          </div></MenuItem>
        </>
      }



      {
        isSeller && <>
          <MenuItem onClick={handleMenuClose}>       <Link
            to="/seller/profile"
            className=""
          >
            Profile
          </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>       <Link
            to="/seller/profile"
            className=""
          >
            <Link to={"/seller/dashboard"} className="">Dashboard</Link>
          </Link>
          </MenuItem>


          <MenuItem onClick={handleMenuClose}>
            <div
              onClick={sellerLogoutHandler}
              className=""
            >
              Logout
            </div>
          </MenuItem>
        </>
      }
      {isAdmin && <MenuItem onClick={handleMenuClose}>
        <Link className='' to={"/admin/dashboard"}>Dashboard</Link>

      </MenuItem>}

    </Menu>
  );



  const renderMenuItems = (
    <Menu
      anchorEl={anchorElMenu}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      id={'primary-menu-items'}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isMenuItemsOpen}
      onClose={handleMenuItemsClose}
      style={{marginTop:'2.6rem'}}
    >
      <MenuItem onClick={handleMenuItemsClose}>
        <Link to={"/"} >Home</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuItemsClose}>
        <Link to={"/products"}>
          Products
        </Link>
      </MenuItem>
    </Menu>
  );


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      style={{marginTop:"2.6rem"}}
      onClose={handleMobileMenuClose}
    >
      {
        isAuthenticated && <>
          <MenuItem onClick={handleMenuClose}>


            <IconButton size="large" color="inherit">
              <AccountCircle />
            </IconButton>

            <Link
              to="/profile"
              className=""
            >
              Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>

            <IconButton size="large" color="inherit">
              <LogoutIcon />
            </IconButton>
            <div
              onClick={logoutHandler}
              className=""
            >
              Logout
            </div>
          </MenuItem>
        </>
      }



      {
        isSeller && <>
          <MenuItem onClick={handleMenuClose}>       <Link
            to="/seller/profile"
            className=""
          >
            Profile
          </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>       <Link
            to="/seller/profile"
            className=""
          >
            <Link to={"/seller/dashboard"} className="">Dashboard</Link>
          </Link>
          </MenuItem>

          <MenuItem onClick={handleMenuClose}>
            <div
              onClick={sellerLogoutHandler}
              className=""
            >
              Logout
            </div>
          </MenuItem>
        </>
      }
      {isAdmin && <MenuItem onClick={handleMenuClose}>
        <Link className='' to={"/admin/dashboard"}>Dashboard</Link>

      </MenuItem>}


      <MenuItem>
        <Link to="/cart" className='flex items-center '>
          <IconButton size="large" aria-label="show product in cart" color="inherit">
            <Badge badgeContent={cartItems?.length || 0} color="error">

              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/wishlist" className='flex items-center '>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={wishlist?.length || 0} color="error">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
          <p>Wishlist</p>
        </Link>
      </MenuItem>


      <MenuItem>
        <Link to="/compare" className='flex items-center '>
          <IconButton size="large" aria-label="show product in cart" color="inherit">
            <Badge badgeContent={compareProducts?.length || 0} color="error">

              <DiGitCompare />
            </Badge>
          </IconButton>
          <p>Compare</p>
        </Link>
      </MenuItem>

      {
        (!isAuthenticated && !isAdmin && !isSeller) && <>  <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >

            <LoginIcon />
          </IconButton>
          <Link to="/login">Login(Buyer)</Link>



        </MenuItem>

          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >

              <LoginIcon />
            </IconButton>
            <Link to="/seller/login">Login(Seller)</Link>
          </MenuItem>
        </>

      }



    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#00003c" }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenuItemsToggle}
            size="large"
            edge="end"
            aria-controls={'primary-menu-items'}
            aria-haspopup={'true'}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to={"/"}>  ECOM</Link>
          </Typography>
          <Search style={{ position: "relative" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={searchTerm}
              onChange={handleSearchChange}
              inputProps={{ 'aria-label': 'search' }}
            />

            { searchTerm && searchResults && searchResults?.length > 0 && (
              <div className="absolute top-full px-4 py-2 bg-[#00003c] w-full text-white z-50">
                {searchResults.map((product) => (
                  <Link
                    onClick={clearSetResult}
                    key={product._id}
                    to={`/products?keyword=${product.name.split(" ")[0]}`}
                    className="flex py-1 gap-2 items-center block text-white hover:text-gray-400 justify-between"

                  >
                    <span>{product.name.split(" ")[0]}</span>  <SearchIcon />
                  </Link>
                ))}
              </div>
            )}

          </Search>


          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Link to='/cart'> <Badge badgeContent={cartItems?.length || 0} color="error">

                <ShoppingCartIcon />
              </Badge></Link>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Link to="/wishlist">
                <Badge badgeContent={wishlist?.length || 0} color="error">
                  <FavoriteBorderIcon />
                </Badge>
              </Link>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Link to="/compare">   <Badge badgeContent={compareProducts?.length || 0} color="error">
                <DiGitCompare />
              </Badge></Link>
            </IconButton>
            {
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {isAuthenticated && <>

                  <Avatar
                    src={user?.avatar?.url}
                    alt={user?.name}
                    className="rounded-full w-12 h-12"
                  />
                </>}


                {isSeller && <>

                  <Avatar
                    src={seller?.avatar?.url}
                    alt={seller?.name}
                    className="rounded-full w-12 h-12"
                  />
                </>}

                {
                  isAdmin && <MoreIcon/>
                }
              </IconButton>
            }
          </Box>
          <Box>

            {
              (!isAuthenticated && !isAdmin && !isSeller) && <div className='hidden md:block'>
                <IconButton
                  ref={loginButtonRef}
                  onClick={handleLoginMenuOpen}
                  color="inherit"
                  size='small'
                >
                  Login
                </IconButton>
                <Menu
                  open={isLoginMenuOpen}
                  onClose={handleLoginMenuClose}
                  anchorEl={loginButtonRef.current}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem><Link onClick={handleLoginMenuClose} to="/seller/login">Login as Seller</Link></MenuItem>
                  <MenuItem><Link onClick={handleLoginMenuClose} to="/login">Login as Buyer</Link></MenuItem>
                </Menu>
              </div>

            }

          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>

      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderMenuItems}
    </Box>
  );
}
