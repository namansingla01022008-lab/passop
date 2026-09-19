import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className='fixed bottom-0 left-0 right-0'>
                <div className='backdrop-blur-sm bg-white/10 py-1 px-5'>
                    <div className='flex items-center justify-center'>
                        <span className='text-3xl text-white font-semibold'>&lt;Pass</span>
                        <span className='text-3xl font-semibold text-purple-700'>OP/&gt;</span>
                    </div>
                    <div className='flex gap-1 items-center justify-center text-white font-bold'>
                        <span>Made with</span>
                        <img src="src/assets/heart.svg"/>
                        <span>by Naman Singla</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer
