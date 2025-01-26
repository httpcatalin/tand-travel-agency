import { cookies } from "next/headers";

export default async function setNecessaryCookiesAction(cookiesObj) {
  try {
    const cookieStore = await cookies();

    for (const [name, cookie] of Object.entries(cookiesObj)) {
      await cookieStore.set(name, cookie.value, {
        path: cookie?.path || "/",
        secure: cookie?.secure || true,
        httpOnly: cookie?.httpOnly || true,
        sameSite: cookie?.sameSite || "strict",
        maxAge: cookie?.maxAge || 99999999999999,
      });
    }

    return { success: true, message: "Cookies set successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}