import React from "react";
import './Footer.css';
import logo from '/BullLogo.png';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col">
            <img src={logo} id="footer-logo" alt="Logo" />
            <p>&copy; 2010 - 2024, BullRun Broking Ltd. All rights reserved.</p>
          </div>
          <div className="text-muted">
            <p>
              BullRun Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration
              no.: INZ000031633 CDSL/NSDL: Depository services through BullRun
              Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading
              through BullRun Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI
              Registration no.: INZ000038238 Registered Address: BullRun Broking
              Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public
              School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For
              any complaints pertaining to securities broking please write to
              complaints@bullrun.com, for DP related to dp@bullrun.com. Please
              ensure you carefully read the Risk Disclosure Document as prescribed
              by SEBI | ICF.
            </p>

            <p>
              Procedure to file a complaint on SEBI SCORES: Register on SCORES
              portal. Mandatory details for filing complaints on SCORES: Name, PAN,
              Address, Mobile Number, E-mail ID. Benefits: Effective Communication,
              Speedy redressal of the grievances.
            </p>

            <p>Smart Online Dispute Resolution | Grievances Redressal Mechanism</p>

            <p>
              Investments in securities market are subject to market risks; read all
              the related documents carefully before investing.
            </p>

            <p>
              Attention investors: 1) Stock brokers can accept securities as margins
              from clients only by way of pledge in the depository system w.e.f
              September 01, 2020. 2) Update your e-mail and phone number with your
              stock broker / depository participant and receive OTP directly from
              depository on your e-mail and/or mobile number to create pledge. 3)
              Check your securities / MF / bonds in the consolidated account
              statement issued by NSDL/CDSL every month.
            </p>

            <p>
              "Prevent unauthorized transactions in your account. Update your mobile
              numbers/email IDs with your stock brokers. Receive information of your
              transactions directly from Exchange on your mobile/email at the end of
              the day. Issued in the interest of investors. KYC is one time exercise
              while dealing in securities markets - once KYC is done through a SEBI
              registered intermediary (broker, DP, Mutual Fund etc.), you need not
              undergo the same process again when you approach another
              intermediary." Dear Investor, if you are subscribing to an IPO, there
              is no need to issue a cheque. Please write the Bank account number and
              sign the IPO application form to authorize your bank to make payment
              in case of allotment. In case of non allotment the funds will remain
              in your bank account. As a business we don't give stock tips, and have
              not authorized anyone to trade on behalf of others. If you find anyone
              claiming to be part of BullRun and offering such services, please
              create a ticket here.
            </p>
          </div>
          <div className="col">
            <p>Company</p>
            <a href="">About</a>
            <br />
            <a href="">Products</a>
            <br />
            <a href="">Pricing</a>
            <br />
            <a href="">Referral Programme</a>
            <br />
            <a href="">Careers</a>
            <br />
            <a href="">BullRun.tech</a>
            <br />
            <a href="">Press & media</a>
            <br />
            <a href="">BullRun cares(CSR)</a>
            <br />
          </div>
          <div className="col">
            <p>Support</p>
            <a href="">Contact</a>
            <br />
            <a href="">Support Portal</a>
            <br />
            <a href="">Z-Connect blog</a>
            <br />
            <a href="">List of charges</a>
            <br />
            <a href="">Downloads & resources</a>
            <br />
          </div>
          <div className="col">
            <p>Account</p>
            <a href="">Open an account</a>
            <br />
            <a href="">Fund transfer</a>
            <br />
            <a href="">60 day challenge</a>
            <br />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
