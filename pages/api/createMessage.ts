// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);

export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, subject, message, token } = JSON.parse(req.body);

  if (!token) {
    return res.status(400).json({
      message: "Could not submit message due to missing captcha token",
    });
  }

  const secretParam = "secret=" + process.env.HCAPTCHA_SECRET_KEY;
  const responseParam = "response=" + token;

  try {
    // Make POST request with data payload to hCaptcha API endpoint.
    const captchaResponse = await fetch(
      process.env.HCAPTCHA_VERIFY_URL + "?" + secretParam + "&" + responseParam,
      {
        method: "POST",
      }
    );

    const captchaValidation = await captchaResponse.json();

    if (!captchaValidation.success) {
      console.log(captchaValidation.success);
      return res.status(400).json({
        message: "Could not submit message due to captcha error",
      });
    }
    console.log("finally worked");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Could not submit message due to captcha error",
      err,
    });
  }

  try {
    await client.create({
      _type: "message",
      name,
      email,
      subject,
      message,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Could not submit message", err });
  }
  res.status(200).json({ message: "Message Submitted" });
}
