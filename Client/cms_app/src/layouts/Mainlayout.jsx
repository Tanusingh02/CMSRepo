import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';


const MainLayout = ({ title, children }) => {
  useEffect(() => {
    const highlightKeyword = (keyword) => {
      const elements = document.querySelectorAll('.searchable');
      const regex = new RegExp(`(${keyword})`, 'gi');

      elements.forEach(el => {
        const originalText = el.textContent;
        if (regex.test(originalText)) {
          el.innerHTML = originalText.replace(regex, '<span class="highlight">$1</span>');
        }
      });
    };

    const clearHighlights = () => {
      const highlighted = document.querySelectorAll('.highlight');
      highlighted.forEach(span => {
        span.outerHTML = span.innerText;
      });
    };

    const handleSearch = (e) => {
      clearHighlights();
      if (e.detail) highlightKeyword(e.detail);
    };

    window.addEventListener("searchKeyword", handleSearch);
    return () => window.removeEventListener("searchKeyword", handleSearch);
  }, []);

  return (
    
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <div className="container-fluid">
        <div className="row flex-column flex-md-row">
          <aside className="col-12 col-md-4 mb-3 mb-md-0">
            <Sidebar />
          </aside>
          <main className="col-12 col-md-8">
            {title && <h1 className="page-title">{title}</h1>}
            {children}
          </main>
        </div>
      </div>
      <footer className="footer">
        <div>Copyright 2017, All Rights Reserved</div>
      </footer>
    </div>
    
  );
};

export default MainLayout;
