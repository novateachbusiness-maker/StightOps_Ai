/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { SolutionsPage } from './pages/SolutionsPage.tsx';
import { SolutionDetailPage } from './pages/SolutionDetailPage.tsx';
import { IndustriesPage } from './pages/IndustriesPage.tsx';
import { IndustryDetailPage } from './pages/IndustryDetailPage.tsx';
import { TechnologiesPage } from './pages/TechnologiesPage.tsx';
import { ApplicationsPage } from './pages/ApplicationsPage.tsx';
import { ResourcesPage } from './pages/ResourcesPage.tsx';
import { ResourceDetailPage } from './pages/ResourceDetailPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#F4F8F8] text-[#172B32] antialiased">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Solutions */}
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
            
            {/* Industries */}
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/industries/:slug" element={<IndustryDetailPage />} />
            
            {/* Technologies */}
            <Route path="/technologies" element={<TechnologiesPage />} />
            
            {/* Applications */}
            <Route path="/applications" element={<ApplicationsPage />} />
            
            {/* Resources */}
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:slug" element={<ResourceDetailPage />} />
            
            {/* About & Contact */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* 404 Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
