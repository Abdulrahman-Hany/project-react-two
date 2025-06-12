import React, { type ButtonHTMLAttributes } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...rest} : Iprops) => {
  return (
      <button className={`${className} p-3 rounded-lg text-white`} {...rest}>
       {children}</button>
  );
};

export default Button;