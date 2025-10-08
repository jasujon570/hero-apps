import { Link, NavLink } from "react-router";
import logoImg from "../assets/logo.png";
import GithubLogo from "../assets/githublogo.png";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-[#632ee3] underline underline-offset-4" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/apps"
                className={({ isActive }) =>
                  isActive ? "text-[#632ee3] underline underline-offset-4" : ""
                }
              >
                Apps
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/installedapps"
                className={({ isActive }) =>
                  isActive ? "text-[#632ee3] underline underline-offset-4" : ""
                }
              >
                Installation
              </NavLink>
            </li>
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-xl bg-gradient-to-r from-[#632ee3] to-[#9f62f2] bg-clip-text text-transparent font-bold"
        >
          <img src={logoImg} className="w-[40px]" alt="" />
          HERO.IO
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#632ee3] underline underline-offset-4" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/apps"
              className={({ isActive }) =>
                isActive ? "text-[#632ee3] underline underline-offset-4" : ""
              }
            >
              Apps
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/installedapps"
              className={({ isActive }) =>
                isActive ? "text-[#632ee3] underline underline-offset-4" : ""
              }
            >
              Installation
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link
          to="https://github.com/jasujon570"
          className="btn bg-gradient-to-r from-[#632ee3] to-[#9f62f2] font-semibold text-white"
        >
          <img src={GithubLogo} alt="" />
          Contribute
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
