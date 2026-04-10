// post , /users

// client -> request-> -> [middleware] ->route handler -> controller ->service -> response

// logger middleware
// next() -> method t

const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.url} .at  ${new Date().toLocaleTimeString()}`,
  );
  next();
};

module.exports = logger;
