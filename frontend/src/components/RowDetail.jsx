import LinkCus from "./LinkCus";

const RowDetail = ({ label, value, link: { to, state } = {} }) => (
  <tr className="mb-4">
    <td className="px-4 py-2 font-bold">{label}</td>
    <td className="px-4 py-2">
      {to ? (
        <LinkCus to={to} state={state}>
          {value}
        </LinkCus>
      ) : (
        value
      )}
    </td>
  </tr>
);

export default RowDetail;
