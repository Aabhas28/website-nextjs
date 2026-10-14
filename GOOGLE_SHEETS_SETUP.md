# Send contact-form submissions to Google Sheets

The website's contact form posts to `/api/contact`, which forwards each submission to a small
Google Apps Script attached to your Google Sheet. The script adds one row per submission.
The website never holds Google credentials, only the script's URL and a shared secret.

You need: a Google account, about 10 minutes, no coding.

## Step 1: Create the sheet

1. Go to <https://sheets.google.com> and click **Blank spreadsheet**.
2. Name it, for example `Mactus website leads`.
   You do not need to add headers or rename tabs. The script creates a `Contact leads` tab with headers on the first submission.

## Step 2: Add the script

1. In the sheet, click **Extensions → Apps Script**. A new tab opens.
2. Delete everything in the editor.
3. Open `apps-script/Code.gs` from this project, copy all of it, and paste it into the editor.
4. Click the **Save** icon (or Cmd/Ctrl+S).

## Step 3: Set the shared secret

This stops strangers from posting junk to your script URL.

1. In the Apps Script editor, click the **gear icon (Project Settings)** on the left.
2. Scroll to **Script Properties** and click **Add script property**.
3. Property: `SHARED_SECRET`  Value: a long random string, for example the output of
   `openssl rand -base64 24` in a terminal. Keep a copy of it for Step 5.
4. Click **Save script properties**.

## Step 4: Deploy as a web app

1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Set:
   - **Description:** `Contact form`
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**
4. Click **Deploy**. Google asks you to authorize. Click **Authorize access**, choose your account,
   then **Advanced → Go to (project name) (unsafe) → Allow**. This warning is normal for your own scripts.
5. Copy the **Web app URL**. It ends in `/exec`.
6. Check it: paste the URL into a browser tab. You should see
   `{"ok":true,"service":"Mactus contact form receiver"}`.

> If you edit `Code.gs` later, use **Deploy → Manage deployments → pencil icon → Version: New version → Deploy**.
> The URL stays the same.

## Step 5: Give the website the URL and secret

**Local:** create a file named `.env.local` in the project root:

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
GOOGLE_SCRIPT_SECRET=the-same-string-you-put-in-SHARED_SECRET
```

Restart `npm run dev` afterwards.

**Production:** add the same two variables in your hosting dashboard
(for Vercel: Project → Settings → Environment Variables), then redeploy.

## Step 6: Test

1. Open `/contact`, fill in the form, tick "I'm not a robot", press **SEND**.
2. A new row should appear in the `Contact leads` tab within a few seconds, with values under
   Submitted at / Name / Email / Country code / Phone / Message.
3. Repeat on the live site after deploying.

## Troubleshooting

| Symptom on the site | Likely cause |
|---|---|
| "The contact form is temporarily unavailable" | `GOOGLE_SCRIPT_URL` or `GOOGLE_SCRIPT_SECRET` is missing on the server. Restart or redeploy after setting them. |
| "We could not save your details" | Secret mismatch, deployment access not set to **Anyone**, or the URL is an old/test one. Open the URL in a browser (Step 4.6) and compare the secret in Script Properties. |
| Nothing in the sheet but success shown | Impossible by design: success is only shown when the script returns `ok: true`. Check you are looking at the sheet the script is attached to. |
