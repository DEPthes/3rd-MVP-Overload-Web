// PostType.tsx
import React, { useState } from 'react';
import "../style/postType.css";

type postType = {
    category: string;
    onCategoryChange: (category: string) => void
}

const PostType: React.FC<postType> = (props) => {
    
    const categories = ['전체', '기획', '디자인', '개발'];
    const categoriesEn = ['ALL', 'PLAN', 'DESIGN', 'SERVER']
    const [selectedCategory, setSelectedCategory] = useState<string>(props.category);


    const handleCategoryClick = (category: string, index: number) => {
        setSelectedCategory(category);
        props.onCategoryChange(categoriesEn[index]); // 영어로 된 카테고리 전달
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

