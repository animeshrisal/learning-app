export function handleResponse(response: any) {
  return response.text().then((text: string) => {
    const data = keysToCamel(text && JSON.parse(text));

    if (!response.ok) {
      if (response.status === 401 && data.code === "token_not_valid") {
        localStorage.removeItem("user");
      }
      const errors = data;
      return Promise.reject(errors);
    }
    return data;
  });
}

const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const isArray = function (a: any) {
  return Array.isArray(a);
};

const isObject = function (o: any) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

const keysToCamel = function (o: any) {
  if (isObject(o)) {
    const n: any = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return keysToCamel(i);
    });
  }

  return o;
};
