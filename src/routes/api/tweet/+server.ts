import fs from 'fs';
import type { RequestHandler } from "./$types";

export async function GET(args: RequestHandler) {
  const res = new Response(fs.readFileSync('./data.json'));

  res.headers.set('Content-Type', 'application/json');

  return res;
}