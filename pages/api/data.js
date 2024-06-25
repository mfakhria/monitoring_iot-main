// pages/api/users.js
const Data = require("../../models/data");
const { Sequelize } = require("sequelize");

const now = new Date();


function getFormattedDateTime() {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() returns month from 0-11
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function time1() {
  const minute = now.getMinutes()
  const hour = now.getHours()

  return `${hour}:${minute}`;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (Object.keys(req.query).length === 0) {
      try {
        const date1 = getFormattedDateTime();
        const data = await Data.findAll({
          where:{
            date : date1,
          },
        });
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch value sensors" });
      }
    } else {
      const { phValue, ppmValue, suhuValue } = req.query;
      try {
        await Data.create({
          phValue: parseFloat(phValue),
          ppmValue: parseFloat(ppmValue),
          suhuValue: parseFloat(suhuValue),
          time:time1()
        });

        res.status(201).json({ status: "success" });
      } catch (error) {
        res.status(500).json({ error: "Failed to save value sensors" });
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
