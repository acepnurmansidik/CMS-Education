const UserSchema = require("./user-auth");
const RefParameterSchema = require("./sys-ref-parameter");
const MasterRoleSchema = require("./sys-mst-role");
const MasterModulSchema = require("./sys-mst-modul");
const MenuSchema = require("./sys-menu");
const AccessRoleModulSchema = require("./sys-access-roles-moduls");
const MasterUserModulSchema = require("./sys-mst-user");
const RefMajorModulSchema = require("./sys-ref-major");
const UserRolesModulSchema = require("./sys-user-roles");
const SchoolBuildingSchema = require("./lrn-school-building");
const FloorBuildingSchema = require("./lrn-floor-building");
const LessonTimetablesSchema = require("./lrn-lesson-timetables");
const ScoreLimitLevelUptablesSchema = require("./lrn-score-limit");
const QuestionExamSchema = require("./lrn-exam");

const GlobalSchema = {
  ...UserSchema,
  ...RefParameterSchema,
  ...MasterRoleSchema,
  ...MasterModulSchema,
  ...MenuSchema,
  ...AccessRoleModulSchema,
  ...MasterUserModulSchema,
  ...RefMajorModulSchema,
  ...UserRolesModulSchema,
  ...SchoolBuildingSchema,
  ...FloorBuildingSchema,
  ...LessonTimetablesSchema,
  ...ScoreLimitLevelUptablesSchema,
  ...QuestionExamSchema,
};

module.exports = GlobalSchema;
