import { formatDistanceToNow } from "date-fns";

const Notification = ({
  notification: { title, createdAt, type },
  handleOnClick,
}) => {
  return (
    <div className={`p-4 text-sm`}>
      <div
        className="flex justify-between items-center"
        onClick={handleOnClick}
      >
        <div>
          <div className="text-base">{title}</div>
          <div className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div
          className={`px-2 py-2 rounded text-xs uppercase font-semibold ${
            type === "event"
              ? "bg-blue-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {type}
        </div>
      </div>
    </div>
  );
};

export default Notification;
