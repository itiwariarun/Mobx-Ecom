import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className="
        w-full
        py-4
        text-center
        bg-gray-800
        text-gray-50
        border-t
        border-gray-300
        fixed
        bottom-0
        left-0
        font-medium
        shadow
        z-40
      "
    >
      <span className="block">
        E-commerce App{" "}
        <span className="font-semibold text-indigo-50">© 2025</span>
      </span>
    </footer>
  );
};

export default Footer;
