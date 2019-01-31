import React from 'react';

function Header () {
  return (
    <div className="header-outer">
      <div className="ui container">
        <div className="header-inner">
          <span className="dog-emoji" role="img" aria-label="Dog Emoji">🐶</span>
          <h3>Dog Browser</h3>
        </div>
      </div>
    </div>
  );
}

export default Header;