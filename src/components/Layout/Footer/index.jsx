import React from "react";
function Footer() {
  return (
    <React.Fragment>
      <footer className="bg-dark text-light">
        <section className="container-fluid p-3 p-md-5">
          <div className="row g-0">
            <ul className="d-md-grid justify-content-center col-md-6">
              <h2>Footer Heading 1</h2>
              <li>List example 1</li>
              <li>List example 2</li>
              <li>List example 3</li>
            </ul>
            <ul className="d-md-grid justify-content-center col-md-6">
              <h2>Footer Heading 2</h2>
              <li>List example 1</li>
              <li>List example 2</li>
              <li>List example 3</li>
            </ul>
          </div>
        </section>
        <section className="footer-copyright w-100">
          <span>&#169; 2024 Holidaze, inc</span>
        </section>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
