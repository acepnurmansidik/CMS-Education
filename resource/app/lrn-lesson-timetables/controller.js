const {
  LrnLessonTimetableModel,
} = require("../../models/lrn-lesson-timetables");
const { methodConstant } = require("../../utils/constanta");
const { NotFoundError } = require("../../utils/errors");
const response = require("../../utils/response");
const service = require("./service");

const controller = {};

controller.Index = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['LRN LESSON TIMETABLE']
    #swagger.summary = 'Lesson Timetable Student'
    #swagger.description = 'management lesson timetable for student'
    #swagger.parameters['level_id'] = { description: 'filter by level_id' }
    #swagger.parameters['major_id'] = { description: 'filter by major_id' }
    #swagger.parameters['limit'] = { default: 10, description: 'Limit data show' }
    #swagger.parameters['page'] = { default: 1, description: 'Page data show' }
  */
  try {
    // get filter at req.query
    const { limit, page, ...query } = req.query;
    // find data from database with filter condition
    const result = await LrnLessonTimetableModel.findAll({
      where: { ...query },
      offset: page - 1,
      limit,
    });
    // send success response
    response.GetPaginationResponse(res, result, page, limit);
  } catch (err) {
    next(err);
  }
};

controller.StudentSchedule = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['LRN LESSON TIMETABLE']
    #swagger.summary = 'Lesson Timetable Student'
    #swagger.description = 'management lesson timetable for student'
  */
  try {
    // filter by role login
    let where = { status_active: true };
    let isTeacher = req.login.role_access.findIndex(
      (item) => item.role_name.toLowerCase() === "teacher",
    );
    isTeacher
      ? (where = { ...where, teacher_id: req.login.profile.mst_user_id })
      : (where = {
          ...where,
          level_id: req.login.profile.level_id,
          major_id: req.login.profile.major_id,
        });

    // fetxh data from database with filter condition
    const [result, detailData] = await Promise.all([
      service.getScheduleWithGrouping({ where }),
      service.getDetailDataSchedule({ where }),
    ]);

    for (const dataHeader of result) {
      let headerDetail = [];
      for (const dataDetail of detailData) {
        if (
          dataHeader.dataValues.day_id === dataDetail.dataValues.day_id &&
          dataHeader.dataValues.level_id === dataDetail.dataValues.level_id &&
          dataHeader.dataValues.major_id === dataDetail.dataValues.major_id
        ) {
          let _temp = {
            id: dataDetail.dataValues.id,
            start_class_time: dataDetail.dataValues.start_class_time,
            end_class_time: dataDetail.dataValues.end_class_time,
            school_year: dataDetail.dataValues.school_year,
            lesson: dataDetail.dataValues.lesson.dataValues.value,
            ...dataDetail.dataValues.lrn_floor_building.dataValues,
            ...dataDetail.dataValues.lrn_floor_building.dataValues
              .lrn_school_building.dataValues,
          };
          delete _temp.lrn_school_building;
          delete _temp.school_building_id;

          headerDetail.push(_temp);
        }
      }

      dataHeader.dataValues.details = headerDetail;
      dataHeader.dataValues.day_name =
        dataHeader.dataValues.day.dataValues.value;
      dataHeader.dataValues.grade =
        dataHeader.dataValues.level.dataValues.value;
      dataHeader.dataValues.major =
        dataHeader.dataValues.sys_ref_major.dataValues.role;

      // delete key data
      const dltKeys = ["major_id", "level_id", "level", "day", "sys_ref_major"];
      for (const everyKey of dltKeys) {
        delete dataHeader.dataValues[everyKey];
      }
    }

    // send success response
    response.MethodResponse(res, methodConstant.GET, result);
  } catch (err) {
    next(err);
  }
};

controller.Create = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['LRN LESSON TIMETABLE']
    #swagger.summary = 'Lesson Timetable Student'
    #swagger.description = 'management lesson timetable for student'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new room number',
      schema: { $ref: '#/definitions/BodyLessonTimetableSchema' }
    }
  */
  try {
    // get data payload from req body
    const payload = req.body;

    // save to database
    const result = await LrnLessonTimetableModel.create(payload);

    // send success response
    response.MethodResponse(res, methodConstant.POST, result);
  } catch (err) {
    next(err);
  }
};

controller.FindOne = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['LRN LESSON TIMETABLE']
    #swagger.summary = 'Lesson Timetable Student'
    #swagger.description = 'management lesson timetable for student'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get id from params
    const id = req.params.id;
    // find data by id on database
    const result = await LrnLessonTimetableModel.findOne({
      where: { id },
      attributes: ["id", "room_name"],
    });
    // when data not exist send not found response
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);
    // send success responses
    response.MethodResponse(res, methodConstant.GET, result);
  } catch (err) {
    next(err);
  }
};

controller.Update = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['LRN LESSON TIMETABLE']
    #swagger.summary = 'Lesson Timetable Student'
    #swagger.description = 'management lesson timetable for student'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new room number',
      schema: { $ref: '#/definitions/BodyLessonTimetableSchema' }
    }
  */
  try {
    // get id from params and payload from body
    const id = req.params.id;
    const payload = req.body;
    // find data by id on database
    const result = await LrnLessonTimetableModel.findOne({ where: { id } });
    // when data not exist send not found response
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);
    // update data to database
    await LrnLessonTimetableModel.update(payload, { where: { id } });
    // send success resposne
    response.MethodResponse(res, methodConstant.PUT, null);
  } catch (err) {
    next(err);
  }
};

controller.Delete = async (req, res, next) => {
  /*
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  /* 
    #swagger.tags = ['LRN LESSON TIMETABLE']
    #swagger.summary = 'Lesson Timetable Student'
    #swagger.description = 'management lesson timetable for student'
    #swagger.parameters['id'] = { description: 'get data by id using uuid' }
  */
  try {
    // get id from params and payload from body
    const id = req.params.id;
    const payload = req.body;
    // find data by id on database
    const result = await LrnLessonTimetableModel.findOne({ where: { id } });
    // when data not exist send not found response
    if (!result) throw new NotFoundError(`Data with id ${id} not found!`);
    // update data to database
    await LrnLessonTimetableModel.destroy({ where: { id } });
    // send success resposne
    response.MethodResponse(res, methodConstant.DELETE, null);
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
