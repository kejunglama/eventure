const ButtonPrimary = ({ children, label, onClick }) => (
  <button
    onClick={onClick}
    className="px-5 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded cursor-pointer transition-colors duration-200 flex items-center gap-2"
  >
    {children}
    {label}
  </button>
);

export default ButtonPrimary;
