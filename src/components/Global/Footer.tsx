// components/Global/Footer.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="mt-0 pt-[50px] lg:pt-0 border-t border-[#4F4F4F] relative z-[20] backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
      <div className="max-w-[1900px] w-[90%] md:w-[95%] mx-auto">
        <div className="grid grid-cols-1 gap-y-8 lg:flex flex-row justify-between items-start lg:items-center">
          {/* Logo and description section */}
          <div className="max-w-[700px] xl:max-w-[670px] flex flex-col gap-[20px] xxl:gap-[32px]">
            <Image
              src="/assets/images/logo.png"
              alt="EurosHub-logo"
              width={150}
              height={73}
              className="object-contain"
            />
            <p className="text-[14px] sm:text-[16px] font-normal leading-[26px] text-white max-w-[700px] sm:max-w-[500px]">
              When do they work well, and when do they on us and Finally, <br />when do we actually need how can we avoid them.
            </p>
          </div>

          {/* Social links section */}
          <div className="ml-10 flex flex-col items-start max-w-[100%] lg:max-w-[200px] xl:max-w-[244px] w-full">
            <Link
              target="_blank"
              className="hover:bg-[#0FB8AF] pl-[67px] w-full xl:h-[78px] text-[14px] xxl:h-[96px] xxl:text-[16px] border-t border-l border-r border-[#4F4F4F] text-white uppercase flex justify-start items-center gap-2 border-b lg:border-b-[0px]"
              href="https://twitter.com/EurosHub"
            >
              <FaXTwitter className="w-[24px] h-[24px]" />
              X
            </Link>
            <Link
              target="_blank"
              className="hover:bg-[#0FB8AF] pl-[67px] w-full xl:h-[78px] text-[14px] xxl:h-[96px] xxl:text-[16px] border-t border-l border-r border-[#4F4F4F] text-white uppercase flex justify-start items-center gap-2 border-b lg:border-b-[0px]"
              href="https://www.linkedin.com/company/euroshub"
            >
              <FaLinkedin className="w-[24px] h-[24px]" />
              LinkedIn
            </Link>
            <Link
              target="_blank"
              className="hover:bg-[#0FB8AF] pl-[67px] w-full xl:h-[78px] text-[14px] xxl:h-[96px] xxl:text-[16px] border-t border-l border-r border-[#4F4F4F] text-white uppercase flex justify-start items-center gap-2 border-b lg:border-b-[0px]"
              href="https://www.facebook.com/official.euroshub/"
            >
              <FaFacebook className="w-[24px] h-[24px]" />
              Facebook
            </Link>
            <Link
              target="_blank"
              className="hover:bg-[#0FB8AF] pl-[67px] w-full xl:h-[78px] text-[14px] xxl:h-[96px] xxl:text-[16px] border-t border-l border-r border-[#4F4F4F] text-white uppercase flex justify-start items-center gap-2 border-b lg:border-b-[0px]"
              href="https://www.instagram.com/euroshub.official/"
            >
              <FaInstagram className="w-[24px] h-[24px]" />
              Instagram
            </Link>
          </div>

          {/* Let's Connect section */}
          <Link
            className="pt-[30px] md:pt-[60px] mb-0 md:mb-[50px] footer__contact-3 end text-center mx-auto lg:text-[56px] lg:leading-[62px] lg:text-left xl:text-[66px] xl:leading-[90px] xxl:text-[116px] xxl:leading-[130px] footerText font-extrabold w-fit max-w-[100%]"
            href="/contact"
            style={{ opacity: 1 }}
          >
            <h1 className="text text-[20px] leading-[28px] sm:text-[30px] sm:leading-[38px] lg:text-[48px] lg:leading-[56px] xl:text-[56px] xl:leading-[66px] xxl:text-[70px] xxl:leading-[80px] font-extrabold tracking-wider">
              <span className="letter letter-1 letter--6 mx-[3px] md:mx-[5px]">L</span>
              <span className="letter letter-2 letter--5 mx-[3px] md:mx-[5px]">E</span>
              <span className="letter letter-3 letter--4 mx-[3px] md:mx-[5px]">T</span>
              <span className="letter letter-4 letter--3 mx-[3px] md:mx-[5px]">S</span>
              <span className="letter letter-5 letter--2 mx-[3px] md:mx-[5px]">C</span>
              <span className="letter letter-6 letter--1 mx-[3px] md:mx-[5px]">O</span>
              <span className="letter letter-7 letter-0 mx-[3px] md:mx-[5px]">N</span>
              <span className="letter letter-8 letter-1 mx-[3px] md:mx-[5px]">N</span>
              <span className="letter letter-9 letter-2 mx-[3px] md:mx-[5px]">E</span>
              <span className="letter letter-10 letter-3 mx-[3px] md:mx-[5px]">C</span>
              <span className="letter letter-11 letter-4 mx-[3px] md:mx-[5px]">T</span>
            </h1>
          </Link>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-[30px] lg:mt-[0] md:bg-[#171717] md:border-t border-[#4F4F4F] backdrop-blur-[8px] bg-transparent" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
        <div className="max-w-[1900px] w-[90%] md:w-[95%] mx-auto">
          <div className="flex flex-col-reverse gap-y-[40px] lg:flex-row justify-between items-center py-[30px]">
            <p className="text-[12px] sm:text-[14px] md:text-[16px] xxl:text-[18px] text-white leading-[20px]">
              © 2025 | All rights reserved by EurosHub
            </p>
            <div className="flex gap-[50px]">
              <Link className="text-[12px] sm:text-[14px] md:text-[16px] xxl:text-[18px] text-white leading-[20px]" href="/about">
                About
              </Link>
              <Link className="text-[12px] sm:text-[14px] md:text-[16px] xxl:text-[18px] text-white leading-[20px]" href="/contact">
                Contact
              </Link>
              <Link className="text-[12px] sm:text-[14px] md:text-[16px] xxl:text-[18px] text-white leading-[20px]" href="/career">
                Career
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;