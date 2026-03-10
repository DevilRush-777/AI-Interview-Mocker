
import React from 'react'
import Header from './__components/Header';

function DashboardLayout({children}) {
   return (
    <div>
      <Header/>
      {children}
    </div>
  );
}

export default DashboardLayout