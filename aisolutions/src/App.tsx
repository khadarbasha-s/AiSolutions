import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { StudioLayout } from "@/components/layout/StudioLayout";
import { FullPageLoader } from "@/components/layout/FullPageLoader";
import { studioBuild } from "@/data/studioNav";

// Public website
const Home = lazy(() => import("@/pages/site/Home"));
const Platform = lazy(() => import("@/pages/site/Platform"));
const AiCapabilities = lazy(() => import("@/pages/site/AiCapabilities"));
const Solutions = lazy(() => import("@/pages/site/Solutions"));
const Industry = lazy(() => import("@/pages/site/Industry"));
const UseCases = lazy(() => import("@/pages/site/UseCases"));
const Pricing = lazy(() => import("@/pages/site/Pricing"));
const Docs = lazy(() => import("@/pages/site/Docs"));
const About = lazy(() => import("@/pages/site/About"));
const Contact = lazy(() => import("@/pages/site/Contact"));
const NotFound = lazy(() => import("@/pages/site/NotFound"));

// Authentication
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));

// AI Application Studio
const Dashboard = lazy(() => import("@/pages/studio/Dashboard"));
const CreateApplication = lazy(() => import("@/pages/studio/CreateApplication"));
const ProjectDetail = lazy(() => import("@/pages/studio/ProjectDetail"));
const Settings = lazy(() => import("@/pages/studio/Settings"));
const ComingSoon = lazy(() => import("@/pages/studio/ComingSoon"));

export default function App() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="platform" element={<Platform />} />
          <Route path="ai-capabilities" element={<AiCapabilities />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="solutions/:industry" element={<Industry />} />
          <Route path="use-cases" element={<UseCases />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="docs" element={<Docs />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="studio" element={<StudioLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="new" element={<CreateApplication />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="settings" element={<Settings />} />
          {studioBuild.map((item) => (
            <Route key={item.to} path={item.to.replace("/studio/", "")} element={<ComingSoon item={item} />} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
}
