import { useParams } from "react-router-dom";
import { Card } from "../../shared/ui/Card";

export function ClassroomPage(): JSX.Element {
  const { sessionId } = useParams();

  return (
    <div className="page-grid">
      <Card
        title="Classroom Sync Scaffold"
        subtitle="Realtime host controls, participant follow mode, and reconnection flow."
      >
        <p>
          Active classroom session: <strong>{sessionId}</strong>
        </p>
      </Card>
    </div>
  );
}

