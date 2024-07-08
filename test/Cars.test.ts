import supertest from 'supertest';
const request = supertest('http://localhost:3000');

describe('Cars', () => {
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODg2MWMxOTgxZWMxN2M0YzgzNmMwNiIsImlhdCI6MTcyMDQ0OTI1MCwiZXhwIjoxNzIwNDkyNDUwfQ.-W_88lItb8878YBcMpw08k9tIpRYgEO3nnrZAYmcq8s';
  const CarId = '6685684b97f9816a772512b0';

  it('should create a new car', async () => {
    const response = await request.post('/api/v1/car')
    .set('Authorization', `Bearer ${authToken}`)
    .send({
      model: 'Uno',
      color: 'black',
      year: '2020',
      value_per_day: 200,
      accessories: [
        { description: '4 portas' },
        { description: 'Ar condicionado' },
        { description: 'Vidros elétricos' },
        { description: '4x4' }
      ],
      number_of_passengers: 5,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

 
  it('should fetch cars by model', async () => {
    const queryParams = { model: 'Amarok' }; 

    const response = await request
      .get('/api/v1/car')
      .query(queryParams)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200); 
  });

  it('should fetch cars by ID', async () => {
  
    expect(CarId).toBeTruthy();

    const response = await request
      .get(`/api/v1/car/${CarId}`) 
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty('_id', CarId);
  });

  it('should update a car', async () => {
    
    expect(CarId).toBeTruthy();

    const updatedCarData = {
      model: 'Amarok',
      color: 'white', 
      year: '2011',
      value_per_day: 550,
      accessories: [
        { description: '4 portas' },
        { description: 'Ar condicionado' },
        { description: 'Vidros elétricos' },
        { description: '4x4' }
      ],
      number_of_passengers: 5,
    };

    const response = await request
      .put(`/api/v1/car/${CarId}`) 
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedCarData);

    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty('_id'); 
  });

  it('should update an existing accessory', async () => {
    const updatedDescription = 'Novo Ar condicionado';
    const createdAccessoryId = '66843eae8161136820342694';

    const response = await request
      .patch(`/api/v1/car/${CarId}/accessories/${createdAccessoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ description: updatedDescription });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
  });

  it('should create a new accessory if accessoryId is not provided', async () => {
    const newDescription = 'GPS';

    const response = await request
      .patch(`/api/v1/car/${CarId}/accessories/`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ description: newDescription });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
  });

  it('should delete a car by ID', async () => {
    expect(CarId).toBeTruthy();

    const response = await request
      .delete(`/api/v1/car/${CarId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(204);
  });

  it('should return 404 if trying to delete a non-existent car', async () => {
    const nonExistentCarId = '60d9f12b9b7e2c001c8e4e7b'; 

    const response = await request
      .delete(`/api/v1/car/${nonExistentCarId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(404);
  });
});
