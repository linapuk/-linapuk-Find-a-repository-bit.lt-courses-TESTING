describe("API Contacts spec", () => {
  beforeEach(() => {});

  it("Should be able to create contact", () => {
    const response = cy.request({
      method: "POST",
      url: "https://api.omnisend.com/v3/contacts",
      failOnStatusCode: false,
      body: {
        firstName: "NameCY01",
        lastName: "SurnameCY01",
        identifiers: [
          {
            type: "email",
            channels: {
              email: {
                status: "subscribed",
              },
            },
            id: "testapicy@testcy.com",
          },
        ],
      },
      headers: {
        'X-API-KEY': "65ccf871431c8b7f3b6a5c03-1OFS7QHiROaFyzna880OlyOo0jEQYMy3r3VIBD9fJ4d6LU4WKx",
      },
    });

    expect(response.status).to.eq(200)
  });
});
