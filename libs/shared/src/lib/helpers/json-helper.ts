export const parseJsonObjects = (jsonString: string): any[] => {
    jsonString = jsonString.trim();
    const jsonObjects = jsonString.split(/\}\s*\{/);
    const jsonArrayString = '[' + jsonObjects.join('},{') + ']';
    return JSON.parse(jsonArrayString);
  }