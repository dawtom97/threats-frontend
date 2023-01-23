import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddThreat from "../views/AddThreat";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import EditThreat from "../views/EditThreat";

export const AppRouter = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/add-threat" element={<AddThreat />} />
         <Route path="/threat/:id" element={<EditThreat />} />
      {/* { <Route path="/admin/add-post" element={user?.result?._id === process.env.REACT_APP_ADMIN_ID ?<AddPostView /> : <Navigate to="/"/>} /> */} 
      </Routes>
    </BrowserRouter>
  );
};
