import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

function App() {
  const MainPage = lazy(() => import("./pages/MainPage.tsx"));
  const RegisterPage = lazy(() => import("./pages/RegisterPage.tsx"));
  const RegisterPage2 = lazy(() => import("./pages/RegisterPage2.tsx"));
  // const EmailVerify = lazy(() = >import("./pages/EmailVerify.tsx"))
  const PasswordResetPage = lazy(() => import("./pages/PasswordResetPage.tsx"));

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" Component={MainPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/register2" Component={RegisterPage2} />
          {/* <Route path="/emailVerify" Component={EmailVerify} /> */}
          <Route path="/passwordReset" Component={PasswordResetPage} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
