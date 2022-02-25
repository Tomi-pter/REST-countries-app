import { useState } from "react";

function Header() {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    const html = window.document.documentElement;

    html.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <div className="bg-light-element dark:bg-dark-element text-light-text dark:text-dark-text flex justify-between items-center px-4 py-6 my-0.5 text-sm shadow-md sticky top-0 z-10">
      <h1 className="font-NSEB">Where in the world?</h1>
      <div className="flex">
        <button onClick={toggleDark}>
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
        </button>
        <p className="pl-2 font-NSSB">Dark Mode</p>
      </div>
    </div>
  );
}

export default Header;
