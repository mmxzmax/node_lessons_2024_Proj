const app = require('../app');
const request = require('supertest');

describe('api', () => {
    test('should login', async function () {
        const response = await request(app)
            .post('/api/login')
            .send({name: 'username', password: 'password'})
            .set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should logout', async function () {
        const response = await request(app)
            .get('/api/logout')
            .set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should get courses list', async function () {
        const response = await request(app)
            .get('/api/courses').set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should get course by Id', async function () {
        const response = await request(app)
            .get('/api/courses/1').set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should create course', async function () {
        const response = await request(app)
            .put('/api/courses/create').send({
                title: 'some title',
                description: 'some description',
                materials: [],
                users: [],
            }).set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should delete course', async function () {
        const response = await request(app)
            .delete('/api/courses/1').set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should edit course by Id', async function () {
        const response = await request(app)
            .patch('/api/courses/1').send({
                title: 'some title',
                description: 'some description',
                materials: [],
                users: [],
            }).set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should get course comments', async function () {
        const response = await request(app)
            .get('/api/courses/1/comments').set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should sent course comment', async function () {
        const response = await request(app)
            .put('/api/courses/1/comments').send({
                authorId: 10,
                comment: 'some comment'
            }).set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should get material by Id', async function () {
        const response = await request(app)
            .get('/api/materials/1').set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should create material', async function () {
        const response = await request(app)
            .put('/api/materials').send({
                title: '',
                content: '',
                media: [{
                    type: 'video',
                    file: ''
                }]
            }).set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should edit material', async function () {
        const response = await request(app)
            .patch('/api/materials/1').send({
                title: '',
                content: '',
                media: [{
                    type: 'video',
                    file: ''
                }]
            }).set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should delete material by Id', async function () {
        const response = await request(app)
            .delete('/api/materials/1').set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });


    test('should get get user by Id', async function () {
        const response = await request(app)
            .get('/api/users/1').set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should create  user', async function () {
        const response = await request(app)
            .put('/api/users/').send({login: '', email: '', userType: 1}).set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should delete user', async function () {
        const response = await request(app)
            .delete('/api/users/1').set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });

    test('should edit user', async function () {
        const response = await request(app)
            .patch('/api/users/1').send({login: '', email: '', userType: 1}).set('Accept', 'application/json');
        expect(response?.status).toEqual(200);
        expect(response?.headers["Content-Type"]).toMatch(/json/);
    });
});

