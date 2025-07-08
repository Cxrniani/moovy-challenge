import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div className="flex items-center p-4 ">
      <NavLink to="/">
        <div className="text-orange-400 p-5 text-4xl font-black">Moovy</div>
      </NavLink>
      <div className="max-container w-full flex px-24">
        <nav className="flex w-full gap-x-16">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive
                ? "text-orange-400 text-l font-black hover:text-orange-500 ease-in-out duration-100"
                : "text-stone-800 text-l font-black hover:text-orange-500 ease-in-out duration-100"
            }
          >
            Search
          </NavLink>
          <NavLink
            to="/my-library"
            className={({ isActive }) =>
              isActive
                ? "text-orange-400 text-l font-black hover:text-orange-500 ease-in-out duration-100"
                : "text-stone-800 text-l font-black hover:text-orange-500 ease-in-out duration-100"
            }
          >
            My Library
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default NavBar