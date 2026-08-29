import React, { useEffect, useState } from "react";
import {
    m,
    AnimatePresence,
    LazyMotion,
    domAnimation,
} from "motion/react";

export default function TextLoop({
    staticText = "Design",
    rotatingTexts = [
        "Limitless",
        "Timeless",
        "Flawless",
    ],
    className = "",
    interval = 3000,
    transition = {
        duration: 0.8,
        ease: "easeInOut",
    },
    staticTextClassName = "",
    rotatingTextClassName = "",
    backgroundClassName = "",
    cursorClassName = "",
}) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex(
                (prev) =>
                    (prev + 1) % rotatingTexts.length
            );
        }, interval);

        return () => clearInterval(timer);
    }, [rotatingTexts.length, interval]);

    return (
        <LazyMotion features={domAnimation}>
            <div
                className={`
          flex flex-wrap
          items-center
          justify-start
          w-fit
          gap-x-2
          md:gap-x-3
          gap-y-1
          font-medium
          tracking-tight
          ${className}
        `}
            >
                {/* Static text */}
                <span
                    className={`whitespace-nowrap ${staticTextClassName}`}
                >
                    {staticText}
                </span>

                {/* Rotating text */}
                <div className="relative flex items-center">
                    <AnimatePresence mode="wait">
                        <m.div
                            key={rotatingTexts[index]}
                            initial={{
                                width: 0,
                                opacity: 0,
                            }}
                            animate={{
                                width: "auto",
                                opacity: 1,
                            }}
                            exit={{
                                width: 0,
                                opacity: 0,
                            }}
                            transition={transition}
                            className="overflow-hidden whitespace-nowrap relative"
                        >
                            {/* Background gradient */}
                            <div
                                className={`
                  absolute inset-0
                  bg-gradient-to-r
                  from-transparent
                  via-purple-200/30
                  to-purple-200
                  ${backgroundClassName}
                `}
                            />

                            {/* Rotating text */}
                            <span
                                className={`
                  relative
                  bg-clip-text
                  text-transparent
                  bg-gradient-to-r
                  from-orange-500
                  to-violet-900
                  pr-1
                  ${rotatingTextClassName}
                `}
                            >
                                {rotatingTexts[index]}
                            </span>
                        </m.div>
                    </AnimatePresence>

                    {/* Blinking cursor */}
                    <m.div
                        className={`
              w-[3px]
              md:w-[4px]
              bg-violet-500
              h-[1.10em]
              sm:h-[1em]
              ${cursorClassName}
            `}
                        animate={{
                            opacity: [1, 0.5],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                </div>
            </div>
        </LazyMotion>
    );
}