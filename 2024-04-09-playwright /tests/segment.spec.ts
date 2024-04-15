import { test, expect } from '@playwright/test';
import { USER } from '../test-data';
import { Segments } from '../app-api/segments';

const segment ={
  "name": "Segment by email",
  "filters": {
      "type": "group",
      "group": {
          "junction": "or",
          "members": [
              {
                  "type": "group",
                  "group": {
                      "junction": "and",
                      "members": [
                          {
                              "type": "group",
                              "group": {
                                  "junction": "and",
                                  "members": [
                                      {
                                          "type": "rule",
                                          "rule": {
                                              "resourceType": "contacts",
                                              "filter": {
                                                  "filterType": "junction",
                                                  "junction": "and",
                                                  "filters": [
                                                      {
                                                          "filterType": "filter",
                                                          "filterValue": {
                                                              "operator": "eq",
                                                              "valueType": "string_list",
                                                              "value": {
                                                                  "operator": "any",
                                                                  "values": [
                                                                      "ssfecefvcer"
                                                                  ]
                                                              },
                                                              "property": "email"
                                                          }
                                                      }
                                                  ]
                                              }
                                          }
                                      }
                                  ]
                              }
                          }
                      ]
                  }
              }
          ]
      }
  }
}

test.describe('Segment APP spec', () => {

  test('Should be able to segment by contact id', async () => {
    await page.goto('/register/');
    await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);
  
    await page.fill("#field-login-login", `${USER.username}`);
    await page.fill("[type='password']", `${USER.password}`);
    await page.click("//*[@id='field-login-loginSubmit']");
  
    await expect(page.getByText('Log Out')).toContainText('Log Out')
    await expect(page.getByText('Log Out')).toBeVisible();
  });

});


