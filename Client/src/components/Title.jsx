import React from 'react'

const Title = ({title,subTitle, align, font}) => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 1g:px-24 bg-slate-50
py-20'>
    <h1 className={`text-4xl md:text-[40px] ${font || "font-playfair"}`}>{title}</h1>
    <p className={`text-sm md:text-base ${align || "text-center"}`}>{subTitle}</p>
</div>
  )
}

export default Title