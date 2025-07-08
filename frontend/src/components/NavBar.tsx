function NavBar() {
  return (
    <div className="flex items-center p-4">
      <a href="/">
        <div className="text-orange-400 p-5 text-4xl font-black">Moovy</div>
      </a>
      <div className="max-container w-full flex px-20">
        <nav className="flex w-full gap-x-16">
          <a href="/movies" className="text-stone-900 text-l font-black hover:text-gray-400">Search</a>
          <a href="/about" className="text-orange-400 text-l font-black hover:text-gray-400">My Library</a>
        </nav>
      </div>
    </div>
  )
}

export default NavBar