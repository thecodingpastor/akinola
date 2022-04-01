const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        APP_URL: "http://localhost:4000/api/v1",
        TOKEN_EXPIRES: "2592000000",
        EMAIL_SERVICE_ID: "service_uqd1x8q",
        EMAIL_TEMPLATE_ID: "template_0rxzfgg",
        EMAIL_USER_ID: "s1kHASytRypomu8RH",
        ADMIN_EMAIL: [
          "iammichaelakinola@gmail.com",
          "thecodingpastor@gmail.com",
        ],
      },
      images: {
        domains: ["res.cloudinary.com"],
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
    };
  }

  return {
    env: {
      APP_URL: "https://stormy-wildwood-15445.herokuapp.com/api/v1",
      TOKEN_EXPIRES: "2592000000",
      EMAIL_SERVICE_ID: "service_uqd1x8q",
      EMAIL_TEMPLATE_ID: "template_0rxzfgg",
      EMAIL_USER_ID: "s1kHASytRypomu8RH",
      ADMIN_EMAIL: ["iammichaelakinola@gmail.com", "thecodingpastor@gmail.com"],
    },
    images: {
      domains: ["res.cloudinary.com"],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
};
