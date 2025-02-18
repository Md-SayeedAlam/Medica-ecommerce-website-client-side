import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-base-200">
       <div className="footer container mx-auto text-base-content p-10">
         <aside>
          <img className="w-10" src="/medica-logo.avif" alt="" />
          <p>
            <span className="font-bold"> MEDICA Pharmaceuticals Ltd.</span>
            <br />
            Providing reliable medicine since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
       </div>

      </footer>

      <div className="bg-base-200 text-base-content p-10 text-center">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by MEDICA
          Pharmaceuticals Ltd
        </p>
      </div>
    </>
  );
};

export default Footer;
