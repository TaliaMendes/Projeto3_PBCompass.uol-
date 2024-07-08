import supertest from 'supertest';
const request = supertest('http://localhost:3000');

describe('Reserve', () => {
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODg2MWMxOTgxZWMxN2M0YzgzNmMwNiIsImlhdCI6MTcyMDQ0OTI1MCwiZXhwIjoxNzIwNDkyNDUwfQ.-W_88lItb8878YBcMpw08k9tIpRYgEO3nnrZAYmcq8s';
  const ReserveId = '6686e83e7df64e6f560c05ee';

  it('should create a new reserve', async () => {
    const response = await request.post('/api/v1/reserve')
    .set('Authorization', `Bearer ${authToken}`)
    .send({
      id_user: '66849109fa8893add19cf7f4',
      start_date: '2005/10/22',
      end_date: '2005/03/23',
      id_car: '66859abd32268e1ed77d1159',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

 
  it('should fetch reserve by end_date', async () => {
    const queryParams = { end_date: '2005/03/20' }; 

    const response = await request
      .get('/api/v1/reserve')
      .query(queryParams)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200); 
  });

  it('should fetch reserve by ID', async () => {
  
    expect(ReserveId).toBeTruthy();

    const response = await request
      .get(`/api/v1/reserve/${ReserveId}`) 
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty('_id', ReserveId);
  });

  it('should update a user', async () => {
    
    expect(ReserveId).toBeTruthy();

    const updatedCarData = {
      id_user: '66849109fa8893add19cf7f4',
      start_date: '2005/10/22',
      end_date: '2005/03/25',
      id_car: '66859abd32268e1ed77d1159',
    };

    const response = await request
      .put(`/api/v1/reserve/${ReserveId}`) 
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedCarData);

    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty('_id'); 
  });

  it('should delete a reserve by ID', async () => {
    expect(ReserveId).toBeTruthy();

    const response = await request
      .delete(`/api/v1/reserve/${ReserveId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(204);
  });
});
