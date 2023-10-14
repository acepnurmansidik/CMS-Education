const AccessRoleModulSchema = {
  BodyAccessRoleModulSchema: {
    id: "string",
    role_name: "string",
    role_access: [
      {
        role_id: "string",
        modul_id: "string",
      },
    ],
  },
};

module.exports = AccessRoleModulSchema;
