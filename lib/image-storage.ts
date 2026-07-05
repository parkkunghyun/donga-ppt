import { getSupabaseAdmin } from "./supabase/admin";
import {
  IMAGE_BUCKET,
  IMAGE_PUBLIC_URL_MARKER,
} from "./supabase/constants";

function getStoragePathFromUrl(url: string): string | null {
  const markerIndex = url.indexOf(IMAGE_PUBLIC_URL_MARKER);
  if (markerIndex === -1) return null;
  return decodeURIComponent(url.slice(markerIndex + IMAGE_PUBLIC_URL_MARKER.length));
}

async function ensureImageBucket() {
  const supabase = getSupabaseAdmin();
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();

  if (listError) {
    throw new Error(`스토리지를 확인하지 못했습니다: ${listError.message}`);
  }

  if (buckets?.some((bucket) => bucket.name === IMAGE_BUCKET)) {
    return;
  }

  const { error } = await supabase.storage.createBucket(IMAGE_BUCKET, {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024,
  });

  if (error && !error.message.toLowerCase().includes("already exists")) {
    throw new Error(`이미지 스토리지를 만들지 못했습니다: ${error.message}`);
  }
}

export async function uploadProjectImage(
  projectId: string,
  file: File
): Promise<string> {
  await ensureImageBucket();
  const supabase = getSupabaseAdmin();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const objectPath = `${projectId}/${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(objectPath, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error(`이미지 업로드에 실패했습니다: ${error.message}`);
  }

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(objectPath);
  return data.publicUrl;
}

export async function deleteProjectImage(url: string): Promise<void> {
  const objectPath = getStoragePathFromUrl(url);
  if (!objectPath) {
    // 기존 로컬 경로(/uploads/...)는 Supabase에 없으므로 목록에서만 제거
    return;
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.storage.from(IMAGE_BUCKET).remove([objectPath]);

  if (error) {
    throw new Error(`이미지 삭제에 실패했습니다: ${error.message}`);
  }
}
