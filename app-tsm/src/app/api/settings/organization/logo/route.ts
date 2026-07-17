import { uploadOrgLogo } from "@/lib/settings/org-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    // empty body is fine — use stub filename
  }

  const filename =
    body && typeof body === "object"
      ? String((body as { filename?: string; logoFilename?: string }).filename ??
          (body as { logoFilename?: string }).logoFilename ??
          "").trim()
      : "";

  if (filename === "" && body && typeof body === "object" && "filename" in (body as object)) {
    return apiError("VALIDATION_ERROR", "filename cannot be empty.");
  }

  return apiSuccess(await uploadOrgLogo(filename || undefined));
}
