import {
  DeleteObjectCommand,
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import multer from "multer";
import path from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../errors/ApiError";

ffmpeg.setFfmpegPath(ffmpegPath as string);

/* ================= ENV ================= */
const REGION = "ap-south-1";
const ENDPOINT = "https://blr1.digitaloceanspaces.com";
const SPACE_NAME = "cit-node";

/* ================= S3 CLIENT ================= */
const s3 = new S3Client({
  region: REGION,
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: "DO003NGNH3Z8U72AGPHW",
    secretAccessKey: "y05jtj5lb1CGu9XxZMCYVggZSTNhaQuukluw+AuCuME",
  },
});

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const ImageUpload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
});

/* ================= FILE TYPE ================= */
const isImage = (file: Express.Multer.File) =>
  file.mimetype.startsWith("image/");
const isVideo = (file: Express.Multer.File) =>
  file.mimetype.startsWith("video/");

/* ================= IMAGE OPTIMIZE ================= */
const optimizeImage = async (filePath: string): Promise<string> => {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const newPath = filePath.replace(ext, ".webp");

  const optimized = await sharp(buffer)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true }) // max width
    .webp({ quality: 70 })
    .toBuffer();

  await fs.promises.writeFile(newPath, optimized);
  fs.unlinkSync(filePath); // remove old file

  return newPath;
};

/* ================= VIDEO OPTIMIZE ================= */
const optimizeVideo = async (filePath: string): Promise<string> => {
  const ext = path.extname(filePath).toLowerCase();
  const newPath = filePath.replace(ext, "-compressed.mp4");

  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .videoCodec("libx264")
      .size("?x720")
      .outputOptions(["-crf 28", "-preset fast", "-movflags +faststart"])
      .save(newPath)
      .on("end", () => {
        fs.unlinkSync(filePath); // remove original
        resolve(newPath);
      })
      .on("error", reject);
  });
};

/* ================= UPLOAD ================= */
const uploadToSpaces = async (file: Express.Multer.File) => {
  if (!file) throw new ApiError(400, "File not found");

  try {
    // 🔹 Optimize first
    if (isImage(file)) {
      console.log("🖼️ Optimizing image...");
      file.path = await optimizeImage(file.path);
      file.filename = path.basename(file.path);
      file.mimetype = "image/webp";
    }

    if (isVideo(file)) {
      console.log("🎥 Optimizing video...");
      file.path = await optimizeVideo(file.path);
      file.filename = path.basename(file.path);
      file.mimetype = "video/mp4";
    }

    // 🔹 Upload
    const fileStream = fs.createReadStream(file.path);
    const Key = `aladin_image/${file.filename}`;

    const result = await s3.send(
      new PutObjectCommand({
        Bucket: SPACE_NAME,
        Key,
        Body: fileStream,
        ACL: "public-read" as ObjectCannedACL,
        ContentType: file.mimetype,
      }),
    );

    fs.unlinkSync(file.path); // remove temp file

    if (result.$metadata.httpStatusCode !== 200)
      throw new ApiError(400, "Upload failed");

    return {
      Location: `https://${SPACE_NAME}.blr1.cdn.digitaloceanspaces.com/${Key}`,
      Key,
    };
  } catch (error) {
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    throw error;
  }
};

/* ================= DELETE ================= */
const deleteFromSpaces = async (key: string) => {
  if (!key) return;

  const result = await s3.send(
    new DeleteObjectCommand({
      Bucket: SPACE_NAME,
      Key: key,
    }),
  );

  if (result.$metadata.httpStatusCode !== 204)
    throw new ApiError(400, "Delete failed");
  return true;
};

/* ================= EXPORT ================= */
export const FileUploadHelper = {
  ImageUpload,
  uploadToSpaces,
  deleteFromSpaces,
};
