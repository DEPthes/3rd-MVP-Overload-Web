import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

function App() {
  const MainPage = lazy(() => import("./pages/MainPage.tsx"));
  const ViewDetailPost = lazy(() => import("./pages/ViewDetailPostPage.tsx"));
  const RegisterPage = lazy(() => import("./pages/RegisterPage.tsx"));
  const RegisterPage2 = lazy(() => import("./pages/RegisterPage2.tsx"));
  const RegisterEmailVerify = lazy(() => import("./pages/RegisterEmailVerify.tsx"));
  const ChangingPassword = lazy(() => import("./pages/ChangingPassword.tsx"));
  const PasswordResetMailEnter = lazy(() => import("./pages/ResetEmailEnterPage.tsx"));
  const PasswordResetMailCheck = lazy(() => import("./pages/ResetEmailCheck.tsx"));
  const LogInPage = lazy(() => import("./pages/LoginPage.tsx"));
  const ResetSuccess = lazy(() => import("./pages/ResetSuccess.tsx"));
  const EmailSuccess = lazy(() => import("./pages/EmailSuccess.tsx"));
  const SearchResults = lazy(() => import("./pages/SearchResult.tsx"));
  const PostPage = lazy(() => import("./pages/post/PostPage.tsx"));

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" Component={MainPage} />
          <Route path="/viewDetailPost/:id" Component={ViewDetailPost} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/register2" Component={RegisterPage2} />
          <Route path="/registerEmailVerify" Component={RegisterEmailVerify} />
          <Route path="/changingPassword" Component={ChangingPassword} />
          <Route path="/passResetEmail" Component={PasswordResetMailEnter} />
          <Route path="/passResetEmailCheck" Component={PasswordResetMailCheck} />
          <Route path="/logIn" Component={LogInPage} />
          <Route path="/passResetSuccess" Component={ResetSuccess} />
          <Route path="/emailSuccess" Component={EmailSuccess} />
          <Route path="/searchResults" Component={SearchResults} />
          <Route path="/post" Component={PostPage} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
