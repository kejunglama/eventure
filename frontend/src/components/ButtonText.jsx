import { useState } from "react";

const ButtonText = ({
  children,
  label,
  onClick,
  className,
  icon,
  hoverIcon,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${className} px-5 py-2 text-sm rounded cursor-pointer transition duration-300 flex items-center gap-2`}
    >
      {isHovered ? hoverIcon : icon}
      {children}
      {label}
    </button>
  );
};

export default ButtonText;
