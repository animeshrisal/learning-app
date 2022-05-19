import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";

const Navbar = (props: any): JSX.Element => {
  const auth = useSelector((reduxState: RootState) => reduxState.auth);

  const handleLogout = () => {

  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {auth.token ? (
          <>
            <li>
              <Link to="/teacher">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/profile">
                Profile
              </Link>
            </li>
            <li><span onClick={handleLogout}>Logout</span></li>
          </>
        ) : (
          <>
            <li><Link to="/auth/login">Login</Link></li>
            <li><Link to="/auth/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
