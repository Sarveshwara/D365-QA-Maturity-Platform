import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import ProgramDashboard from "./components/dashboards/ProgramDashboard";
import ExecutiveDashboard from "./components/dashboards/ExecutiveDashboard";
import QAMaturityDashboard from "./components/dashboards/QAMaturityDashboard";
import DevOpsMaturityDashboard from "./components/dashboards/DevOpsMaturityDashboard";
import SuccessByDesignDashboard from "./components/dashboards/SuccessByDesignDashboard";
import BenchmarkingDashboard from "./components/dashboards/BenchmarkingDashboard";
import DefectIntelligenceDashboard from "./components/dashboards/DefectIntelligenceDashboard";
import AssessmentWizard from "./components/assessments/AssessmentWizard";
import DomainSelection from "./components/assessments/DomainSelection";
import Questionnaire from "./components/assessments/Questionnaire";
import AssessmentReview from "./components/assessments/AssessmentReview";
import AssessmentResults from "./components/assessments/AssessmentResults";
import ArtifactUpload from "./components/artifacts/ArtifactUpload";
import ArtifactIntegration from "./components/artifacts/ArtifactIntegration";
import ArtifactProcessingStatus from "./components/artifacts/ArtifactProcessingStatus";
import TraceabilityGraph from "./components/intelligence/TraceabilityGraph";
import TestIntelligenceWorkspace from "./components/intelligence/TestIntelligenceWorkspace";
import GeneratedTestViewer from "./components/intelligence/GeneratedTestViewer";
import TestImpactAnalysis from "./components/intelligence/TestImpactAnalysis";
import RecommendationsCenter from "./components/reports/RecommendationsCenter";
import ReportGenerator from "./components/reports/ReportGenerator";
import UserRoleManagement from "./components/admin/UserRoleManagement";
import PlatformSettings from "./components/admin/PlatformSettings";
import NotificationCenter from "./components/admin/NotificationCenter";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: ProgramDashboard },
      { path: "executive", Component: ExecutiveDashboard },
      { path: "qa-maturity", Component: QAMaturityDashboard },
      { path: "devops-maturity", Component: DevOpsMaturityDashboard },
      { path: "success-by-design", Component: SuccessByDesignDashboard },
      { path: "benchmarking", Component: BenchmarkingDashboard },
      { path: "defect-intelligence", Component: DefectIntelligenceDashboard },
      { path: "assessment/wizard", Component: AssessmentWizard },
      { path: "assessment/domain-selection", Component: DomainSelection },
      { path: "assessment/questionnaire", Component: Questionnaire },
      { path: "assessment/review", Component: AssessmentReview },
      { path: "assessment/results", Component: AssessmentResults },
      { path: "artifacts/upload", Component: ArtifactUpload },
      { path: "artifacts/integration", Component: ArtifactIntegration },
      { path: "artifacts/status", Component: ArtifactProcessingStatus },
      { path: "intelligence/traceability", Component: TraceabilityGraph },
      { path: "intelligence/test-workspace", Component: TestIntelligenceWorkspace },
      { path: "intelligence/generated-tests", Component: GeneratedTestViewer },
      { path: "intelligence/test-impact", Component: TestImpactAnalysis },
      { path: "reports/recommendations", Component: RecommendationsCenter },
      { path: "reports/generator", Component: ReportGenerator },
      { path: "admin/users", Component: UserRoleManagement },
      { path: "admin/settings", Component: PlatformSettings },
      { path: "admin/notifications", Component: NotificationCenter },
    ],
  },
]);