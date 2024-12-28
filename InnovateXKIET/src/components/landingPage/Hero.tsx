"use client";

import { FaArrowRight } from "react-icons/fa";
import Button from "./Button";
import HeroImage from "@/public/assests/landingPage/Visual.png";
import Cylinder from "@/public/assests/landingPage/cylinder.png";
import HalfTorus from "@/public/assests/landingPage/half-torus.png";
import men from "@/public/assests/landingPage/men.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={heroRef}
      className="p-8 pb-16 md:p-10 lg:p-20 font-medium bg-gradient-to-tr from-[#001E80] via-[#e4eaff]  overflow-x-clip md:items-center gap-3"
    >
      <div className="md:flex items-center justify-center gap-16">
        <div className="md:w-[478px]">
          <div className="border-2 w-fit p-0.5 px-1 lg:text-lg rounded-lg border-slate-400/80">
            {/* Version 2.0 is here */}
            InnovateX-KIET
          </div>
          <div className="text-5xl md:text-7xl font-black my-7 bg-gradient-to-b from-black to-[#002499] text-transparent bg-clip-text tracking-tighter">
            Collaborate Innovate Elevate!
          </div>
          <div className="text-xl lg:text-2xl tracking-tighter opacity-85">
            InnovateX-KIET is a dynamic platform connecting students for
            collaborative learning, project development, and peer-driven
            innovation.
          </div>

          <div className="flex items-center gap-3 mt-6 text-lg">
            <Button text="Sign up" color="black" />
            <div className="cursor-pointer hover:underline">
              Lets Start Learning
              <FaArrowRight className="h-3 w-3 inline ml-2" />
            </div>
          </div>
        </div>

        <div className="pt-12 md:pt-0 md:h-[648px] md:w-[648px] relative">
          <motion.img
            src={Cylinder.src}
            alt="Cylinder"
            className=" hidden md:block md:absolute -left-8 -top-8"
            style={{
              translateY: translateY,
            }}
          />
          <motion.img
            src={men.src}
            alt="Hero Image"
            className="md:absolute  md:h-full md:w-auto  md:max-w-none"
            animate={{
              translateY: [-30, 30],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3,
              ease: "easeInOut",
            }}
          />
          <motion.img
            src={HalfTorus.src}
            alt="HalfTorus"
            className=" hidden lg:block md:absolute left-[400px] top-[500px]"
            style={{
              translateY: translateY,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
