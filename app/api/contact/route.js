export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 350;
const SCRIPT_TIMEOUT_MS = 20000;

const clean = (value) => (typeof value === "string" ? value.trim() : "");
const fail = (error, status) => Response.json({ error }, { status });

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return fail("Invalid request.", 400);

  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (clean(body.website)) return Response.json({ message: "Thank you. Your details have been received." }, { status: 201 });

  const entry = {
    submittedAt: new Date().toISOString(),
    name: clean(body.name),
    email: clean(body.email),
    countryCode: clean(body.countryCode) || "+91",
    phone: clean(body.phone),
    message: clean(body.message),
  };

  if (!entry.name || !entry.email || !entry.phone || !entry.message) return fail("Please complete every field.", 400);
  if (entry.name.length > 100) return fail("Name must be 100 characters or fewer.", 400);
  if (entry.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email)) return fail("Enter a valid email address.", 400);
  if (!/^\+\d{1,4}$/.test(entry.countryCode)) return fail("Enter a valid country code, for example +91.", 400);
  if (!/^[\d\s().-]{6,20}$/.test(entry.phone)) return fail("Enter a valid phone number.", 400);
  if (entry.message.length > MAX_MESSAGE_LENGTH) return fail(`Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`, 400);

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  const scriptSecret = process.env.GOOGLE_SCRIPT_SECRET;
  if (!scriptUrl || !scriptSecret) {
    console.error("Contact form is not configured: set GOOGLE_SCRIPT_URL and GOOGLE_SCRIPT_SECRET.");
    return fail("The contact form is temporarily unavailable. Please email info@mactus.co.in instead.", 503);
  }

  try {
    // Apps Script answers a POST with a redirect to the response body, so redirects must be followed.
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...entry, secret: scriptSecret }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(SCRIPT_TIMEOUT_MS),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.ok) {
      console.error("Google Sheets script rejected the submission", response.status, result);
      return fail("We could not save your details. Please try again.", 502);
    }
    return Response.json({ message: "Thank you. Your details have been received." }, { status: 201 });
  } catch (error) {
    console.error("Unable to reach the Google Sheets script", error);
    return fail("We could not save your details. Please try again.", 502);
  }
}
