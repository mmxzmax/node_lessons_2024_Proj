var express = require('express');
var router = express.Router();
const db = require('../db/db');
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = require('../midleware/verifyToken');
const checkAdmin = require('../midleware/isAdmin');


router.post('/register', async (req, res) => {
    try {
        const {login, password, email, isAdmin} = req.body;
        const salt = crypto.randomBytes(10);
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha256');
        await db.createUser(login, hashedPassword, email, salt, isAdmin);
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({error: 'Registration failed'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {login, password} = req.body;
        const user = await db.getUserByLogin(login);
        if (!user) {
            return res.status(401).json({error: 'Authentication failed'});
        }
        const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha256');
        if (!crypto.timingSafeEqual(user.pass, hashedPassword)) {
            return res.status(401).json({error: 'Authentication failed'});
        }
        const token = jwt.sign({userId: user._id}, config.secretKey, {
            expiresIn: '1h',
        });
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({error: 'Login failed'});
    }
});

/* GET home page. */
router.get('/courses', async function (req, res, next) {
    const courseList = await db.getCourses({page: req.query?.offset ?? 0, limit: req.query?.limit ?? 10});
    res.json(courseList ?? []);
});

router.post('/courses', verifyToken, checkAdmin, async function (req, res, next) {
    const course = await db.createCourse(req.body);
    res.status(201).json({id: course?._id});
});

router.get('/courses/:id', verifyToken, async function (req, res, next) {
    const course = await db.getCourse(req?.params?.id);
    if (!course) {
        res.status(404);
        res.send('course not found');
        return;
    }
    res.json(course);
});

router.put('/courses/:id', verifyToken, checkAdmin , async function (req, res, next) {
    try {
        await db.editCourse(req?.params?.id, {...req.body});
    } catch (error) {
        res.status(500);
        res.send('can not update course');
    }
    res.json({ok: true});
});

router.delete('/courses/:id', verifyToken, checkAdmin, async function (req, res, next) {
    try {
        await db.deleteCourse(req?.params?.id);
    } catch (error) {
        res.status(500);
        res.send('can not update course');
    }
    res.json({ok: true});
});

router.get('/profile', verifyToken, async function (req, res, next) {
    const user = await db.getUserById(req?.userId);
    if (!user) {
        res.status(404);
        res.send('user not found');
        return;
    }
    res.json(user);
});

router.put('/profile', verifyToken, async function (req, res, next) {
    const userData = req.body;
    try {
        db.editUser(req?.userId, userData);
    } catch (error) {
        res.status(500);
        res.send('can not update user');
    }
    res.json({ok: true});
});

router.get('/profile', verifyToken, async function (req, res, next) {
    const user = await db.getUserById(req?.userId);
    if (!user) {
        res.status(404);
        res.send('user not found');
        return;
    }
    res.json(user);
});


router.get('/users/:id', verifyToken, checkAdmin, async function (req, res, next) {
    const user = await db.getUserById(req?.params?.id);
    if (!user) {
        res.status(404);
        res.send('user not found');
        return;
    }
    res.json(user);
});

router.put('/users/:id', verifyToken, checkAdmin, async function (req, res, next) {
    const userData = req.body;
    try {
        await db.editUser(req?.params?.id, userData);
    } catch (error) {
        res.status(500);
        res.send('can not update user');
    }
    res.json({ok: true});
});

router.delete('/users/:id', verifyToken, checkAdmin, async function (req, res, next) {
    if (req?.userId === req?.params?.id) {
        res.status(409);
        res.send('can not delete user');
        return;
    }
    const user = await db.getUserById(req?.userId);
    await db.deleteUser(req?.params?.id);
    res.json({ok: true});
});


router.get('/materials', verifyToken, async function (req, res, next) {
    const materials = await db.getMaterials(req?.query?.materials);
    res.json(materials);
});

router.post('/materials', verifyToken, checkAdmin, async function (req, res, next) {
    const material = await db.createMaterial(req.body);
    res.status(201).json({id: material?._id});
});

router.get('/materials/:id', verifyToken, async function (req, res, next) {
    const material = await db.getMaterial(req?.params?.id);
    if (!material) {
        res.status(404);
        res.send('course not found');
        return;
    }
    res.json(material);
});

router.put('/materials/:id', verifyToken, checkAdmin , async function (req, res, next) {
    try {
        await db.editMaterial(req?.params?.id, {...req.body});
    } catch (error) {
        res.status(500);
        res.send('can not update course');
    }
    res.json({ok: true});
});

router.delete('/materials/:id', verifyToken, checkAdmin , async function (req, res, next) {
    try {
        await db.deleteMaterial(req?.params?.id);
    } catch (error) {
        res.status(500);
        res.send('can not delete');
    }
    res.json({ok: true});
});

router.delete('/courses/:id', verifyToken, checkAdmin, async function (req, res, next) {
    try {
        await db.deleteMaterial(req?.params?.id);
    } catch (error) {
        res.status(500);
        res.send('can not update course');
    }
    res.json({ok: true});
});

router.get('/comments', verifyToken, async function (req, res, next) {
    const materials = await db.getComments(req?.query?.comments);
    res.json(materials);
});

router.post('/comments', verifyToken, async function (req, res, next) {
    const comment = await db.createComment(req?.body);
    res.json({id: comment._id});
});

module.exports = router;
