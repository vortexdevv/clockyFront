import { useState } from "react";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      {/* Trigger Button */}
      <button
        className="px-4 bg-transparent focus:outline-none lg:hover:bg-transparent w-full"
        onClick={() => setIsOpen(!isOpen)} // For smaller screens, allow click
      >
        CATEGORIES
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute left-0 mt-2 w-full bg-main border border-gray-200 shadow-lg rounded-lg opacity-0 lg:group-hover:opacity-100 lg:group-hover:visible transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "invisible"
        } lg:invisible lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:visible`}
      >
        <ul className="py-2 text-white text-center">
          <li className="px-4 py-2 hover:bg-two cursor-pointer">Men</li>
          <li className="px-4 py-2 hover:bg-two cursor-pointer">Women</li>
          <li className="px-4 py-2 hover:bg-two cursor-pointer">Unisex</li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
