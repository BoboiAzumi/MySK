import { AiOutlineBars } from "react-icons/ai";
import { ResetToken } from "../utils/token";
import { useContext } from "react"
import { accountContext } from "../context/account"
import { BackendUrl } from "../config/backend-host";

export function Navbar() {
  const account = useContext(accountContext)
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-none	lg:hidden">
				<label htmlFor="sidebar" className="btn btn-square btn-ghost drawer-button">
					<AiOutlineBars />
				</label>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">MySK</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt={`${account.fullName} Profile`}
                src={`${BackendUrl}${account.picture}`}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>{account.fullName}</a>
            </li>
            <li>
              <a onClick={() => {
								ResetToken()
								document.location.href = "/"
							}}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
