import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { AsIsToBeBox } from "@/components/asis-tobe-box";
import { Button } from "@/components/button";
import { ImpactDisplay } from "@/components/impact-display";
import { DetailSection } from "@/components/detail-section";
import { Footer } from "@/components/footer";
import { MultilineText } from "@/components/multiline-text";
import { ProjectGallery } from "@/components/project-gallery";
import { IconArrowLeft } from "@/components/icons";
import { getContent, getProjectById } from "@/lib/data";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: "과제를 찾을 수 없습니다" };
  return {
    title: `${project.title} | AX 성과 공유`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [project, content] = await Promise.all([
    getProjectById(id),
    getContent(),
  ]);

  if (!project) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <div className="mb-6">
          <Button href="/" variant="outline">
            <IconArrowLeft size={16} />
            목록으로
          </Button>
        </div>

        <div className="space-y-10 bg-bg">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-surface px-2.5 py-1 text-[11px] text-muted">
                {project.affiliate}
              </span>
            </div>

            <h1 className="mb-3 text-[26px] font-bold leading-tight text-main">
              {project.title}
            </h1>
            {project.summary && (
              <MultilineText className="mb-3 text-[14px] leading-relaxed text-text">
                {project.summary}
              </MultilineText>
            )}
            {project.participants && (
              <p className="text-[13px] text-muted">
                <span className="font-medium text-text">담당</span>{" "}
                {project.participants}
              </p>
            )}
          </div>

          <DetailSection title="문제 상황">
            <MultilineText className="text-[14px] leading-relaxed text-text">
              {project.problem}
            </MultilineText>
          </DetailSection>

          <section>
            <h2 className="mb-4 text-[20px] font-bold text-main">
              AS-IS / TO-BE
            </h2>
            <AsIsToBeBox asIs={project.asIs} toBe={project.toBe} />
          </section>

          <DetailSection title="Impact (정량적)">
            <ImpactDisplay
              value={project.impactValue}
              label={project.impactLabel}
            />
          </DetailSection>

          {project.impactQualitative && (
            <DetailSection title="Impact (정성적)">
              <MultilineText className="text-[14px] leading-relaxed text-text">
                {project.impactQualitative}
              </MultilineText>
            </DetailSection>
          )}

          <ProjectGallery images={project.images ?? []} title={project.title} />
        </div>
      </main>

      <Footer text={content.footerText} />
    </>
  );
}
