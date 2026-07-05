"use client";

import { useEffect, useState } from "react";
import type { Project, SiteContent } from "@/lib/types";
import { createEmptyProject, syncContent } from "@/lib/project-utils";
import { ProjectImageUpload } from "./project-image-upload";

const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-[14px] text-text outline-none focus:border-accent";
const labelClass = "mb-1.5 block text-[12px] font-medium text-muted";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });

    if (res.ok) {
      onSuccess();
    } else {
      setError("핀코드가 올바르지 않습니다.");
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-2 text-[24px] font-bold text-main">관리자 로그인</h1>
      <p className="mb-6 text-[14px] text-muted">핀코드를 입력해 주세요.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="핀코드">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className={inputClass}
            placeholder="핀코드 입력"
            autoFocus
          />
        </Field>
        {error && <p className="text-[13px] text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-main px-5 py-2.5 text-[14px] font-medium text-white disabled:opacity-50"
        >
          {loading ? "확인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}

function ProjectEditor({
  project,
  index,
  defaultOpen = false,
  onChange,
  onImagesChange,
  onDelete,
}: {
  project: Project;
  index: number;
  defaultOpen?: boolean;
  onChange: (index: number, project: Project) => void;
  onImagesChange: (index: number, images: string[]) => void;
  onDelete: (index: number) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);

  function update<K extends keyof Project>(key: K, value: Project[K]) {
    onChange(index, { ...project, [key]: value });
  }

  return (
    <div className="rounded-xl border border-border bg-bg">
      <div className="flex items-center gap-3 px-5 py-4">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex flex-1 items-center justify-between text-left"
        >
          <span className="text-[15px] font-bold text-main">{project.title}</span>
          <span className="text-[13px] text-muted">{open ? "접기" : "펼치기"}</span>
        </button>
        <button
          type="button"
          onClick={() => onDelete(index)}
          className="shrink-0 text-[13px] text-muted hover:text-red-600"
        >
          삭제
        </button>
      </div>

      {open && (
        <div className="space-y-4 border-t border-border px-5 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="제목">
              <input
                value={project.title}
                onChange={(e) => update("title", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="계열사">
              <input
                value={project.affiliate}
                onChange={(e) => update("affiliate", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="누가 했는지">
              <input
                value={project.participants ?? ""}
                onChange={(e) => update("participants", e.target.value)}
                className={inputClass}
                placeholder="예: 입학처 AX TF (김○○, 이○○)"
              />
            </Field>
          </div>

          <Field label="요약">
            <textarea
              value={project.summary}
              onChange={(e) => update("summary", e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="과제를 한눈에 파악할 수 있는 요약을 작성해 주세요."
            />
          </Field>
          <Field label="문제 상황">
            <textarea
              value={project.problem ?? ""}
              onChange={(e) => update("problem", e.target.value)}
              rows={4}
              className={inputClass}
            />
          </Field>
          <Field label="AS-IS">
            <textarea
              value={project.asIs}
              onChange={(e) => update("asIs", e.target.value)}
              rows={4}
              className={inputClass}
            />
          </Field>
          <Field label="TO-BE">
            <textarea
              value={project.toBe}
              onChange={(e) => update("toBe", e.target.value)}
              rows={4}
              className={inputClass}
            />
          </Field>

          <div className="rounded-lg bg-surface p-4">
            <p className="mb-3 text-[13px] font-bold text-main">
              Impact (정량적) · 시간
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="절감 시간">
                <input
                  type="text"
                  inputMode="decimal"
                  value={
                    project.impactValue === 0
                      ? ""
                      : String(project.impactValue)
                  }
                  onChange={(e) => {
                    const raw = e.target.value.trim();
                    if (raw === "") {
                      update("impactValue", 0);
                      return;
                    }
                    const num = parseFloat(raw);
                    if (!Number.isNaN(num)) {
                      update("impactValue", num);
                    }
                  }}
                  className={inputClass}
                  placeholder="100"
                />
              </Field>
              <Field label="설명 라벨">
                <input
                  value={project.impactLabel}
                  onChange={(e) => update("impactLabel", e.target.value)}
                  className={inputClass}
                  placeholder="연간 절감 (40% 절감)"
                />
              </Field>
            </div>
            <p className="mt-2 text-[12px] text-muted">
              화면에는 48.0시간 형식으로 표시됩니다.
            </p>
          </div>

          <Field label="Impact (정성적)">
            <textarea
              value={project.impactQualitative ?? ""}
              onChange={(e) => update("impactQualitative", e.target.value)}
              rows={4}
              className={inputClass}
              placeholder="정성적 성과, 사용자 반응, 조직적 변화 등을 작성해 주세요."
            />
          </Field>

          <ProjectImageUpload
            projectId={project.id}
            images={project.images ?? []}
            onChange={(images) => onImagesChange(index, images)}
          />
        </div>
      )}
    </div>
  );
}

function AdminEditor({ onLogout }: { onLogout: () => void }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then(setContent);
  }, []);

  function applySync(next: SiteContent): SiteContent {
    return syncContent(next);
  }

  async function persistContent(next: SiteContent, notice?: string) {
    setSaving(true);
    setMessage("");

    const synced = applySync(next);

    const res = await fetch("/api/admin/data", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(synced),
    });

    setSaving(false);
    if (res.ok) {
      setContent(synced);
      setMessage(notice ?? "저장되었습니다.");
    } else {
      setMessage("저장에 실패했습니다.");
    }
  }

  async function handleSave() {
    if (!content) return;
    await persistContent(content);
  }

  async function handleImagesChange(index: number, images: string[]) {
    if (!content) return;
    const projects = [...content.projects];
    projects[index] = { ...projects[index], images };
    await persistContent(
      applySync({ ...content, projects }),
      "이미지가 저장되었습니다."
    );
  }

  async function handleAddProject() {
    if (!content) return;
    const newProject = createEmptyProject(content.projects.map((p) => p.id));
    const projects = [...content.projects, newProject];
    const next = applySync({ ...content, projects });
    setExpandedProjectId(newProject.id);
    await persistContent(next, "새 과제가 추가되었습니다.");
  }

  async function handleDeleteProject(index: number) {
    if (!content) return;
    const project = content.projects[index];
    const confirmed = window.confirm(
      `"${project.title}" 과제를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
    );
    if (!confirmed) return;

    const projects = content.projects.filter((_, i) => i !== index);
    const next = applySync({ ...content, projects });
    if (expandedProjectId === project.id) setExpandedProjectId(null);
    await persistContent(next, "과제가 삭제되었습니다.");
  }

  if (!content) {
    return <p className="text-[14px] text-muted">불러오는 중...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-main">콘텐츠 관리</h1>
          <p className="mt-1 text-[14px] text-muted">
            대시보드 숫자와 과제 내용을 수정할 수 있습니다.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg border border-border px-4 py-2 text-[14px] text-muted"
          >
            로그아웃
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-main px-5 py-2 text-[14px] font-medium text-white disabled:opacity-50"
          >
            {saving ? "저장 중..." : "저장하기"}
          </button>
        </div>
      </div>

      {message && (
        <p className="rounded-lg bg-surface px-4 py-3 text-[14px] text-main">
          {message}
        </p>
      )}

      <section className="space-y-4 rounded-xl border border-border bg-bg p-6">
        <h2 className="text-[18px] font-bold text-main">대시보드 문구</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="대시보드 제목">
            <input
              value={content.dashboardTitle}
              onChange={(e) =>
                setContent({ ...content, dashboardTitle: e.target.value })
              }
              className={inputClass}
            />
          </Field>
          <Field label="푸터 문구">
            <input
              value={content.footerText}
              onChange={(e) =>
                setContent({ ...content, footerText: e.target.value })
              }
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="대시보드 설명">
          <textarea
            value={content.dashboardDescription}
            onChange={(e) =>
              setContent({ ...content, dashboardDescription: e.target.value })
            }
            rows={2}
            className={inputClass}
          />
        </Field>
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-bg p-6">
        <h2 className="text-[18px] font-bold text-main">대시보드 통계</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="총 AX 과제 (자동)">
            <input
              type="number"
              value={content.dashboardStats.totalProjects}
              readOnly
              className={`${inputClass} bg-surface text-muted`}
            />
          </Field>
          <Field label="누적 절감 시간 (Impact 합계)">
            <input
              type="number"
              value={content.dashboardStats.totalTimeSaved}
              readOnly
              className={`${inputClass} bg-surface text-muted`}
            />
          </Field>
          <Field label="평균 효율 개선 (%)">
            <input
              type="number"
              value={content.dashboardStats.avgEfficiency}
              onChange={(e) =>
                setContent({
                  ...content,
                  dashboardStats: {
                    ...content.dashboardStats,
                    avgEfficiency: Number(e.target.value),
                  },
                })
              }
              className={inputClass}
            />
          </Field>
          <Field label="참여 계열사">
            <input
              type="number"
              value={content.dashboardStats.affiliates}
              onChange={(e) =>
                setContent({
                  ...content,
                  dashboardStats: {
                    ...content.dashboardStats,
                    affiliates: Number(e.target.value),
                  },
                })
              }
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-main">AX 과제</h2>
          <button
            type="button"
            onClick={handleAddProject}
            disabled={saving}
            className="rounded-lg border border-accent px-4 py-2 text-[14px] font-medium text-accent disabled:opacity-50"
          >
            + 과제 추가
          </button>
        </div>
        {content.projects.length === 0 && (
          <p className="rounded-lg border border-dashed border-border bg-surface px-4 py-8 text-center text-[14px] text-muted">
            등록된 과제가 없습니다. 과제 추가 버튼으로 새 카드를 만들어 주세요.
          </p>
        )}
        {content.projects.map((project, index) => (
          <ProjectEditor
            key={project.id}
            project={project}
            index={index}
            defaultOpen={project.id === expandedProjectId}
            onChange={(i, updated) => {
              const projects = [...content.projects];
              projects[i] = updated;
              setContent(applySync({ ...content, projects }));
            }}
            onImagesChange={handleImagesChange}
            onDelete={handleDeleteProject}
          />
        ))}
      </section>

      <div className="flex justify-end pb-8">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-main px-6 py-2.5 text-[14px] font-medium text-white disabled:opacity-50"
        >
          {saving ? "저장 중..." : "저장하기"}
        </button>
      </div>
    </div>
  );
}

export function AdminPanel() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((res) => res.json())
      .then((data) => setAuthenticated(data.authenticated));
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
  }

  if (authenticated === null) {
    return (
      <p className="py-20 text-center text-[14px] text-muted">확인 중...</p>
    );
  }

  return authenticated ? (
    <AdminEditor onLogout={handleLogout} />
  ) : (
    <LoginForm onSuccess={() => setAuthenticated(true)} />
  );
}
