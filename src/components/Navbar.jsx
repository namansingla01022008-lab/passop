import React from 'react'
import DancingLetters from './DancingLetters'
import TextLoop from './TextLoop'
import GlowingBorderButton from './GlowingBorderButton'
import githubIcon from '../assets/github.svg'

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-0 py-0 sm:px-8 sm:py-5">
            <div className="flex items-center justify-between
                    px-4 py-0 sm:px-6 sm:py-2
                    rounded-2xl
                    bg-white/10
                    backdrop-blur-xl
                    border border-white/20">

                <div className="text-white font-bold flex flex-col gap-3">
                    <DancingLetters
                        text="<PassOP/>"
                        className="text-white"
                        letterClassName="text-white"
                    />
                    <TextLoop
                        staticText="Your Own password"
                        rotatingTexts={[
                            "Manager",
                            "Storage",
                            "Assistant",
                        ]}
                        className="text-white text-sm sm:text-xl"
                        rotatingTextClassName="from-cyan-300 to-violet-500"
                        cursorClassName="bg-cyan-400"
                    />

                </div>
                <GlowingBorderButton className='p-0 sm:p-1'>
                    <a
                        href="https://github.com/namansingla01022008-lab/passop"
                        target='_blank'
                        rel="noopener noreferrer"
                        className='flex items-center gap-2'
                    >
                        <img src={githubIcon} alt="GitHub" />
                        <span className='hidden sm:flex'>Github</span>
                    </a>
                </GlowingBorderButton>
            </div>
        </nav >
    )
}

export default Navbar