import { request } from '@playwright/test';
import { API_URL } from '../test-data';


export class Contact {
    static async createContact(contact) {
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
