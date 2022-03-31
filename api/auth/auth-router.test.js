const request = require('supertest');
const server = require('../server');
const db = require('../../data/dbConfig');


const user1 = {
    username: 'Danielle',
    password: '1234'
}
const user2 = {
    username: 'Strazzberi',  
    password: ''
}
const user3 = {
    username: '',
    password: '1234'
}


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
});


beforeEach(async () => {
    await db.seed.run()
})


beforeEach(async () => {
    await db('users').truncate()
})


afterAll(async () => {
    await db.destroy()
})


describe('GET /jokes', () => {
    test('returns error status', async () => {
        const res = await request(server).get('/api/jokes')
        expect(res.status).toBe(403)
    })
    test('returns error message', async () => {
        const res = await request(server).get('/api/jokes')
        expect(res.body.message).toBe(`token required`)

    })
})


describe('POST login', () => {
    test('returns error status', async () => {
        const res = await request(server).post('/api/auth/login').send(user2)
        expect(res.status).toBe(401)
    } )
    test('returns error message', async () => {
        const res = await request(server).post(`/api/auth/login`).send(user3)
        expect(res.body.message).toBe(`username and password required`)
    })

})


describe('POST register/credentials', () => {
    test('returns error status', async () => {
        const res = await request(server).post(`/api/auth/register`).send(user2)
        expect(res.body.message).toBe(`username and password required`)
    })
    test('returns error message', async () => {
        const res = await request(server).post(`/api/auth/register`).send(user3)
        expect(res.body.message).toBe(`username and password required`)

    })
})


describe('POST register/name exists', () => {
    test('returns error status if username exists', async () => {
        const user = await request(server).post(`/api/auth/register`).send(user1)  // eslint-disable-line

        const res = await request(server).post(`/api/auth/register`).send(user1)
        expect(res.status).toBe(401)
    })
    test('returns error message if username exists', async () => {
        const user = await request(server).post(`/api/auth/register`).send(user1)  // eslint-disable-line

        const res = await request(server).post(`/api/auth/register`).send(user1)
        expect(res.body.message).toBe(`username taken`)
    })
})
