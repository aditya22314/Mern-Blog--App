import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";
const FooterComp = () => {
  return (
    <Footer container className="border border-t-8 border-teal-600">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                Adi&apos;s
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="http://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener norefferer" //UnPrevents the browser from opening the link in a new tab
                >
                  100 React Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener norefferer" //UnPrevents the browser from opening the link in a new tab
                >
                  Aditya&apos;Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="http://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener norefferer" //UnPrevents the browser from opening the link in a new tab
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener norefferer" //UnPrevents the browser from opening the link in a new tab
                >
                  Linkedin
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="http://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener norefferer" //UnPrevents the browser from opening the link in a new tab
                >
                  Privacy policy
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener norefferer" //UnPrevents the browser from opening the link in a new tab
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between ">
          <Footer.Copyright
            href="#"
            by="Aditya's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#instagram" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComp;
