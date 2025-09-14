import { Routes, Route, Navigate } from "react-router-dom";
import { LeadsPage } from "./pages/LeadsPage";
import { Header } from "./components/shared/header";
import { OpportunitiesPage } from "./pages/OpportunitiesPage";
import Footer from "./components/shared/footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/leads" replace />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
