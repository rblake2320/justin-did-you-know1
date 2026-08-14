import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import * as dotenv from "dotenv";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const FACTS_FILE = "/home/ubuntu/justin-facts/clean_facts.json";

async function seed() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection);

  console.log("Reading facts from", FACTS_FILE);
  const raw = readFileSync(FACTS_FILE, "utf-8");
  const facts = JSON.parse(raw);
  console.log(`Found ${facts.length} facts to seed`);

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < facts.length; i++) {
    const f = facts[i];
    try {
      await connection.execute(
        `INSERT IGNORE INTO facts (videoId, videoTitle, videoUrl, fact, displayOrder) VALUES (?, ?, ?, ?, ?)`,
        [f.id, f.title, f.url, f.fact, i + 1]
      );
      inserted++;
      process.stdout.write(`\r  Seeded ${inserted}/${facts.length}...`);
    } catch (err) {
      console.error(`\n  Error seeding ${f.id}:`, err.message);
      skipped++;
    }
  }

  console.log(`\n\nDone! Inserted: ${inserted}, Skipped: ${skipped}`);
  await connection.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
