// PostType.tsx
import React, { useState } from 'react';
import "../style/postType.css";

type postType = {
    category: string;
    onCategoryChange: (category: string) => void
}

const PostType: React.FC<postType> = (props) => {
    
    const categories = ['전체', '기획', '디자인', '개발'];
    const [selectedCategory, setSelectedCategory] = useState<string>(props.category);


    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        props.onCategoryChange(category);
    };

    return (
        <div className="post-type-container">
            <div className="category-tabs">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PostType;