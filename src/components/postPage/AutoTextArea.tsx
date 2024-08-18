import React, { useRef, useCallback, useEffect } from "react";
import "../../style/postPage/autoTextArea.css";
import { InputAreaProps } from "../../types/post";

const AutoTextArea: React.FC<InputAreaProps> = ({ onChange }) => {
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
      onInput={(e) => {
        TextareaAutoResize();
        if (onChange) onChange(e as React.ChangeEvent<HTMLTextAreaElement>);
      }}
      placeholder="내용을 입력하세요"
      className="textBox"
    />
  );
};

export default AutoTextArea;
