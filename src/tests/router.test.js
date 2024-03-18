require('dotenv').config();
const request = require('supertest')

const baseURL = 'http://localhost:' + process.env.PORT

test('user opens website with no directory should be redirected to /home', async () => {
    const res = await request(baseURL).get('/');
    expect(res.statusCode).toBe(302)
    expect(res.redirect).toBe(true);
    expect(res.headers['location']).toBe('/home')
})