const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path');

const csvFilePath = '/Users/anzor/Downloads/minemaps_v2.csv';

// Clear existing migration file
const migrationFile = path.join(__dirname, '../migrations/0001_import_maps.sql');
fs.writeFileSync(migrationFile, '-- Migration: Import maps data\n');

// Helper function to escape SQL strings
function escapeSql(str) {
  if (!str) return '';
  return str.replace(/'/g, "''")
            .replace(/\\/g, '\\\\')
            .replace(/\n/g, '\\n');
}

// Read and parse the CSV file
fs.createReadStream(csvFilePath)
  .pipe(parse({
    delimiter: ',',
    columns: true,
    skip_empty_lines: true
  }))
  .on('data', (row) => {
    // Prepare the SQL insert statement with proper escaping
    const values = [
      row.id,
      escapeSql(row.name),
      escapeSql(row.description),
      escapeSql(row.author),
      escapeSql(row.album_id),
      escapeSql(row.cover_id),
      escapeSql(row.youtube),
      escapeSql(row.type),
      escapeSql(row.size),
      escapeSql(row.version_name),
      row.premium === '1' ? '1' : '0',
      escapeSql(row.creator_links)
    ];
    
    const sql = `INSERT OR REPLACE INTO maps (
      id, name, description, author, album_id, cover_id, youtube, type, size, version_name, premium, creator_links
    ) VALUES (
      ${values.map(v => `'${v}'`).join(', ')}
    );\n`;
    
    fs.appendFileSync(migrationFile, sql);
  })
  .on('end', () => {
    console.log('CSV parsing complete, SQL file generated');
  });
