import { request } from '@playwright/test';
import { APP_URL } from '../test-data'; 


export class Segments {
    static async create(segement) {
        const context = await request.newContext();

        const response = await context.post(`${API_URL}/v3/contacts`, {
            data: contact,
            });
        return response;
    }

    static async createContactByEmail(email) {
        const context = await request.newContext();

        const response = await context.post(`${API_URL}/v3/contacts`, {
            data: contact,
            });
        return response;
    }
}
