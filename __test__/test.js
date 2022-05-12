const request = require('supertest');
const express = require('express');

const app = express();


// describe('Post Endpoints', () => {
//     it('should create a new post', async () => {
//         const res = await request(app)
//             .post('/login')
//             .send({
//                 Email: "dat123@gmail.com",
//                 Password: "1234",
//             })
//         expect(201)
//     })
// })
// describe('Post Endpoints', () => {
//     it('should create a new post', async () => {
//         const res = await request(app)
//             .post('/login')
//             .send({
//                 Email: "dat123@gmail.com",
//                 Password: "12345",
//             })
//         expect(404)
//     })
// })

describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                Email: "dat1234@gmail.com",
                Password: "12345",
                Gender: "Nam",
                Dob: '20-42-2002',
                UserName: 'Thanh',
                Address: 'Phu tho',
                Phone: '0323456854',
                Image: 'empty.png'
            })
        expect(400)
    })
})