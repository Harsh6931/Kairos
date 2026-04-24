import { Card } from "../../shared/ui/Card";

export function ProfilePage(): JSX.Element {
  return (
    <div className="page-grid">
      <Card
        title="Profile and Progress Scaffold"
        subtitle="Personalized learning stats and achievement system entry point."
      >
        <ul className="plain-list">
          <li>Mastery by algorithm family</li>
          <li>Recent runs and saved replays</li>
          <li>Badge timeline and streak tracking</li>
        </ul>
      </Card>
    </div>
  );
}

