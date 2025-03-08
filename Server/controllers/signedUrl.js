import admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
import { v4 as uuidv4 } from "uuid";
import { readFileSync } from "fs";

const service_account = JSON.parse(readFileSync("service_account.json"));
admin.initializeApp({
  credential: admin.credential.cert(service_account[0]),
  storageBucket: "snooplay-a5644.appspot.com",
});

const bucket = getStorage().bucket();

export const generateSignedUrl = async (req, res) => {
  try {
    const { fileName, contentType } = req.body;

    if (!fileName || !contentType) {
      return res.status(400).json({ error: "Missing fileName or contentType" });
    }

    const filePath = `uploads/${uuidv4()}_${fileName}`;
    const file = bucket.file(filePath);
    const [url] = await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000,
      contentType,
    });
    res.json({ uploadUrl: url, filePath });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
};
