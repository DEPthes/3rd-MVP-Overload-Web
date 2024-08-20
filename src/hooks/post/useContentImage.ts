// import { useRef, useState } from "react";

// export const useContentImage = (imageUrl: string = '') => {
//     const [contentImage, setContentImage] = useState(imageUrl);
//     const contentInputRef = useRef<HTMLInputElement | null>(null);

//     const handlePasteImage = (event: ClipboardEvent<HTMLTextAreaElement>) => {
//       const file = event.clipboardData.files[0];

//       if (!file) return;

//       if (file.type.slice(0, 5) === 'image') {
//         event.preventDefault();

//         uploadImage({
//           imageFile: file,
//           inputElement: contentInputRef.current,
//           setPreviewImageUrl: setContentImage,
//         });
//       }
//     };
