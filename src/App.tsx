import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LeadsPageWrapper } from "./pages/LeadsPage/components/leads-page-wrapper";
import { OpportunitiesPageWrapper } from "./pages/OpportunitiesPage/components/opportunities-page-wrapper";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Header } from "./components/shared/header";
import Footer from "./components/shared/footer";
import { useOpportunities } from "./modules/opportunities/hooks/useOpportunities";
import { useLeads } from "./modules/leads/hooks/useLeads";
import { useEffect } from "react";

function App() {
  const leadsData = useLeads();
  const opportunitiesData = useOpportunities();

  useEffect(() => {
    leadsData.handleGetLeads({ props: {} });
    opportunitiesData.handleGetOpportunities({ props: {} });
  }, []);

  return (
    <>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/leads/*"
            element={<LeadsPageWrapper {...leadsData} {...opportunitiesData} />}
          />
          <Route
            path="/opportunities/*"
            element={
              <OpportunitiesPageWrapper
                {...opportunitiesData}
                handleAddOpportunity={opportunitiesData.handleAddOpportunity}
                handleUpdateOpportunity={
                  opportunitiesData.handleUpdateOpportunity
                }
              />
            }
          />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Footer />
      </>
    </>
  );
}

export default App;
