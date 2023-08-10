const axios = require("axios");
const User = require("../models/userModel");

exports.getCreaToken = async (req, res, next) => {
  const userData = {
    grant_type: "client_credentials",
    client_id: "CXLHfDVrziCfvwgCuL8nUahC",
    client_secret: "mFqMsCSPdnb5WO1gpEEtDCHH",
    scope: "DDFApi_Read",
  };
  axios
    .post("http://identity.crea.ca/connect/token", userData)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      active: false,
    });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
