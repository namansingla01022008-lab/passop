import {React,  useState } from "react";
import {
    m,
    LazyMotion,
    domAnimation,
} from "motion/react";

const TrashIcon = ({
    size = 28,
    duration = 1,
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

    const lidProps = {
        animate: shouldAnimate
            ? {
                y: [-1],
                rotate: [0, -10, 10, -5, 5, 0],
            }
            : {
                y: 0,
                rotate: 0,
            },

        transition: {
            duration: duration,
            ease: "easeInOut",
            repeat: isHovered ? 0 : Infinity,
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
                overflow="visible"
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
                {/* Empty SVG background */}
                <path
                    stroke="none"
                    d="M0 0h24v24H0z"
                    fill="none"
                />

                {/* Animated trash lid */}
                <m.g {...lidProps}>
                    <path d="M4 7l16 0" />

                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </m.g>

                {/* Trash lines */}
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />

                {/* Trash body */}
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            </m.svg>
        </LazyMotion>
    );
};

export default TrashIcon;