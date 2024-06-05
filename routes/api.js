var express = require('express');
var router = express.Router();
const db = require('../db/db');

/* GET home page. */
router.get('/courses', async function(req, res, next) {
  const courseList = await db.getCourses({page: req.query?.offset ?? 0, limit: req.query?.limit ?? 10});
  res.send(courseList ?? []);
});

router.get('/courses/:id', async function(req, res, next) {
  const course = await db.getCourse(req?.params?.id);
  if(!course) {
    res.status(404);
    res.send('course not found');
    return;
  }
  res.send(course);
});

module.exports = router;
