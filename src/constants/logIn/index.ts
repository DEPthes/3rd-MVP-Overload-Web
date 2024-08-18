export const constants = { 
    // ALT용
    logoAltText: "DEPth",
    eyeAltText: "Toggle visibility",
    autoLoginBoxAltText: "auto login checkbox",
    
    // 이메일 관련 및 에러 
    emailLabel: "이메일 주소",
    emailPlaceholder: "예) abcd@gmail.com",
    submitButtonText: "인증링크 발송하기",
    sendMailButtonText: "인증 메일 전송",
    invalidEmailError: "이메일 주소 형식이 맞지 않습니다.",
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    emailCheckButtonText: "중복 확인",
    emailAvailableMessage: "사용 가능한 이메일입니다.",
    emailNotAvailableMessage: "사용 불가능한 이메일입니다.",
    emailCheckErrorMessage: "이메일 중복 확인 중 오류가 발생했습니다.",
    emailCheckRequiredMessage: "이메일 중복 확인이 필요합니다.",

    // 회원가입 관련 및 에러
    registerTitle: "회원가입",
    registerSubtitle: "메일 계정 인증 및 승인 이후 추가 회원가입이 완료됩니다.",
    passwordLabel: "비밀번호",
    confirmPasswordLabel: "비밀번호 확인",
    passwordPlaceholder: "영문, 숫자(8~20자)",
    passwordError: "영문, 숫자 포함 (8~20자)로 작성해주세요.",
    confirmPasswordError: "비밀번호가 일치하지 않습니다.",
    passwordPattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
    nameLabel: "이름",
    namePlaceholder: "본명을 입력해주세요.",
    partLabel: "파트",
    partPlaceholder: "파트를 선택해주세요.",
    countLabel: "기수",
    countPlaceholder: "0",
    partOptions: ["기획", "디자인", "웹", "안드로이드", "서버"],
    countError: "처음 DEPth에 가입한 기수를 입력해주세요.",
    noName: "이름을 입력하세요.",
    noPart: "부서를 선택하세요.",
    noCount: "기수를 입력하세요.",

    // 버튼
    cancelButtonText: "취소",
    nextButtonText: "다음",
    previousButtonText: "이전",
    verifyCompleteButttonText: "인증완료",
    
    // 비밀번호 재설정 페이지용
    resetSuccessMessage: "비밀번호 변경 완료",
    loginRedirectButtonText: "로그인 화면으로 이동",
    changePasswordTitle: "비밀번호 변경",
    newPasswordLabel: "새 비밀번호",
    newPasswordConfirmLabel: "새 비밀번호 확인",

    // 이메일 인증 및 에러 메시지
    verifyEmailTitle: "인증 메일 전송",
    verifyEmailSubtitle: "으로 가입 인증 메일을 전송하였습니다.",
    verifyEmailSubtitle2: "메일함을 확인하시고, 인증을 완료해 주세요.",
    verifyCompleteMessage: "메일함의 링크 클릭 후 완료 버튼을 눌러주세요.",
    resendEmailButtonText: "인증 메일 다시 받기",
    emailSuccessMessage: "이메일 인증 완료",
    emailFailMessage: "이메일 인증 실패. 다시 시도하세요.",
    emailSuccessMessageSub: "회원가입 승인 요청중",
    sendMailError: "메일 전송 중 오류가 발생했습니다.",
    verifyErrorMessage: "인증 중 오류가 발생했습니다.",
    resendMailErrorMessage: "메일 재전송 중 오류가 발생했습니다.",

    // 로그인 관련 메시지
    loginTitle: "로그인",
    autoLoginText: "자동로그인",
    capsLockWarning: "CapsLock이 켜져 있어요.",
    loginSuccessMessage: "로그인 성공!",
    IdOrPasswordError: "아이디 또는 비밀번호가 잘못되었습니다.",

    // 기타
    passwordResetLinkText: "비밀번호 재설정",
    registerLinkText: "회원가입",
    goHome: "홈으로 이동",
    searchMent: "검색어를 입력해주세요.",
    searchResultMent: "검색 결과가 없습니다."
};
