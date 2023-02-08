import Cookies from "js-cookie";

const setCookie = (cookiename, usrin) => {
  Cookies.set(cookiename, usrin, {
    expires: 7, //day
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export default setCookie;
