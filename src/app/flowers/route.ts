import { NextResponse } from "next/server";

export const FLOWERS_REDIRECT_URL =
  "https://mate-wedding.ru/mikhail-and-varvara";

export const GET = (): Response => {
  return NextResponse.redirect(FLOWERS_REDIRECT_URL, 307);
};
