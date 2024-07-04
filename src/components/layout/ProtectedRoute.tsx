import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  TRole,
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  roles,
}: {
  children: ReactNode;
  roles: TRole[];
}) => {
  const token = useAppSelector(useCurrentToken);
  const userRole = useAppSelector(selectCurrentUser);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!userRole || !roles.includes(userRole?.role)) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
