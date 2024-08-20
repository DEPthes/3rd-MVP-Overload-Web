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

        props.onCategoryChange(categories[index]);
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
