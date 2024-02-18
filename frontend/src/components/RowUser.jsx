import ButtonText from "./ButtonText";
import RowDetail from "./RowDetail";

import {
  FaEdit,
  FaTrash,
  FaLock,
  FaUnlock,
  FaFile,
  FaTrashAlt,
} from "react-icons/fa";

const RowUser = ({ index, user, onEdit, onDelete, onChangePassword }) => (
  <div className="flex justify-between items-center border-b p-8">
    {console.log(index)}
    <div>
      <RowDetail label={`User ${index + 1}`} value={user.username} />
      <RowDetail label="Name" value={`${user.firstName} ${user.lastName}`} />
      <RowDetail label="Email" value={user.email} />
      <RowDetail
        label="Joined"
        value={new Date(user.createdTimestamp).toISOString().split("T")[0]}
      />
      <div>
        <ButtonText
          label="Change Password"
          onClick={() => onChangePassword(user)}
          className="text-blue-700 hover:text-blue-800"
          hoverIcon={<FaUnlock />}
          icon={<FaLock />}
        />
      </div>
    </div>
    <div>
      <ButtonText
        label="Update"
        onClick={() => onEdit(user)}
        className="text-blue-700 hover:text-blue-500"
        hoverIcon={<FaFile />}
        icon={<FaEdit />}
      />
      <ButtonText
        label="Delete"
        onClick={() => onDelete(user)}
        className="text-red-500 hover:text-red-600"
        hoverIcon={<FaTrashAlt />}
        icon={<FaTrash />}
      />
    </div>
  </div>
);

export default RowUser;
