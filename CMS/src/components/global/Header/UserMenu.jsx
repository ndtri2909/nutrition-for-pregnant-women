import React from "react";
import { useRecoilValue } from "recoil";
import { useAuth } from "../../../hooks/auth";
import { authState } from "../../../recoil/atom/authState";
import { Link, useParams } from "react-router-dom";

const UserMenu = () => {
  const { page } = useParams();

  const { logout, logoutDirect } = useAuth();
  const handleLogout = async (e) => {
    e.preventDefault();
    if (process.env?.REACT_APP_SSO_SERVICE) {
      await logout();
    } else {
      await logoutDirect();
    }
  };
  const { profile } = useRecoilValue(authState);

  return (
    <>
      <li className="nav-item dropdown">
        <Link
          to={`/profile/${profile?.id}`}
          className="nav-link dropdown-toggle"
          id="profileDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {profile?.FULLNAME}
        </Link>
        <div className="dropdown-menu p-0" aria-labelledby="profileDropdown">
          <ul className="list-unstyled p-1">
            <li className="dropdown-item py-2">
              <a
                onClick={handleLogout}
                style={{ display: "flex" }}
                className="text-body ms-0"
              >
                <i className="me-2 icon-md" data-feather="log-out" />
                <span>Log Out</span>
              </a>
            </li>
          </ul>
        </div>
      </li>
    </>
  );
};

export default UserMenu;
