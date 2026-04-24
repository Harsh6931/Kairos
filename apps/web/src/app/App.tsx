import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./providers/AppProviders";
import { AppRoutes } from "./router/routes";
import { AppShell } from "../shared/layout/AppShell";

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </AppProviders>
    </BrowserRouter>
  );
}

