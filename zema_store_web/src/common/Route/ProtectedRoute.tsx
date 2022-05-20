import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux_hooks";
import { authSelector, login } from "../../app/store/features/auth/authSlice";
import { useEffect } from "react";
import AuthService from "../../app/services/auth.service";

type Props = {
  redirectPath: string;
  children: JSX.Element;
};

const ProtectedRoute = ({ children, redirectPath }: Props) => {
  const { isAuthenticated } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      if (AuthService.isAuthenticated()) {
        dispatch(
          login({
            token: AuthService.getAccessToken(),
            user: AuthService.getProfile(),
          })
        );
      }
    } else {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate
        to="/signin"
        state={{ from: { pathname: redirectPath } }}
        replace
      />
    );
  }

  return children && children;
};

export default ProtectedRoute;
