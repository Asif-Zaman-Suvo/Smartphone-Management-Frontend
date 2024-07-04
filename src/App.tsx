import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { selectCurrentUser } from "./redux/features/auth/authSlice";
import { useAppSelector } from "./redux/hooks";

function App() {
  const userRole = useAppSelector(selectCurrentUser);
  return (
    <ProtectedRoute roles={["superAdmin", "manager", "seller"]}>
      <MainLayout userRole={userRole} />
    </ProtectedRoute>
  );
}

export default App;
