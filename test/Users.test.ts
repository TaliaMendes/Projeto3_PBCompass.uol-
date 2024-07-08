import supertest from 'supertest';
const request = supertest('http://localhost:3000');

describe('Users', () => {
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODg2MWMxOTgxZWMxN2M0YzgzNmMwNiIsImlhdCI6MTcyMDQ0OTI1MCwiZXhwIjoxNzIwNDkyNDUwfQ.-W_88lItb8878YBcMpw08k9tIpRYgEO3nnrZAYmcq8s';
  const UserId = '66849109fa8893add19cf7f4';

  it('should create a new user', async () => {
    const response = await request.post('/api/v1/user')
    .set('Authorization', `Bearer ${authToken}`)
    .send({
      name: 'João',
      cpf: '148.785.863-80',
      birth: '2001/03/20',
      email: 'seuemail@gmail.com',
      password: '98624854',
      cep: '35950-000',
      qualified: 'sim'
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

 
  it('should fetch users by name', async () => {
    const queryParams = { name: 'talia' }; 

    const response = await request
      .get('/api/v1/user')
      .query(queryParams)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200); 
  });

  it('should fetch users by ID', async () => {
  
    expect(UserId).toBeTruthy();

    const response = await request
      .get(`/api/v1/user/${UserId}`) 
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty('_id', UserId);
  });

  it('should update a user', async () => {
    
    expect(UserId).toBeTruthy();

    const updatedCarData = {
      name: 'João',
      cpf: '148.785.863-80',
      birth: '2003/03/20',
      email: 'seuemail@gmail.com',
      password: '98624854',
      cep: '35950-000',
      qualified: 'sim',
    };

    const response = await request
      .put(`/api/v1/user/${UserId}`) 
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedCarData);

    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty('_id'); 
  });

  it('should delete a user by ID', async () => {
    expect(UserId).toBeTruthy();

    const response = await request
      .delete(`/api/v1/user/${UserId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(204);
  });
});
