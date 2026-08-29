import React, { useState } from "react";
import {
    m,
    LazyMotion,
    domAnimation,
} from "motion/react";

const CheckIcon = ({
    size = 28,
    duration = 2.5,
    strokeWidth = 2,
    isHovered = false,
    className,
    ...restProps
}) => {
    const [isHoveredInternal, setIsHoveredInternal] =
        useState(false);

    const shouldAnimate = isHovered
        ? isHoveredInternal
        : true;

    const pathAnimationProps = {
        animate: shouldAnimate
            ? {
                pathLength: [0, 1, 1, 0],
                opacity: 1,
            }
            : {
                pathLength: 1,
                opacity: 1,
            },

        transition: {
            duration: duration,
            ease: "easeInOut",
            repeat: isHovered ? 0 : Infinity,
            times: [0, 0.4, 0.8, 1],
        },
    };

    return (
        <LazyMotion features={domAnimation}>
            <m.svg
                {...restProps}
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
                onMouseEnter={() => {
                    if (isHovered) {
                        setIsHoveredInternal(true);
                    }
                }}
                onMouseLeave={() => {
                    if (isHovered) {
                        setIsHoveredInternal(false);
                    }
                }}
            >
                {/* SVG background */}
                <path
                    stroke="none"
                    d="M0 0h24v24H0z"
                    fill="none"
                />

                {/* Circle */}
                <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                />

                {/* Animated check */}
                <m.path
                    d="M9 12l2 2l4 -4"
                    {...pathAnimationProps}
                />
            </m.svg>
        </LazyMotion>
    );
};

export default CheckIcon;