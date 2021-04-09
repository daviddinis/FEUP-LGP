import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

beforeAll(done => {
    done()
})

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})


describe('/healthcheck', () => {
    it('Responds with 200', async () => {
        //await request(app).get('/healthcheck').expect(200);
    })
});

