import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MultilineText } from "@/components/multiline-text";
import { ProjectCard } from "@/components/project-card";
import { StatCard } from "@/components/stat-card";
import {
  IconChart,
  IconClock,
  IconTrending,
} from "@/components/icons";
import { getContent } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { dashboardStats, projects, dashboardTitle, dashboardDescription, footerText } =
    await getContent();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <section className="mb-12">
          <h2 className="mb-2 text-[28px] font-bold text-main">
            {dashboardTitle}
          </h2>
          <MultilineText className="text-[14px] text-muted">
            {dashboardDescription}
          </MultilineText>
        </section>

        <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="총 AX 과제"
            value={dashboardStats.totalProjects}
            suffix="건"
            icon={<IconChart size={20} />}
          />
          <StatCard
            label="누적 절감 시간"
            value={dashboardStats.totalTimeSaved}
            suffix="시간"
            decimals={1}
            icon={<IconClock size={20} />}
          />
          <StatCard
            label="평균 효율 개선"
            value={dashboardStats.avgEfficiency}
            suffix="%"
            icon={<IconTrending size={20} />}
          />
        </section>

        <section>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-[24px] font-bold text-main">AX 과제 목록</h2>
              <p className="mt-1 text-[13px] text-muted">
                총 {projects.length}건의 과제가 등록되어 있습니다.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>

      <Footer text={footerText} />
    </>
  );
}
