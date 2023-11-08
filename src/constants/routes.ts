export const Routes = {
  home: "/",
  login: "/login",
  register: "/register",
  create: "/create",
  edit: (id: string) => `/todo/${id}`,
  settings: "/settings",
};
