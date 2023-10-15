const { DataTypes } = require("sequelize");
const DBConn = require("../../db");
const { SysMasterUserModel } = require("./sys-mst-user");
const { SysRefParameterModel } = require("./sys-ref-parameter");
const { LrnFloorBuildingModel } = require("./lrn-floor-building");
const { SysRefMajorModel } = require("./sys-ref-major");

const LrnLessonTimetableModelDefine = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  start_class_time: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: "07:30:00",
  },
  end_class_time: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: "08:30:00",
  },
  status_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  school_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2024,
  },
  teacher_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysMasterUserModel,
      key: "id",
    },
  },
  lesson_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  level_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  day_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefParameterModel,
      key: "id",
    },
  },
  location_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: LrnFloorBuildingModel,
      key: "id",
    },
  },
  major_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: SysRefMajorModel,
      key: "id",
    },
  },
};

const LrnLessonTimetableModel = DBConn.define(
  "lrn_lesson_timetables",
  LrnLessonTimetableModelDefine,
  {
    timestamps: true,
    schema: "learning",
    force: false,
    createdAt: true,
    updatedAt: true,
    paranoid: true,
    underscored: true,
  },
);

// Definisikan relasi
LrnLessonTimetableModel.belongsTo(SysMasterUserModel, {
  foreignKey: "teacher_id",
});
SysMasterUserModel.hasMany(LrnLessonTimetableModel, {
  foreignKey: "teacher_id",
});

LrnLessonTimetableModel.belongsTo(SysRefParameterModel, {
  foreignKey: "lesson_id",
  as: "lesson",
});
LrnLessonTimetableModel.belongsTo(SysRefParameterModel, {
  foreignKey: "level_id",
  as: "level",
});
LrnLessonTimetableModel.belongsTo(SysRefParameterModel, {
  foreignKey: "day_id",
  as: "day",
});

LrnLessonTimetableModel.belongsTo(LrnFloorBuildingModel, {
  foreignKey: "location_id",
});
LrnFloorBuildingModel.hasMany(LrnLessonTimetableModel, {
  foreignKey: "location_id",
});

LrnLessonTimetableModel.belongsTo(SysRefMajorModel, {
  foreignKey: "major_id",
});
SysRefMajorModel.hasMany(LrnLessonTimetableModel, {
  foreignKey: "major_id",
});

delete LrnLessonTimetableModelDefine.id;
Object.keys(LrnLessonTimetableModelDefine).map((item) => {
  LrnLessonTimetableModelDefine[item] = LrnLessonTimetableModelDefine[item][
    "defaultValue"
  ]
    ? LrnLessonTimetableModelDefine[item]["defaultValue"]
    : null;
});

module.exports = { LrnLessonTimetableModelDefine, LrnLessonTimetableModel };
