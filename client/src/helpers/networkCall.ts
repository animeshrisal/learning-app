function authHeader(contentType: string): HeadersInit {
  const user = localStorage.getItem("user");

  if (user) {
    return {
      Authorization: JSON.parse(user).token,
      'Content-Type': contentType
    };
  } else {
    return {};
  }
}
export function authenticatedRequestGenerator(
  values: any = {},
  method = "POST"
) {
  let requestOption = {};
  if ("image" in values) {
    const formData: FormData = new FormData();

    if (Object.keys(values).length !== 0) {
      for (var key in values) {
        formData.append(key, values[key]);
      }
    }
    requestOption = {
      method,
      headers: authHeader("multipart/form-data"),
    };

    return { ...requestOption, body: formData };
  } else {
    requestOption = {
      method,
      headers: authHeader("application/json"),
    };

    return { ...requestOption, body: JSON.stringify(values) };
  }
}

export function authenticatedGetRequestOption(): RequestInit {
  return {
    method: "GET",
    headers: authHeader("application/json"),
  };
}
