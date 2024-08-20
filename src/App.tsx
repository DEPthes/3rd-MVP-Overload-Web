import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditPage from "./pages/EditPage.tsx";

// 페이지 컴포넌트들을 lazy 로딩
const MainPage = lazy(() => import("./pages/MainPage.tsx"));
const ViewDetailPost = lazy(() => import("./pages/ViewDetailPostPage.tsx"));
const RegisterPage = lazy(() => import("./pages/register/RegisterPage.tsx"));
const RegisterPage2 = lazy(() => import("./pages/register/RegisterPage2.tsx"));
const RegisterEmailVerify = lazy(
  () => import("./pages/register/RegisterEmailVerify.tsx")
);
const ChangingPassword = lazy(
  () => import("./pages/passwordReset/ChangingPassword.tsx")
);
const PasswordResetMailEnter = lazy(
  () => import("./pages/passwordReset/ResetEmailEnterPage.tsx")
);
const PasswordResetMailCheck = lazy(
  () => import("./pages/passwordReset/ResetEmailCheck.tsx")
);
const LogInPage = lazy(() => import("./pages/logIn/LoginPage.tsx"));
const ResetSuccess = lazy(
  () => import("./pages/passwordReset/ResetSuccess.tsx")
);
const EmailSuccess = lazy(() => import("./pages/register/EmailSuccess.tsx"));
const SearchResults = lazy(() => import("./pages/search/SearchResult.tsx"));
const PostPage = lazy(() => import("./pages/post/PostPage.tsx"));
const editPage = lazy(() => import("./pages/EditPage.tsx"));
const AvatarPage = lazy(() => import("./pages/avatar/AvatarPage.tsx"));
const MyPage = lazy(() => import("./pages/myPage/MyPage.tsx"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/viewDetailPost/:postId"
              element={<ViewDetailPost />}
            />
            <Route
              path="/editPage/:postId"
              element={<EditPage/>}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register2" element={<RegisterPage2 />} />
            <Route
              path="/registerEmailVerify"
              element={<RegisterEmailVerify />}
            />
            <Route path="/changingPassword" element={<ChangingPassword />} />
            <Route
              path="/passResetEmail"
              element={<PasswordResetMailEnter />}
            />
            <Route
              path="/passResetEmailCheck"
              element={<PasswordResetMailCheck />}
            />
            <Route path="/logIn" element={<LogInPage />} />
            <Route path="/passResetSuccess" element={<ResetSuccess />} />
            <Route path="/emailSuccess" element={<EmailSuccess />} />
            <Route path="/searchResults" element={<SearchResults />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/avatar" element={<AvatarPage />} />
            <Route path="/myPage" element={<MyPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
