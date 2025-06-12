import type { HTMLAttributes } from "react"

interface Iprops extends HTMLAttributes<HTMLSpanElement>{
    color: string
}
function CircelColor({color, ...rest}: Iprops) {
  return (
 <span className="block w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" style={{backgroundColor: color}} {...rest}></span>
  )
}

export default CircelColor