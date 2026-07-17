import {
  DeleteObjectCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

export function isS3Configured(): boolean {
  return Boolean(
    process.env.S3_ENDPOINT?.trim() &&
      process.env.S3_ACCESS_KEY?.trim() &&
      process.env.S3_SECRET_KEY?.trim() &&
      process.env.S3_BUCKET?.trim(),
  );
}

function getBucket(): string {
  return process.env.S3_BUCKET!.trim();
}

const g = globalThis as typeof globalThis & {
  __tsmS3?: S3Client;
};

export function getS3Client(): S3Client {
  if (!isS3Configured()) {
    throw new Error("S3 is not configured.");
  }
  if (!g.__tsmS3) {
    const forcePathStyle =
      process.env.S3_FORCE_PATH_STYLE === "1" ||
      process.env.S3_FORCE_PATH_STYLE === "true";
    g.__tsmS3 = new S3Client({
      endpoint: process.env.S3_ENDPOINT!.trim(),
      region: process.env.S3_REGION?.trim() || "us-east-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!.trim(),
        secretAccessKey: process.env.S3_SECRET_KEY!.trim(),
      },
      forcePathStyle,
    });
  }
  return g.__tsmS3;
}

export async function putObject(
  key: string,
  body: Buffer | Uint8Array | string,
  contentType: string,
): Promise<void> {
  const client = getS3Client();
  await client.send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
}

/** Public / path-style object URL (not signed). */
export function getObjectUrl(key: string): string {
  const endpoint = process.env.S3_ENDPOINT!.trim().replace(/\/$/, "");
  const bucket = getBucket();
  const forcePathStyle =
    process.env.S3_FORCE_PATH_STYLE === "1" ||
    process.env.S3_FORCE_PATH_STYLE === "true";
  if (forcePathStyle) {
    return `${endpoint}/${bucket}/${key}`;
  }
  const host = endpoint.replace(/^https?:\/\//, "");
  const proto = endpoint.startsWith("https") ? "https" : "http";
  return `${proto}://${bucket}.${host}/${key}`;
}

export async function deleteObject(key: string): Promise<void> {
  const client = getS3Client();
  await client.send(
    new DeleteObjectCommand({
      Bucket: getBucket(),
      Key: key,
    }),
  );
}

export async function checkS3Health(): Promise<"up" | "down" | "unset"> {
  if (!isS3Configured()) return "unset";
  try {
    const client = getS3Client();
    await client.send(new HeadBucketCommand({ Bucket: getBucket() }));
    return "up";
  } catch {
    return "down";
  }
}
