import { uploadOrgLogo } from "@/lib/settings/org-repository";
import { apiError, apiSuccess } from "@/lib/api-response";
import { isS3Configured, putObject } from "@/lib/storage/s3";

export const dynamic = "force-dynamic";

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 180) || "logo.png";
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return apiError("INVALID_FORM", "Could not parse multipart form data.", 400);
    }

    const file = form.get("file");
    if (!(file instanceof File)) {
      return apiError("VALIDATION_ERROR", "file is required for multipart upload.", 400);
    }

    const filename = sanitizeFilename(file.name?.trim() || "logo.png");
    const storageKey = `org/logo/${filename}`;
    let uploadedKey: string | undefined;

    if (isS3Configured()) {
      try {
        const bytes = Buffer.from(await file.arrayBuffer());
        await putObject(storageKey, bytes, file.type || "application/octet-stream");
        uploadedKey = storageKey;
      } catch (err) {
        console.error("[org/logo] S3 upload failed", err);
        return apiError("UPLOAD_FAILED", "Could not upload logo to storage.", 502);
      }
    }

    return apiSuccess(
      await uploadOrgLogo({
        filename,
        storageKey: uploadedKey,
      }),
    );
  }

  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    // empty body is fine — use stub filename
  }

  const filename =
    body && typeof body === "object"
      ? String(
          (body as { filename?: string; logoFilename?: string }).filename ??
            (body as { logoFilename?: string }).logoFilename ??
            "",
        ).trim()
      : "";

  if (filename === "" && body && typeof body === "object" && "filename" in (body as object)) {
    return apiError("VALIDATION_ERROR", "filename cannot be empty.");
  }

  return apiSuccess(await uploadOrgLogo({ filename: filename || undefined }));
}
