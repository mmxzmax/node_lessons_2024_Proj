const app = require('../app');
const request = require('supertest');
const {MongoClient} = require('mongodb');


jest.mock('../db/db', () => {
    const originalModule = jest.requireActual('../db/db');
    const crp = jest.requireActual("node:crypto")
    const salt = crp.randomBytes(10)
    const user = {
        login: 'user',
        pass: crp.pbkdf2Sync('password', salt, 10000, 512, 'sha256'),
        salt,
        role: 'admin'
    }
    return {
        __esModule: true,
        ...originalModule,
        getCourses: async ({page, limit}) => Promise.resolve([]),
        createUser: async (login, pass, email, salt, isAdmin) => Promise.resolve({}),
        getUserByLogin: async (login) => Promise.resolve(user),
        getUserById: async (id) => Promise.resolve(user),
        editUser: async (id, data) => Promise.resolve({}),
        deleteUser: (id) => Promise.resolve({}),
        createCourse: async (courseData) => Promise.resolve({}),
        getCourse: async (id) => Promise.resolve({}),
        editCourse: async (id, data) => Promise.resolve({}),
        deleteCourse: (id) =>Promise.resolve({}),
        getMaterial: async (ids) =>Promise.resolve({}),
        getMaterials: async (ids) =>Promise.resolve({}),
        createMaterial: async (materialData) => Promise.resolve({}),
        editMaterial: async () => Promise.resolve({}),
        deleteMaterial: async () => Promise.resolve({}),
        getComments: async (ids) => Promise.resolve({}),
        getComment: async (id) => Promise.resolve({}),
        createComment: async (commentData) => Promise.resolve({}),
    };
});

jest.mock('../db/schemas/course-schema', () => {
    const originalModule = jest.requireActual('../db/schemas/course-schema');
    return {
        __esModule: true,
        ...originalModule,
        findOne: () => Promise.resolve({
            title: 'String',
            description: 'String',
            materials: [],
            comments: []
        }),
        find: () => ({select: () => ({limit: () => ({skip: () => Promise.resolve([])})})})
    };
});

describe('api', () => {
    let connection;
    let db;
    let userToken;
    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db();
    });
    test('should login', async function () {
        const response = await request(app)
            .post('/api/login')
            .send({name: 'username', password: 'password'})
            .set('Accept', 'application/json');
        userToken = response.body;
        expect(response?.status).toEqual(200);
    });

    test('should get courses list', async function () {
        const response = await request(app)
            .get('/api/courses').set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
    });

    test('should get course by Id', async function () {
        const response = await request(app)
            .get('/api/courses/1').set('Accept', 'application/json').set('Authorization', `Bearer ${userToken.token}`);
        expect(response?.status).toEqual(200);
    });

    test('should create course', async function () {
        const response = await request(app)
            .post('/api/courses').send({
                title: 'some title',
                description: 'some description',
                materials: [],
                users: [],
            }).set('Accept', 'application/json').set('Authorization', `Bearer ${userToken.token}`);
        expect(response?.status).toEqual(201);
    });

    test('should delete course', async function () {
        const response = await request(app)
            .delete('/api/courses/1').set('Accept', 'application/json').set('Authorization', `Bearer ${userToken.token}`);
        expect(response?.status).toEqual(200);
    });

    test('should edit course by Id', async function () {
        const response = await request(app)
            .put('/api/courses/1').send({
                title: 'some title',
                description: 'some description',
                materials: [],
                users: [],
            }).set('Accept', 'application/json').set('Authorization', `Bearer ${userToken.token}`);
        expect(response?.status).toEqual(200);
    });

    test('should get material by Id', async function () {
        const response = await request(app)
            .get('/api/materials/1').set('Accept', 'application/json').set('Authorization', `Bearer ${userToken.token}`);
        expect(response?.status).toEqual(200);
    });

    test('should create material', async function () {
        const response = await request(app)
            .post('/api/materials').send({
                title: '',
                content: '',
                media: [{
                    type: 'video',
                    file: ''
                }]
            }).set('Accept', 'application/json').set('Authorization', `Bearer ${userToken.token}`);
        expect(response?.status).toEqual(201);
    });

    test('should edit material', async function () {
        const response = await request(app)
            .put('/api/materials/1').send({
                title: '',
                content: '',
                media: [{
                    type: 'video',
                    file: ''
                }]
            }).set('Accept', 'application/json').set('Authorization', `Bearer ${userToken.token}`);
        expect(response?.status).toEqual(200);
    });

    test('should delete material by Id', async function () {
        const response = await request(app)
            .delete('/api/materials/1').set('Accept', 'application/json').set('Authorization', `Bearer ${userToken.token}`);
        expect(response?.status).toEqual(200);
    });


    test('should get get user by Id', async function () {
        const response = await request(app)
            .get('/api/users/1').set('Accept', 'application/json').set('Authorization', `Bearer ${userToken.token}`);
        expect(response?.status).toEqual(200);
    });

    test('should create  user', async function () {
        const response = await request(app)
            .post('/api/register/').send({login: 'login', email: 'test', isAdmin: false, password:'pass'}).set('Accept', 'application/json').set('Authorization', `Bearer ${userToken.token}`);
        expect(response?.status).toEqual(201);
    });

    test('should delete user', async function () {
        const response = await request(app)
            .delete('/api/users/1').set('Accept', 'application/json').set('Authorization', `Bearer ${userToken.token}`);
        expect(response?.status).toEqual(200);
    });

    test('should edit user', async function () {
        const response = await request(app)
            .put('/api/users/1').send({login: '', email: '', userType: 1}).set('Accept', 'application/json').set('Authorization', `Bearer ${userToken.token}`);
        expect(response?.status).toEqual(200);
    });

    afterAll(async () => {
        await connection.close();
    });
});

