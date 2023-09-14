const axios = require("axios");
const User = require("../models/userModel");

exports.getCreaToken = async (req, res, next) => {
  const userData = {
    grant_type: "client_credentials",
    client_id: "iLqEa7P53jdMcVqRynBogJNy", //"CXLHfDVrziCfvwgCuL8nUahC", // iLqEa7P53jdMcVqRynBogJNy
    client_secret: "pnppPDeHCeBJU0QX1jkFBXxG", //"mFqMsCSPdnb5WO1gpEEtDCHH", // pnppPDeHCeBJU0QX1jkFBXxG
    scope: "DDFApi_Read",
  };
  axios
    .post("https://identity.crea.ca/connect/token", userData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((data) => {
      console.log("data", data.data);
      res.json(data.data);
    })
    .catch((err) => res.json(err));
};
const makeSearchString = (searchObj) => {
  // https://ddfapi.realtor.ca/odata/v1/Property?$select=PropertySubType&$top=100
  // &$filter=PropertySubType in ['Single Family' ,'Industrial']
  console.log("searchObj2", searchObj);
  var searchStr = "$top=5&$filter=";
  searchStr += "City eq '" + searchObj.cityName.city + "'";
  // searchStr +=
  //   " and PropertySubType in ['" + searchObj.property_type.in.toString() + "']";

  searchStr +=
    " and PropertySubType in [" +
    searchObj.property_type.in.map((i) => "'" + i + "'") +
    "]";

  // if (searchObj.bedroom.in.length > 0) {
  //   searchStr +=
  //     " and BathroomsTotalInteger in [" +
  //     searchObj.bedroom.in.map((i) => i) +
  //     "]";
  // }
  if (searchObj.bedroom.in.length > 0) {
    searchStr += " and BathroomsTotalInteger eq " + searchObj.bedroom.in[0];
  }
  if (searchObj.bedroom.gt) {
    searchStr += " and BathroomsTotalInteger gt " + searchObj.bedroom.gt;
  }
  console.log("searchStr raw", JSON.stringify(searchStr));
  // return encodeURIComponent(searchStr);
  return searchStr;
  //   {
  //     "cityName": {
  //         "city": "Cornwall"
  //     },
  //     "property_type": {
  //         "$in": [
  //             "House"
  //         ]
  //     },
  //     "bedroom": {
  //         "$in": [
  //             "3"
  //         ],
  //         "$gt": "3"
  //     },
  //     "price": [
  //         {
  //             "$gte": 5000000,
  //             "$lt": 7500000
  //         },
  //         {
  //             "$gte": 7500000,
  //             "$lt": 10000000
  //         }
  //     ]
  // }
};
exports.getProperties = async (req, res, next) => {
  console.log("req.body", req.body);
  var t = req.body.token;
  var searchObj = req.body.searchObj;
  var serStr = makeSearchString(searchObj);
  console.log("serStr", serStr);
  var c = {
    method: "get",
    url: "https://ddfapi.realtor.ca/odata/v1/Property" + "?" + serStr,
    headers: {
      Authorization: "Bearer " + t,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: "",
  };
  console.log("c", c);
  axios(c)
    .then((data) => {
      console.log("dataRes", data.data);
      res.json(data.data);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getPropertyByKey = async (req, res, next) => {
  console.log("req.body", req.body);
  var t = req.body.token;
  var searchKey = req.body.propKey;

  var c = {
    method: "get",
    url:
      "https://ddfapi.realtor.ca/odata/v1/Property?$filter=ListingKey eq +'" +
      searchKey +
      "'",
    headers: {
      Authorization: "Bearer " + t,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: "",
  };
  console.log("c", c);
  axios(c)
    .then((data) => {
      console.log("dataRes", data.data);
      res.json(data.data);
    })
    .catch((err) => {
      console.log("err", err);
      res.json(err);
    });
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
