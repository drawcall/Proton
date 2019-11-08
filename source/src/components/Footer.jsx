import React from "react";
import "../css/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Proton</strong> by{" "}
          <a href="https://github.com/a-jie" target="_blank">
            anonymous namespace
          </a>
          . The source code is licensed{" "}
          <a
            href="http://opensource.org/licenses/mit-license.php"
            target="_blank"
          >
            MIT
          </a>
          . The website is made using{" "}
          <a href="https://bulma.io/" target="_blank">
            BULMA
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
