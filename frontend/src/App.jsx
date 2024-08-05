import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateCheck from "./pages/CreateCheck";
import ShowCheck from "./pages/ShowCheck";
import EditCheck from "./pages/EditCheck";
import DeleteCheck from "./pages/DeleteCheck";
import Dashboard from "./pages/Dashboard";
import Summary from "./pages/Summary";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checks/create" element={<CreateCheck />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/dashboard/:user" element={<Dashboard />} />
      <Route path="/checks/details/:id" element={<ShowCheck />} />
      <Route path="/checks/edit/:id" element={<EditCheck />} />
      <Route path="/checks/delete/:id" element={<DeleteCheck />} />
    </Routes>
  );
};

export default App;
