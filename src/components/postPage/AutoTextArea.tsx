import React, { useRef, useCallback, useEffect } from "react";
import "../../style/postPage/autoTextArea.css";

const AutoTextArea: React.FC = () => {
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const TextareaAutoResize = useCallback(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    TextareaAutoResize();
  }, [TextareaAutoResize]);

  return (
    <textarea
      ref={textRef}
      onInput={TextareaAutoResize}
      placeholder="내용을 입력하세요"
      className="textBox"
    />
  );
};

export default AutoTextArea;
