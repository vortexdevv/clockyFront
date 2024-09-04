import Icon1 from "../../public/facebook-176-svgrepo-com.svg";
import Icon2 from "../../public/instagram-svgrepo-com.svg";
import Icon3 from "../../public/twitter-svgrepo-com.svg";

const Footer = () => {
  return (
    <div className="mx-auto flex justify-center  items-center md:w-4/5  w-full bg-[#FCFCFC] p-20">
      <footer className="flex justify-between w-5/6 md:flex-row  flex-col gap-10">
        <div className="">
          <h4 className="mejor">Our information</h4>
          <p className="idara">Cairo - Egypt</p>
          <p className="idara">01113283189</p>
        </div>
        <div className="about-us">
          <h4 className="mejor">About Us</h4>
          <a className="idara" href="#">
            Support Center
          </a>
          <br />
          <a className="idara" href="#">
            Customer Support
          </a>
          <br />
          <a className="idara" href="#">
            About Us
          </a>
          <br />
          <a className="idara" href="#">
            Copy Right
          </a>
        </div>
        <div className="product">
          <h4 className="mejor">Product</h4>
          <a className="idara" href="#">
            Original watches
          </a>
          <br />
          <a className="idara" href="#">
            High copy watches
          </a>
          <br />
          <a className="idara" href="#">
            Smart watches
          </a>
          <br />
          <a className="idara" href="#">
            Accessories
          </a>
        </div>
        <div className="flex  md:items-center flex-col gap-14 ">
          <h4 className="mejor">Social</h4>
          <div className="w-24 flex md:flex-col md:gap-6 md:justify-center -m-10">
            <button>
              {/* facebook */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="90"
                height="20"
                viewBox="-5 0 20 20"
              >
                <g>
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="none"
                    strokeWidth="1"
                  >
                    <g fill="#000" transform="translate(-385 -7399)">
                      <g transform="translate(56 160)">
                        <path d="M335.821 7259v-9h2.733l.446-4h-3.179v-1.948c0-1.03.027-2.052 1.466-2.052h1.458v-2.86c0-.043-1.253-.14-2.52-.14-2.645 0-4.302 1.657-4.302 4.7v2.3H329v4h2.923v9h3.898z"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
            <button>
              {/* instagram */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="90"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <g fill="#0F0F0F">
                  <path
                    fillRule="evenodd"
                    d="M12 18a6 6 0 100-12 6 6 0 000 12zm0-2a4 4 0 100-8 4 4 0 000 8z"
                    clipRule="evenodd"
                  ></path>
                  <path d="M18 5a1 1 0 100 2 1 1 0 000-2z"></path>
                  <path
                    fillRule="evenodd"
                    d="M1.654 4.276C1 5.56 1 7.24 1 10.6v2.8c0 3.36 0 5.04.654 6.324a6 6 0 002.622 2.622C5.56 23 7.24 23 10.6 23h2.8c3.36 0 5.04 0 6.324-.654a6 6 0 002.622-2.622C23 18.44 23 16.76 23 13.4v-2.8c0-3.36 0-5.04-.654-6.324a6 6 0 00-2.622-2.622C18.44 1 16.76 1 13.4 1h-2.8c-3.36 0-5.04 0-6.324.654a6 6 0 00-2.622 2.622zM13.4 3h-2.8c-1.713 0-2.878.002-3.778.075-.877.072-1.325.202-1.638.361a4 4 0 00-1.748 1.748c-.16.313-.29.761-.36 1.638C3.001 7.722 3 8.887 3 10.6v2.8c0 1.713.002 2.878.075 3.778.072.877.202 1.325.361 1.638a4 4 0 001.748 1.748c.313.16.761.29 1.638.36.9.074 2.065.076 3.778.076h2.8c1.713 0 2.878-.002 3.778-.075.877-.072 1.325-.202 1.638-.361a4 4 0 001.748-1.748c.16-.313.29-.761.36-1.638.074-.9.076-2.065.076-3.778v-2.8c0-1.713-.002-2.878-.075-3.778-.072-.877-.202-1.325-.361-1.638a4 4 0 00-1.748-1.748c-.313-.16-.761-.29-1.638-.36C16.278 3.001 15.113 3 13.4 3z"
                    clipRule="evenodd"
                  ></path>
                </g>
              </svg>
            </button>
            <button>
              {/* X */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="90"
                height="20"
                x="0"
                y="0"
                viewBox="0 0 50 50"
              >
                <path d="M11 4a7 7 0 00-7 7v28a7 7 0 007 7h28a7 7 0 007-7V11a7 7 0 00-7-7H11zm2.086 9h7.937l5.637 8.01L33.5 13H36l-8.21 9.613L37.913 37H29.98l-6.541-9.293L15.5 37H13l9.309-10.896L13.086 13zm3.828 2l14.107 20h3.065L19.979 15h-3.065z"></path>
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
