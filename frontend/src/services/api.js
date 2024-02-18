import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Refreshing Access Token
const refreshAccessToken = async (refreshToken) => {
  const {
    data: { access_token },
  } = await axios.post(
    import.meta.env.VITE_TOKEN_URL,
    {
      refresh_token: refreshToken,
      grant_type: "refresh_token",
      client_id: "web-app",
    },
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 3500,
    }
  );
  localStorage.setItem("access_token", access_token);
  return access_token;
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      try {
        const newAccessToken = await refreshAccessToken(refreshToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Error Refreshing Token", err);
        window.location.href = "/logout";
      }
    }
    return Promise.reject(error);
  }
);

// Tokens
export const fetchTokens = async (data) => {
  try {
    const response = await axios.post(import.meta.env.VITE_TOKEN_URL, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 3500,
    });
    const { access_token: accessToken, refresh_token: refreshToken } =
      response.data;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    return accessToken;
  } catch (error) {
    console.error("Error Fetching Tokens:", error);
    throw error;
  }
};

// Users
export const createUser = async (userDetails, accessToken) => {
  try {
    const response = await api.post(
      "/users",
      {
        username: userDetails.preferred_username,
        name: userDetails.name,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Creating User:", error);
    throw error;
  }
};

export const fetchUserByUsername = async (username, token) => {
  try {
    const response = await api.get(`/users/username/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error Fetching User by Username ${username}:`, error);
    throw error;
  }
};

export const fetchUser = async (userId, token) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error Fetching User with ID ${userId}:`, error);
    throw error;
  }
};

export const fetchParticipantsNames = async (participantIds, token) => {
  try {
    const responses = await Promise.all(
      participantIds.map((participantId) =>
        api.get(`/users/${participantId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    );
    return responses.map(({ data: { name } }) => name);
  } catch (error) {
    console.error("Error Fetching Participants Names:", error);
    throw error;
  }
};

export const fetchUsers = async (token) => {
  try {
    const response = await api.get(`/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error Fetching Users:", error);
    throw error;
  }
};

// From Keycloak
export const getUserDetails = async (accessToken) => {
  try {
    const response = await axios.get(import.meta.env.VITE_USER_INFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error Fetching User Details:", error);
    throw error;
  }
};

export const fetchUsersFromKeycloak = async (token) => {
  try {
    const response = await axios.get(import.meta.env.VITE_USERS_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error Fetching Users:", error);
    throw error;
  }
};

export const updateUser = async (userData, token) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_USERS_URL}/${userData.id}`,
      userData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Updating User:", error);
    throw error;
  }
};

export const deleteUser = async (userId, token) => {
  try {
    await axios.delete(`${import.meta.env.VITE_USERS_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(`Error Deleting User ID ${userId}:`, error);
    throw error;
  }
};

export const changePassword = async (userId, password, token) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_USERS_URL}/${userId}/reset-password`,
      { value: password, type: "password", temporary: false },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Changing Password:", error);
    throw error;
  }
};

// Events
export const createEvent = async (eventData, token) => {
  try {
    const response = await api.post(`/events`, eventData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error Creating Event:", error);
    throw error;
  }
};

export const fetchEvents = async (token) => {
  try {
    const response = await api.get(`/events`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error Fetching Events:", error);
    throw error;
  }
};

export const fetchUserEvents = async (userId, token) => {
  try {
    const response = await api.get(`/events/responsible/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error Fetching Events for User ID ${userId}:`, error);
    throw error;
  }
};

export const updateEvent = async (eventData, token) => {
  try {
    const response = await api.put(`/events/${eventData._id}`, eventData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error Updating Event:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId, token) => {
  try {
    await api.delete(`/events/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(`Error Deleting Event ID ${eventId}:`, error);
    throw error;
  }
};

// Tasks
export const createTask = async (taskData, token) => {
  try {
    console.log("Task Data:", taskData);
    const eventPath = typeof taskData.event === 'string' ? taskData.event : taskData.event._id;
    const response = await api.post(
      `/events/${eventPath}/tasks`,
      taskData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Creating Task:", error);
    throw error;
  }
};

export const fetchTasks = async (token) => {
  try {
    const response = await api.get(`/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error Fetching Tasks:", error);
    throw error;
  }
};

export const fetchTask = async (taskId, token) => {
  try {
    const response = await api.get(`/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error Fetching Tasks:", error);
    throw error;
  }
};

export const fetchUserTasks = async (userId, token) => {
  try {
    const response = await api.get(`/tasks/assigned/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error Fetching Tasks for User ID ${userId}:`, error);
    throw error;
  }
};

export const updateTask = async (taskData, token) => {
  try {
    console.log("Task Data:", taskData);

    // If the event of the task has changed
    if (taskData.prevEvent !== taskData.event) {
      // Create a new task in the new event
      const newTaskResponse = await createTask(taskData, token);
      // Delete the task from the previous event
      await deleteTask(taskData.prevEvent, taskData._id, token);
      return newTaskResponse.data;
    }

    // If the event of the task has not changed
    const response = await api.put(
      `/events/${taskData.event}/tasks/${taskData._id}`,
      taskData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error Updating Task:", error);
    throw error;
  }
};

export const deleteTask = async (eventId, taskId, token) => {
  try {
    await api.delete(`/events/${eventId}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(`Error Deleting Task ID ${taskId}:`, error);
    throw error;
  }
};

// Notifications
export const createNotification = async (notificationData, token) => {
  try {
    const response = await api.post(`/notifications`, notificationData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error Posting Notification:", error);
    throw error;
  }
};

export const fetchNotifications = async (userId, token) => {
  try {
    const response = await api.get(`/users/${userId}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error Fetching Notifications for User ID ${userId}:`, error);
    throw error;
  }
};

export const updateNotificationStatus = async (userId, id, status, token) => {
  try {
    console.log("Status:", status);
    const response = await api.put(
      `users/${userId}/notifications/${id}`,
      status,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error Updating Notification:", error);
    throw error;
  }
};

export default api;
