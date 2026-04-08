/**
 * One-time script to fix the PostgreSQL sequence for the post table.
 *
 * The "Unique constraint failed on id" error occurs when the auto-increment
 * sequence is behind the actual max id in the table (e.g. after manual inserts).
 *
 * Run with:
 *   npx tsx scripts/fix-post-sequence.ts
 */

import prisma from "../lib/prisma"

async function fixPostSequence() {
  const result = await prisma.$queryRaw<{ setval: bigint }[]>`
    SELECT setval(
      pg_get_serial_sequence('post', 'id'),
      COALESCE((SELECT MAX(id) FROM post), 1)
    )
  `
  console.log("Sequence reset to:", result[0]?.setval?.toString())
  await prisma.$disconnect()
}

fixPostSequence().catch((e) => {
  console.error(e)
  process.exit(1)
})
