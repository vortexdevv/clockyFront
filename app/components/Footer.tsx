import Link from "next/link";
import Icon1 from "../../public/facebook-176-svgrepo-com.svg";
import Icon2 from "../../public/instagram-svgrepo-com.svg";
import Icon3 from "../../public/twitter-svgrepo-com.svg";

const Footer = () => {
  return (
    <div
      id="contact-us"
      className="mx-auto flex justify-center  items-center md:w-4/5  w-full bg-[#414b43] p-20 text-white"
    >
      <footer className="flex justify-between w-5/6 md:flex-row  flex-col gap-10">
        <div className="">
          <h4 className="font-medium text-xl mb-3">Our information</h4>
          <p className="font-normal text-base leading-8">Cairo - Egypt</p>
          <p className="font-normal text-base leading-8">01113283189</p>
        </div>
        <div className="about-us">
          <h4 className="font-medium text-xl mb-3">About Us</h4>
          <a className="font-normal text-base leading-8" href="#">
            Support Center
          </a>
          <br />
          <a className="font-normal text-base leading-8" href="#">
            Customer Support
          </a>
          <br />
          <a className="font-normal text-base leading-8" href="#">
            About Us
          </a>
          <br />
          <a className="font-normal text-base leading-8" href="#">
            Copy Right
          </a>
        </div>
        {/* <div className="product">
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
        </div> */}
        <div className="flex  md:items-center flex-col gap-14 text-white">
          <h4 className="font-medium text-xl md:mb-3 mb-16">Social</h4>
          <div className="w-24 flex md:flex-col md:gap-6 md:justify-center -m-10 items-center">
            <Link href={""}>
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
            </Link>
            <Link href={""}>
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
            </Link>
            <Link href={""}>
              {/*  WhatsApp */}
              <svg
                className="mx-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="20px"
                height="20px"
              >
                {" "}
                <path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z" />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
