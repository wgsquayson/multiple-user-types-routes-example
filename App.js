import React from 'react';

import { AuthProvider } from "./src/context/auth";
import Routes from "./src/routes";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

