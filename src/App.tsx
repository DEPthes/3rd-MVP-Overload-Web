import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

function App() {
  const MainPage = lazy(() => import("./pages/MainPage.tsx"));
  const ViewDetailPost = lazy(() => import("./pages/ViewDetailPostPage.tsx"));
  const RegisterPage = lazy(() => import("./pages/RegisterPage.tsx"));
  const RegisterPage2 = lazy(() => import("./pages/RegisterPage2.tsx"));
  const EmailVerify = lazy(() => import("./pages/EmailVerify.tsx"));
  const ChangingPassword = lazy(() => import("./pages/ChangingPassword.tsx"));
  const PasswordResetPage = lazy(() => import("./pages/PasswordResetPage.tsx"));
  const LogInPage = lazy(() => import("./pages/LoginPage.tsx"));
  const ResetSuccess = lazy(() => import("./pages/ResetSuccess.tsx"));
  const EmailSuccess = lazy(() => import("./pages/EmailSuccess.tsx"));
  const SearchResults = lazy(() => import("./pages/SearchResult.tsx"));
  const PostPage = lazy(() => import("./pages/post/PostPage.tsx"));
  const AvatarPage = lazy(() => import("./pages/avatar/AvatarPage.tsx"));
  const MyPage = lazy(() => import("./pages/mypage/MyPage.tsx"));

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" Component={MainPage} />
          <Route path="/viewDetailPost/:postId" Component={ViewDetailPost} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/register2" Component={RegisterPage2} />
          <Route path="/emailVerify" Component={EmailVerify} />
          <Route path="/changingPassword" Component={ChangingPassword} />
          <Route path="/passwordResetMail" Component={PasswordResetPage} />
          <Route path="/logIn" Component={LogInPage} />
          <Route path="/passwordResetSuccess" Component={ResetSuccess} />
          <Route path="/emailSuccess" Component={EmailSuccess} />
          <Route path="searchResults" Component={SearchResults} />
          <Route path="/post" Component={PostPage} />
          <Route path="/avatar" Component={AvatarPage} />
          <Route path="/myPage" Component={MyPage} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
