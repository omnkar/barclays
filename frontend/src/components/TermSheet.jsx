import React, { useState } from 'react';

const TermSheet = () => {
  // Example term sheets data
  const [termSheets] = useState([
    {
      id: 1,
      title: 'Term Sheet 1 - Investment Agreement',
      uploadDate: '2025-03-15',
      description: 'This is a term sheet for an investment agreement between parties.',
      link: '#',
    },
    {
      id: 2,
      title: 'Term Sheet 2 - Loan Agreement',
      uploadDate: '2025-03-10',
      description: 'This term sheet outlines the conditions of a loan agreement.',
      link: '#',
    },
    {
      id: 3,
      title: 'Term Sheet 3 - Share Purchase Agreement',
      uploadDate: '2025-03-05',
      description: 'This term sheet details the terms of a share purchase agreement.',
      link: '#',
    },
  ]);

  return (
    <div className="term-sheet">
      <h3>Recently Uploaded Term Sheets</h3>
      <div className="term-sheets-list">
        <ul>
          {termSheets.map((termSheet) => (
            <li key={termSheet.id} className="term-sheet-item">
              <div className="term-sheet-title">
                <strong>{termSheet.title}</strong>
              </div>
              <div className="term-sheet-date">
                <strong>Uploaded on: </strong>{termSheet.uploadDate}
              </div>
              <div className="term-sheet-description">
                {termSheet.description}
              </div>
              <div className="term-sheet-actions">
                <a href={termSheet.link} className="view-link">
                  View/Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TermSheet;
