import React, { useRef, useCallback, useEffect, useState } from "react";
import "../../style/postPage/autoTextArea.css";
import { InputAreaProps } from "../../types/post";
import { AddImageButtonSvg } from "../../assets";
import { postImage } from "../../api/post/post";

const AutoTextArea: React.FC<InputAreaProps> = ({ value, onChange }) => {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [buttonPosition, setButtonPosition] = useState<number>(0);
  const [textareaValue, setTextareaValue] = useState<string>(value||"");

  const TextareaAutoResize = useCallback(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      const newHeight = textRef.current.scrollHeight;
      textRef.current.style.height = `${newHeight}px`;
      setButtonPosition(newHeight - 520);
    }
  }, []);

  useEffect(() => {
    setTextareaValue(value||"");
  }, [value]);

  useEffect(() => {
    TextareaAutoResize();
  }, [TextareaAutoResize, textareaValue]);

  const handleImageUpload = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*"; // 이미지 파일만 선택할 수 있도록 제한

    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (file) {
        try {
          const response = await postImage({ image: file });
          const imageUrl = response.data.fileUrl;
          const markdownImage = `![이미지이름](${imageUrl})`;

          // 텍스트 에어리어에 이미지 URL 추가
          setTextareaValue((prevValue) => `${prevValue}\n${markdownImage}`);

          console.log("Uploaded Image URL:", imageUrl);
        } catch (error) {
          // 업로드 실패 시 에러 출력
          console.error("Error uploading image:", error);
        }
      }
    };

    fileInput.click();
  };

  return (
    <div className="autoTextAreaContainer">
      <AddImageButtonSvg
        style={{ top: `${buttonPosition}px`, cursor: "pointer" }}
        onClick={handleImageUpload}
      />
      <textarea
        ref={textRef}
        value={textareaValue}
        onChange={(e) => {
          setTextareaValue(e.target.value);
          TextareaAutoResize();
          if (onChange) onChange(e as React.ChangeEvent<HTMLTextAreaElement>);
        }}
        placeholder="내용을 입력하세요"
        className="textBox"
      />
    </div>
  );
};

export default AutoTextArea;
