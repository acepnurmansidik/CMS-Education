const { DateTime } = require("luxon");
const { SysRefMajorModel } = require("../../models/sys-ref-major");
const { SysMasterUserModel } = require("../../models/sys-mst-user");
const { Op, literal, fn, col, Sequelize, QueryTypes } = require("sequelize");
const DBConn = require("../../../db");

const service = {};

service.GenerateUniqueNUmber = async ({ role_status, role }) => {
  if (!role) role = "Guest";
  let unique_number = "";
  // get data role from database
  const refPosition = await SysRefMajorModel.findOne({
    where: { role_status, role },
  });
  // combine with date of entry
  const date = `${DateTime.now().toFormat("MM")}${DateTime.now().toFormat(
    "y",
  )}`;
  const seqZero = ["0000", "000", "00", "0", ""];
  unique_number += refPosition.code + date;
  // create sequence
  let Sequence = "1";
  // search sequence last user by unique number on database
  let lastSeq = await DBConn.query(
    `SELECT "unique_number"::TEXT FROM "setting"."sys_mst_users" AS "sys_mst_user" WHERE ("sys_mst_user"."deleted_at" IS NULL and unique_number::TEXT ilike '%${unique_number}%') order by unique_number desc LIMIT 1`,
  );
  lastSeq = lastSeq[0][0]?.unique_number;
  if (lastSeq) Sequence = String(Number(lastSeq.slice(9, lastSeq.length)) + 1);
  unique_number = unique_number + seqZero[Sequence.length - 1] + Sequence;

  return parseInt(unique_number);
};

module.exports = service;
