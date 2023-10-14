const UserRolesModulSchema = {
  BodyUserRolesModulSchema: {
    user_id: "string",
    role_access: [
      {
        role_id: "string",
        user_id: "string",
      },
    ],
  },
};

module.exports = UserRolesModulSchema;
