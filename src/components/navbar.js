import React from 'react';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <a className="navbar-brand text-success" href="/">
        PierChat
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0" />
        <a className="nav-link text-success" href="/account">
          Join Room
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
