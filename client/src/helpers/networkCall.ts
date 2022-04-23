function authHeader(): HeadersInit {
  const user = localStorage.getItem("user");

  if (user) {
    console.log(JSON.parse(user).token);
    return { Authorization: JSON.parse(user).token };
  } else {
    return {};
  }
}
export function authenticatedRequestGenerator(
  values: any = {},
  method = "POST"
) {
  const requestOption = {
    method,
    headers: authHeader(),
  };

  return { ...requestOption, body: values };
}

export function authenticatedGetRequestOption(): RequestInit {
  return {
    method: "GET",
    headers: authHeader(),
  };
}
