const ButtonSecondary = ({ onClick, label, Icon }) => (
  <button
    className="px-5 py-2 border-2 border-gray-500 text-gray-500 rounded cursor-pointer hover:bg-gray-500 hover:text-white transition-colors duration-200"
    onClick={onClick}
  >
    {Icon && <Icon className="mr-2" />}
    {label}
  </button>
);

export default ButtonSecondary;
