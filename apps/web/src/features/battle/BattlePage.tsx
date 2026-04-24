import { Card } from "../../shared/ui/Card";

export function BattlePage(): JSX.Element {
  return (
    <div className="page-grid">
      <Card
        title="Battle Arena Scaffold"
        subtitle="Synchronized multi-algorithm comparison lane UI starts here."
      >
        <ul className="plain-list">
          <li>Shared input generator for all lanes</li>
          <li>Lane-level metric cards and race summary</li>
          <li>Synchronized timeline scrub across algorithms</li>
        </ul>
      </Card>
    </div>
  );
}

