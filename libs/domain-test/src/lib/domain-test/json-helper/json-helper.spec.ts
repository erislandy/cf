import { parseJsonObjects } from '@cf/shared';
describe('Json helper', () => {
  it('update name of routine', () => {
    const jsondata = `
   [  {    "functionName": "functions.set-notification-message",    "parameters": {      "notificationMessage": "Alert of temperature limit"    }  },  {    "functionName": "functions.set-notification-type",    "parameters": {      "type": "Push"    }  }]
        
    `
  
    const result = JSON.parse(jsondata);
    expect(result.length).toEqual(2);
  });
});
