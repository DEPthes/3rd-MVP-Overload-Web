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
  onPageChange: (pageNumber: number) => void;
};

const Footer: React.FC<FooterProps> = (props) => {
  const totalPages = Math.ceil(props.totalPosts / props.postsPerPage);

  const handlePageClick = (pageNumber: number) => {
    props.onPageChange(pageNumber);
  };

  return (
    <div className="footer-pagination">
      <button 
        disabled={props.selectedPage === 1} 
        onClick={() => handlePageClick(props.selectedPage - 1)}
      >
        <img className='footer-img'
          src={props.selectedPage === 1 ? LmovePage : LactivateMovePage} 
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
        />
      </button>
    </div>
  );
};

export default Footer;