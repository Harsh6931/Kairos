import { useParams } from "react-router-dom";
import { Card } from "../../shared/ui/Card";

export function ReplayPage(): JSX.Element {
  const { shareId } = useParams();

  return (
    <div className="page-grid">
      <Card
        title="Replay Studio Scaffold"
        subtitle="Deep-linkable run sessions and annotations."
      >
        <p>
          Loaded replay id: <strong>{shareId}</strong>
        </p>
      </Card>
    </div>
  );
}

