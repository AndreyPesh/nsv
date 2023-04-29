import request from 'supertest';
import app from '../src/app/app';

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test('It should response 404 status', async () => {
    return request(app)
      .get('/unknown-endpoint')
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });

  test('It should response id', async () => {
    const id = 89;
    return request(app)
      .get(`/user/${89}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ user: `${id}` });
      });
  });

  // test('It should response status 500', async () => {
  //   return request(app)
  //     .get(`/error`)
  //     .then((response) => {
  //       expect(response.statusCode).toBe(500);
  //     });
  // });

  test('It should response status 401', async () => {
    return request(app)
      .get(`/admin/user/%id`)
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  test('It should response status 401', async () => {
    return request(app)
      .get(`/admin/user/:id`)
      .set('x-auth', '345')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({user: 'hello, user!'})
      });
  });
});
