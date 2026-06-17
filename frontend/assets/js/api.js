async function apiRequest(
  endpoint,
  method = "GET",
  body = null
) {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    options.headers.Authorization =
      `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    options
  );

  return await response.json();
}