import { useLocation, useNavigate } from "react-router-dom";
import RowDetail from "../components/RowDetail";
import { useEffect, useState } from "react";
import LinkCus from "../components/LinkCus";
import Loading from "../components/Loading";
import api, { fetchParticipantsNames, fetchUser } from "../services/api";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useSnackbar } from "notistack";

const Event = () => {
  const {
    state: { event },
  } = useLocation();
  const [responsibleName, setResponsibleName] = useState("");
  const [participantNames, setParticipantNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const fetchResponsibleName = fetchUser(event.responsible, token)
      .then((user) => {
        setResponsibleName(user.name);
      })
      .catch((error) => {
        console.error(error);
      });

    const fetchParticipants =
      event.participants && event.participants.length > 0
        ? fetchParticipantsNames(event.participants, token)
            .then((names) => {
              setParticipantNames(names);
            })
            .catch((error) => {
              console.error(error);
            })
        : Promise.resolve().then(() => {
            setParticipantNames(["No participants yet."]);
          });

    Promise.all([fetchResponsibleName, fetchParticipants]).then(() => {
      setLoading(false);
    });
  }, [event]);

  const deleteEvent = () => {
    const token = localStorage.getItem("access_token");
    api
      .delete(`/events/${event._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        enqueueSnackbar("Event deleted successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl mb-4">Event Details</h1>
        <div className="flex gap-4">
          <LinkCus to="/event" state={{ event: event }}>
            Edit
            <FiEdit />
          </LinkCus>
          <button
            onClick={deleteEvent}
            className="hover:text-red-700 flex items-center gap-1"
          >
            Delete
            <FiTrash2 />
          </button>
        </div>
      </div>
      <div className="bg-white p-8">
        <table className="table-auto w-full">
          <tbody>
            <RowDetail label="Event Name" value={event.title} />
            <RowDetail
              label="Event Date"
              value={new Date(event.date).toISOString().split("T")[0]}
            />
            <RowDetail label="Location" value={event.location} />
            <RowDetail label="Description" value={event.desc} />
            <RowDetail label="Event Responsible" value={responsibleName} />
            <RowDetail
              label="Participants"
              value={participantNames.join(", ")}
            />
            <RowDetail
              label="Tasks"
              value={
                event.tasks && event.tasks.map((task) => task.title).join(", ")
              }
              link={{ to: "/tasks" }}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Event;
