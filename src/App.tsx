import { LeadsPage } from "./pages/LeadsPage";
import { Header } from "./components/shared/header";
import { useState } from "react";
import { OpportunitiesPage } from "./pages/OpportunitiesPage";

function App() {
  const [currentView, setCurrentView] = useState<"leads" | "opportunities">(
    "leads",
  );

  return (
    <>
      <Header currentView={currentView} onViewChange={setCurrentView} />
      {currentView === "leads" ? <LeadsPage /> : <OpportunitiesPage />}
    </>
  );
}

export default App;
