import expressSession from "express-session";

const session = () =>
  expressSession({
    secret: "927fcab6-2f7a-4d4f-91ef-d390d295c256",
    resave: false,
    saveUninitialized: true,
    cookie: { 
      httpOnly: true,
      secure: false,
    },
});

export default session;
