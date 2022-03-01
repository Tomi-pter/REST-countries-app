import { useState } from "react";

function Header() {
  const [dark, setDark] = useState(false);
  const html = window.document.documentElement;

  const toggleDark = () => {
    html.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <div className="bg-light-element dark:bg-dark-element text-light-text dark:text-dark-text  px-4 py-6 text-sm shadow-skin sticky top-[-1px] z-10">
      <header className="2xl:container 2xl:mx-auto flex justify-between items-center">
        <h1 className="font-NSEB">Where in the world?</h1>
        <div className="flex">
          <button onClick={toggleDark} className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <span className="pl-2 font-NSSB">Dark Mode</span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
