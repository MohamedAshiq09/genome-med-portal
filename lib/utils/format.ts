// src/lib/utils/format.ts

// Add this function to parse CSV data to JSON
export function csvToJson(csv: string) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i]) continue;
      const obj: Record<string, string> = {};
      const currentline = lines[i].split(',');
      
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      
      result.push(obj);
    }
    
    return result;
  }