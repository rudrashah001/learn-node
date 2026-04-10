const auth = (req, res, next) => {
  const token = req.headers["api-key"];

  if (!token || token != process.env.API_KEY) {
    return res.status(401).json({
      success: false,
      message: "aunathorized!api key is missing or invalid",
    });
  }
  next();
};

module.exports = auth;
