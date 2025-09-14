import { Routes, Route, Navigate } from "react-router-dom";
import { LeadsPageWrapper } from "./pages/LeadsPage/components/leads-page-wrapper";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Header } from "./components/shared/header";
import { OpportunitiesPage } from "./pages/OpportunitiesPage";
import Footer from "./components/shared/footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/leads" replace />} />
        <Route path="/leads" element={<LeadsPageWrapper />} />
        <Route path="/leads/edit/:id" element={<LeadsPageWrapper />} />
        <Route path="/leads/details/:id" element={<LeadsPageWrapper />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
