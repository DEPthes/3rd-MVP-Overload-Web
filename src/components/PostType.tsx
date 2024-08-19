import React, { useState } from 'react';
import "../style/postType.css";

type postType = {
    category: string;
    onCategoryChange: (category: string) => void;
}

const PostType: React.FC<postType> = (props) => {

    const categories = ['전체', '기획', '디자인', '개발'];
    const categoriesEn = ['ALL', 'PLAN', 'DESIGN', 'SERVER', 'WEB', 'ANDROID'];
    const [selectedCategory, setSelectedCategory] = useState<string>('전체');

    const handleCategoryClick = (category: string, index: number) => {
        setSelectedCategory(category);

        if (categoriesEn[index] === 'SERVER' || categoriesEn[index] === 'WEB' || categoriesEn[index] === 'ANDROID') {
            props.onCategoryChange('ALL'); // "개발"에 해당하는 DEV를 전달
        } else {
            props.onCategoryChange(categoriesEn[index]); // 그 외는 정상적으로 해당 카테고리 전달
        }
    };

    return (
        <div className="post-type-container">
            <div className="category-tabs">
                {categories.map((category, index) => (
                    <button
                        key={category}
                        className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category, index)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PostType;
