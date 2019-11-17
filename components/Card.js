import React from "react";

const Card = ({ children, compact = false, title, subTitle }) => {
  return (
    <div className="box">
      {title && <h2>{title}</h2>}
      {subTitle && <h3>{subTitle}</h3>}
      {children}

      <style jsx>{`
        .box {
          background: white;
          padding: ${compact ? 10 : 20}px 40px;
          border-radius: 4px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          margin-top: 40px;
        }
        h2 {
          text-transform: uppercase;
          text-align: center;
          font-size: 1.8rem;
          margin-top: 10px;
        }
        h3 {
          text-transform: uppercase;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 400;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default Card;
