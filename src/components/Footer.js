import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-wrap">
          <div className="left">
            <img src="../../khaayo.png" alt="boAt Logo" />
            <h3>Subscribe to our email alerts!</h3>
            <div className="email-alert">
              <input type="email" className="newsletter" placeholder="Enter Your Email Id" />
              <button type="submit" className="subscribe">SUBSCRIBE</button>
            </div>
          </div>
          <div className="right">
            <div className="right-column">
              <h4>Company</h4>
              <ul>
                <li>About</li>
                <li>Careers</li>
                <li>Team</li>
                <li>Khaayo Smart</li>
                <li>Khaayo Outlets</li>
              </ul>
            </div>
            <div className="right-column">
              <h4>Contact Us</h4>
              <ul>
                <li>Track Your Order</li>
                <li>Help & Support</li>
                <li>Partner With Us</li>
                <li>Ride With Us</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div className="right-column">
              <h4>Legal</h4>
              <ul>
                <li>Terms and Conditions</li>
                <li>Cookie Policy</li>
                <li>Privacy Policy</li>
                <li>Investor Relations</li>
              </ul>
            </div>
          </div>
        </div><hr/>
        <div className="credit">&copy;All Rights Reserved. Created By <Link to="https://shubhamsingh.online" target="_blank">Shubham Singh</Link></div>
      </footer>
    </div>
  )
}
