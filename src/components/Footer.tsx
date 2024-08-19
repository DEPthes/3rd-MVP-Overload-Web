import React from 'react';
import LmovePage from "../images/leftMP.png";
import LactivateMovePage from "../images/leftActivateMP.png";
import RmovePage from "../images/rightMP.png";
import RactivateMovePage from "../images/rightActivateMP.png";
import '../style/footer.css';

type FooterProps = {
  totalPosts: number;
  postsPerPage: number;
  selectedPage: number;
  totalPages: number; // 총 페이지 수 추가
  onPageChange: (pageNumber: number) => void;
};

const Footer: React.FC<FooterProps> = (props) => {
  const totalPages = props.totalPages;

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      props.onPageChange(pageNumber);
    }
  };

  return (
    <div className="footer-pagination">
      <button 
        disabled={props.selectedPage === 1} 
        onClick={() => handlePageClick(props.selectedPage - 1)}
      >
        <img className='footer-img'
          src={props.selectedPage === 1 ? LmovePage : LactivateMovePage} 
          alt="Previous"
        />
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button 
          key={index} 
          className={props.selectedPage === index + 1 ? 'active' : ''} 
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button 
        disabled={props.selectedPage === totalPages} 
        onClick={() => handlePageClick(props.selectedPage + 1)}
      >
        <img className='footer-img'
          src={props.selectedPage === totalPages ? RmovePage : RactivateMovePage} 
          alt="Next"
        />
      </button>
    </div>
  );
};

export default Footer;
