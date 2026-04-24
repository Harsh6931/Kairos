import { Card } from "../../shared/ui/Card";

export function ChallengePage(): JSX.Element {
  return (
    <div className="page-grid">
      <Card
        title="Challenge Mode Scaffold"
        subtitle="Predict-next-step gameplay and scoring hooks will connect here."
      >
        <ul className="plain-list">
          <li>Question engine for step predictions</li>
          <li>Hints + feedback panel</li>
          <li>Score persistence and mastery progress</li>
        </ul>
      </Card>
    </div>
  );
}

