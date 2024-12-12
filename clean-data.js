import fs from 'fs';

const data = fs.readFileSync('public/locations-tracksphere-cho-old.json', 'utf8');

let cleanData = JSON.parse(data);
cleanData = {
  data: {
    rows: cleanData.data.rows.map((row) => {
      return {
        id: row.id,
        name: row.name,
        code: row.code,
        elementType: {
          name: row.elementType.name,
        },
      };
    }),
  }
};
fs.writeFileSync('public/locations-tracksphere-cho.json', JSON.stringify(cleanData));
