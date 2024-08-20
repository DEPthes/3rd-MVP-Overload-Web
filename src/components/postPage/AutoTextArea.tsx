import React, { useRef, useCallback, useEffect, useState } from "react";
import "../../style/postPage/autoTextArea.css";
import { InputAreaProps } from "../../types/post";
import { AddImageButtonSvg } from "../../assets";
import { postImage } from "../../api/post/post";

const AutoTextArea: React.FC<InputAreaProps> = ({ onChange }) => {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [buttonPosition, setButtonPosition] = useState<number>(0);

  const TextareaAutoResize = useCallback(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      const newHeight = textRef.current.scrollHeight;
      textRef.current.style.height = `${newHeight}px`;
      setButtonPosition(newHeight - 520);
    }
  }, []);

  useEffect(() => {
    TextareaAutoResize();
  }, [TextareaAutoResize]);

  const handleImageUpload = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (file) {
        try {
          // Convert the file to a base64 string
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = async () => {
            const base64String = reader.result as string;
            console.log(base64String);
            // // Call the API with the base64 string
            // const response = await postImage({ postImage: base64String });

            // // Log the URL returned from the API
            // console.log("Uploaded Image URL:", response.fileUrl);
          };
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };

    fileInput.click(); // Trigger the file input dialog
  };

  return (
    <div className="autoTextAreaContainer">
      <AddImageButtonSvg
        style={{ top: `${buttonPosition}px`, cursor: "pointer" }}
        onClick={handleImageUpload}
      />
      <textarea
        ref={textRef}
        onInput={(e) => {
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
