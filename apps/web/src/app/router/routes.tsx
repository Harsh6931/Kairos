import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import { VisualizerPage } from "../../features/visualizer/VisualizerPage";
import { BattlePage } from "../../features/battle/BattlePage";
import { ChallengePage } from "../../features/challenge/ChallengePage";
import { ReplayPage } from "../../features/replay/ReplayPage";
import { ProfilePage } from "../../features/profile/ProfilePage";
import { ClassroomPage } from "../../features/classroom/ClassroomPage";

export type NavRoute = {
  label: string;
  emoji: string;
  path: string;
};

export const navRoutes: NavRoute[] = [
  { label: "Home", emoji: "\u{1F3E0}", path: "/" },
  { label: "Visualizer", emoji: "\u{1F9EA}", path: "/visualize/quick-sort" },
  { label: "Battle Arena", emoji: "\u2694\uFE0F", path: "/battle" },
  { label: "Challenge", emoji: "\u{1F3AF}", path: "/challenge" },
  { label: "Replay Studio", emoji: "\u{1F3AC}", path: "/replay/demo" },
  { label: "Profile", emoji: "\u{1F3C6}", path: "/profile" },
  { label: "Classroom", emoji: "\u{1F465}", path: "/classroom/live" }
];

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/visualize/:algorithmId" element={<VisualizerPage />} />
      <Route path="/battle" element={<BattlePage />} />
      <Route path="/challenge" element={<ChallengePage />} />
      <Route path="/replay/:shareId" element={<ReplayPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/classroom/:sessionId" element={<ClassroomPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

