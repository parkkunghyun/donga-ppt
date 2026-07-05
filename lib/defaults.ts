import type { DashboardStats, Project, SiteContent } from "./types";

export const defaultDashboardStats: DashboardStats = {
  totalProjects: 24,
  totalTimeSaved: 389.0,
  avgEfficiency: 68,
  affiliates: 12,
};

export const defaultProjects: Project[] = [
  {
    id: "admission-ai",
    title: "입학 원서 검토 AI 자동화",
    affiliate: "동아대학교",
    participants: "입학처 AX TF (김○○ 과장, 이○○ 주임)",
    summary:
      "지원자 서류 검토 및 적격 여부 판단을 AI가 1차 스크리닝하여 담당자 검토 시간을 대폭 단축했습니다.",
    problem:
      "입시 성수기마다 지원자 서류 검토 업무가 급증하여 담당자 1인당 과도한 업무 부담이 발생했습니다. 수작업 검토로 인한 처리 지연과 피로 누적이 주요 문제였습니다.",
    asIs: "담당자가 지원자 서류를 수작업으로 열람하고, 적격 기준을 일일이 대조하여 1인당 평균 45분 소요. 성수기에는 야근이 불가피했습니다.",
    toBe: "AI가 서류를 자동 분석하고 적격/부적격을 1차 분류. 담당자는 예외 케이스만 검토하여 1인당 12분으로 단축. 성수기에도 정시 퇴근이 가능해졌습니다.",
    aiApplication:
      "ChatGPT API로 서류 내용을 분석하고 적격 기준과 자동 대조. Python으로 일괄 처리 파이프라인을 구축하고, Google Sheets로 검토 결과를 실시간 공유합니다.",
    impactValue: 48,
    impactUnit: "시간",
    impactLabel: "연간 절감 (40% 절감)",
    impactQualitative:
      "담당자 업무 부담이 크게 줄어 성수기에도 안정적인 업무 운영이 가능해졌고, 지원자 응대 품질이 향상되었습니다.",
    images: [],
  },
  {
    id: "lecture-summary",
    title: "강의 영상 자동 요약 시스템",
    affiliate: "동아대학교",
    participants: "교육혁신원 디지털러닝팀 (박○○ 팀장, 최○○ 연구원)",
    summary:
      "녹화 강의를 AI가 자동 전사·요약하여 학습 자료와 복습 노트를 생성합니다.",
    problem:
      "비대면·혼합 수업 확대로 녹화 강의가 증가했으나, 교수자가 요약 자료와 자막을 직접 제작해야 하는 부담이 컸습니다. 학생 복습 자료 제공도 일관성이 부족했습니다.",
    asIs: "교수자가 강의 후 직접 요약 자료를 작성하고, 영상 자막을 수동으로 편집. 강의 1회당 평균 3시간 추가 작업이 필요했습니다.",
    toBe: "AI가 강의 영상을 자동 전사하고 핵심 내용을 요약. 교수자는 검토만 하면 되어 30분 이내로 완료. 학생 복습 자료도 자동 생성됩니다.",
    aiApplication:
      "Whisper로 강의 영상 음성을 텍스트로 전사하고, Claude API로 핵심 내용을 요약·구조화. Notion에 복습 노트를 자동 생성합니다.",
    impactValue: 85.5,
    impactUnit: "시간",
    impactLabel: "연간 절감 (85% 절감)",
    impactQualitative:
      "교수자의 자료 제작 부담이 줄고, 학생들의 복습 만족도와 학습 연속성이 개선되었습니다.",
    images: [],
  },
  {
    id: "research-grant",
    title: "연구비 정산 서류 AI 검증",
    affiliate: "동아대학교",
    participants: "산학협력단 연구지원팀 (정○○ 주임, 한○○ 사무원)",
    summary:
      "연구비 정산 서류의 누락·오류를 AI가 사전 검증하여 반려율을 크게 낮췄습니다.",
    problem:
      "연구비 정산 서류의 형식 오류와 누락 항목으로 반려가 빈번하게 발생했습니다. 연구자의 재제출 부담과 담당자의 반복 검토 업무가 지속되었습니다.",
    asIs: "연구자가 제출한 정산 서류를 담당자가 수동으로 대조·검증. 서류 오류로 인한 반려율 23%, 재제출 처리에 추가 2주 소요.",
    toBe: "제출 전 AI가 서류를 자동 검증하고 오류 항목을 즉시 안내. 반려율 9.7%로 감소, 1차 승인률이 91%로 향상되었습니다.",
    aiApplication:
      "GPT-4o로 정산 서류를 분석하고 내부 규정 DB(RAG)와 대조하여 누락·오류 항목을 사전 탐지합니다.",
    impactValue: 58.0,
    impactUnit: "시간",
    impactLabel: "연간 절감 (58% 절감)",
    impactQualitative:
      "연구자의 재제출 스트레스가 줄고, 담당자는 심사 품질 향상에 집중할 수 있게 되었습니다.",
    images: [],
  },
  {
    id: "student-counseling",
    title: "학생 상담 챗봇",
    affiliate: "동아대학교",
    participants: "학생지원처 상담팀 (윤○○ 대리, 서○○ 주임)",
    summary:
      "학사·장학·취업 관련 FAQ를 24시간 응답하는 AI 챗봇으로 상담 접수 부담을 줄였습니다.",
    problem:
      "학사·장학·취업 관련 단순 문의가 전화와 방문으로 집중되어 상담원이 반복 응대에 많은 시간을 소비했습니다. 비업무 시간 문의 대응도 어려웠습니다.",
    asIs: "학생들이 전화·방문으로 단순 문의를 접수. 상담원 3명이 반복 질문에 하루 평균 4시간을 소비했습니다.",
    toBe: "AI 챗봇이 FAQ 200여 건을 즉시 응답. 복잡한 상담은 담당자에게 자동 연결. 단순 문의 64%를 자동 처리 중입니다.",
    aiApplication:
      "Claude API 기반 챗봇으로 FAQ 데이터베이스를 학습. Supabase로 대화 이력을 관리하고, Next.js 웹 채널에 배포합니다.",
    impactValue: 64.0,
    impactUnit: "시간",
    impactLabel: "연간 절감 (64% 절감)",
    impactQualitative:
      "학생들은 즉각적인 응답을 받을 수 있게 되었고, 상담원은 심층 상담에 더 많은 시간을 할애할 수 있게 되었습니다.",
    images: [],
  },
  {
    id: "facility-inspection",
    title: "시설 점검 리포트 자동 생성",
    affiliate: "동아쏘시오홀딩스",
    participants: "시설관리팀 점검반 (강○○ 반장, 조○○ 점검원)",
    summary:
      "시설 점검 시 촬영한 사진과 메모를 AI가 분석하여 점검 리포트를 자동 작성합니다.",
    problem:
      "시설 점검 후 현장 사진과 메모를 바탕으로 사무실에서 리포트를 수작업 작성해야 했습니다. 건물 수가 많을수록 보고 지연이 발생했습니다.",
    asIs: "점검원이 현장에서 사진 촬영 후 사무실에서 Word 문서로 리포트를 수작업 작성. 건물 1동당 평균 2시간 소요.",
    toBe: "현장에서 사진·음성 메모를 입력하면 AI가 리포트 초안을 즉시 생성. 점검원은 확인·수정만 하여 25분 내 완료.",
    aiApplication:
      "GPT-4o Vision으로 현장 사진을 분석하고, 음성 메모를 텍스트로 변환하여 점검 리포트 초안을 자동 생성. SharePoint에 결과를 저장합니다.",
    impactValue: 78.0,
    impactUnit: "시간",
    impactLabel: "연간 절감 (78% 절감)",
    impactQualitative:
      "현장 점검 후 즉시 보고가 가능해져 의사결정 속도가 빨라지고, 점검 누락이 감소했습니다.",
    images: [],
  },
  {
    id: "hr-recruitment",
    title: "채용 서류 AI 스크리닝",
    affiliate: "동아제약",
    participants: "인사팀 채용담당 (임○○ 과장, 오○○ 대리)",
    summary:
      "지원자 이력서를 AI가 직무 적합도 기준으로 1차 평가하여 채용 프로세스를 효율화합니다.",
    problem:
      "채용 공고마다 대량의 지원 서류를 담당자가 개별 검토해야 했습니다. 1차 서류 전형에 과도한 시간이 소요되어 면접 준비 시간이 부족했습니다.",
    asIs: "채용 담당자 5명이 지원자 서류를 개별 검토. 공고 1건당 평균 40시간의 서류 검토 시간이 소요되었습니다.",
    toBe: "AI가 직무 기준에 따라 서류를 자동 평가·순위화. 담당자는 상위 30%만 집중 검토하여 18시간으로 단축.",
    aiApplication:
      "Claude API로 이력서를 분석하고 직무 적합도 기준에 따라 1차 평가·순위화. ATS 시스템과 연동하여 결과를 Excel로 출력합니다.",
    impactValue: 55.5,
    impactUnit: "시간",
    impactLabel: "연간 절감 (55% 절감)",
    impactQualitative:
      "채용 담당자가 우수 인재 발굴에 더 집중할 수 있게 되었고, 전형 공정성에 대한 내부 신뢰도가 높아졌습니다.",
    images: [],
  },
];

export const defaultContent: SiteContent = {
  dashboardStats: defaultDashboardStats,
  projects: defaultProjects,
  dashboardTitle: "AX 성과 대시보드",
  dashboardDescription:
    "대학 전체 AI 전환(AX) 과제의 누적 성과를 한눈에 확인하세요.",
  footerText: "본 AX 핸즈온은 포텐스닷과 함께 진행되었습니다.",
};
