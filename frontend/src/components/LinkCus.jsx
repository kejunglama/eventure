import { Link } from "react-router-dom";

const LinkCus = ({ to, state, children, label }) => (
  <Link
    to={to}
    state={state}
    className="btn btn-primary hover:text-blue-700 transition-colors duration-200 flex items-center gap-2"
  >
    {children}
    {label}
  </Link>
);

export default LinkCus;