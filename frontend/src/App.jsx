import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import ProcessPage from "@/pages/ProcessPage";
import EntrepreneurLoanPage from "@/pages/EntrepreneurLoanPage";
import CalculatorPage from "@/pages/CalculatorPage";
import ContactPage from "@/pages/ContactPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/process" replace />} />
        <Route element={<SiteLayout />}>
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/entrepreneur-loan" element={<EntrepreneurLoanPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
