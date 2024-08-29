const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-json-schema'));

const baseURL = 'https://reqres.in/api';

// JSON Schemas
const userListSchema = {
    type: 'object',
    properties: {
        page: { type: 'number' },
        per_page: { type: 'number' },
        total: { type: 'number' },
        total_pages: { type: 'number' },
        data: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    email: { type: 'string' },
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    avatar: { type: 'string' }
                },
                required: ['id', 'email', 'first_name', 'last_name', 'avatar']
            }
        }
    },
    required: ['page', 'per_page', 'total', 'total_pages', 'data']
};

const createUserSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        job: { type: 'string' },
        id: { type: 'string' },
        createdAt: { type: 'string' }
    },
    required: ['name', 'job', 'id', 'createdAt']
};

const updateUserSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        job: { type: 'string' },
        updatedAt: { type: 'string' }
    },
    required: ['name', 'job', 'updatedAt']
};

describe('API Automation Tests', () => {
    it('GET /users?page=2', async () => {
        const response = await request(baseURL).get('/users?page=2');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.jsonSchema(userListSchema);
    });

    it('POST /users', async () => {
        const response = await request(baseURL)
            .post('/users')
            .send({ name: 'morpheus', job: 'leader' });
        expect(response.status).to.equal(201);
        expect(response.body).to.be.jsonSchema(createUserSchema);
    });

    it('DELETE /users/2', async () => {
        const response = await request(baseURL).delete('/users/2');
        expect(response.status).to.equal(204);
        // Tidak ada body yang perlu divalidasi
    });

    it('PUT /users/2', async () => {
        const response = await request(baseURL)
            .put('/users/2')
            .send({ name: 'morpheus', job: 'zion resident' });
        expect(response.status).to.equal(200);
        expect(response.body).to.be.jsonSchema(updateUserSchema);
    });
});
