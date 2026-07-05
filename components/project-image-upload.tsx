"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface ProjectImageUploadProps {
  projectId: string;
  images: string[];
  onChange: (images: string[]) => void;
}

export function ProjectImageUpload({
  projectId,
  images,
  onChange,
}: ProjectImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", projectId);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error ?? "업로드에 실패했습니다.");
    }
    return data.url as string;
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    const uploaded: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const url = await uploadFile(file);
        uploaded.push(url);
      }
      onChange([...images, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드에 실패했습니다.");
      if (uploaded.length > 0) {
        onChange([...images, ...uploaded]);
      }
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleRemove(url: string) {
    await fetch("/api/admin/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    onChange(images.filter((img) => img !== url));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[13px] font-bold text-main">결과물 이미지</p>
          <p className="mt-1 text-[12px] text-muted">
            1장 이상 추가할 수 있습니다. 여러 장을 한 번에 선택할 수 있습니다.
          </p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="shrink-0 rounded-lg border border-accent px-3 py-1.5 text-[13px] text-accent disabled:opacity-50"
        >
          {uploading ? "업로드 중..." : "이미지 추가"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {error && <p className="text-[13px] text-red-600">{error}</p>}

      {images.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface px-4 py-8 text-center text-[13px] text-muted">
          아직 등록된 이미지가 없습니다. 최소 1장 이상 추가해 주세요.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((url, index) => (
            <div
              key={url}
              className="overflow-hidden rounded-lg border border-border bg-surface"
            >
              <div className="relative aspect-video">
                <Image
                  src={url}
                  alt={`결과물 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 240px"
                />
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-[12px] text-muted">{index + 1}번 이미지</span>
                <button
                  type="button"
                  onClick={() => handleRemove(url)}
                  className="text-[12px] text-muted hover:text-red-600"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
