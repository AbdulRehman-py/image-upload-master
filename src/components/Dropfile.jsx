import React from 'react'

const Dropfile = () => {
return (
    <section className='flex items-center justify-center w-full h-[100vh] '>
        <div className='sm:p-4 customsize:p-2 p-1 border-1 bg-white rounded-lg'>
            <div className='border-4 customsize:p-[5rem]   sm:p-[8rem] px-[2rem] py-[5rem] rounded-lg border-dotted border-gray-200 flex flex-col items-center justify-center'>
                    <img src="/download.svg" alt="download icon" />
                    <span className='text-black customsize:text-base text-[0.9rem] font-semibold font-sans'>Drag and drop files or <strong className='text-blue-500 cursor-pointer font-inter'>browse files</strong></span>
                    <p className='font-inter customsize:text-base text-[0.9rem]'>JPG, PNG, GIF - MAX file size 2MB</p>
            </div>
            </div>
    </section>
)
}

export default Dropfile