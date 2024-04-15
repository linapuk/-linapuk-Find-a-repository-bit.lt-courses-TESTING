import { test, expect } from "@playwright/test";
import { USER } from "../test-data";
import { faker } from "@faker-js/faker";
import { Contact } from "../api/contacts";

test.describe("API contacts spec", () => {

  test("Should be able to create contact", async ({  }) => {
   const response = await Contact.createContact(contact));

  });
});
