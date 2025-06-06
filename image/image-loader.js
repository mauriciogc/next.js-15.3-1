// image/image-loader.js
'use client'
 
export default function myImageLoader({ src }) {
  return `https://image.tmdb.org/t/p/w400/${src}`  
}