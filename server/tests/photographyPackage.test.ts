import supertest from 'supertest';
import app from '../app';

jest.mock('../middlewares/aouthentication_admin.middleware', () => (req: any, res: any, next: () => any) => next());

describe('PhotographyPackage routes', () => {

    let addedPackageId: number;

    it('should add a new Photography Package', async () => {
        const res = await supertest(app).post('/PhotographyPackage').send({ id: 1, type: "test", moneyToHour: 20 });
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
        addedPackageId = res.body.id;
    });

    it('should handle adding a Photography Package with negative price', async () => {
        const res = await supertest(app).post('/PhotographyPackage').send({ id: 2, type: "test", moneyToHour: -10 });
        expect(res.status).toBe(409);
        expect(res.text).toBe('The price must be positive');
    });

    it('should get all Photography Packages and check for the added package', async () => {
        const res = await supertest(app).get('/PhotographyPackage');
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
        expect(Array.isArray(res.body)).toBe(true);
        const addedPackage = res.body.find((pkg: any) => pkg.id === addedPackageId);
        expect(addedPackage).toBeDefined();
        expect(addedPackage.id).toBe(addedPackageId);
        expect(addedPackage.type).toBe("test");
        expect(addedPackage.moneyToHour).toBe(20);
    });

    it('should update a Photography Package', async () => {
        const res = await supertest(app).put(`/PhotographyPackage/${addedPackageId}`).send({ id: addedPackageId, type: "updated", moneyToHour: 30 });
        expect(res.status).toBe(200);
        expect(res.text).toBe(`Update ${addedPackageId} succeeded`);
    });

    it('should return 404 for a non-existing Photography Package during update', async () => {
        const res = await supertest(app).put('/PhotographyPackage/999').send({ id: 999, type: "test", moneyToHour: 20 });
        expect(res.status).toBe(404);
        expect(res.text).toBe('photography package not found');
    });

    it('should handle updating a Photography Package with negative price', async () => {
        const res = await supertest(app).put(`/PhotographyPackage/${addedPackageId}`).send({ id: addedPackageId, type: "updated", moneyToHour: -10 });
        expect(res.status).toBe(409);
        expect(res.text).toBe('The price must be positive');
    });

    it('should delete a Photography Package', async () => {
        const res = await supertest(app).delete(`/PhotographyPackage/${addedPackageId}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe(`Delete ${addedPackageId} succeeded`);
    });

    it('should return 404 for a non-existing Photography Package during delete', async () => {
        const res = await supertest(app).delete('/PhotographyPackage/999');
        expect(res.status).toBe(404);
        expect(res.text).toBe('photography package not found');
    });

});
