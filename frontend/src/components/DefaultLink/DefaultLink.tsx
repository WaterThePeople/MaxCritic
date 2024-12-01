import React from "react";
import style from "./DefaultLink.module.sass";
import { Link } from "react-router-dom";
import cn from "classnames";

function DefaultLink({
  to,
  className,
  children,
}: {
  to: string;
  className: any;
  children: React.ReactNode;
}) {
  return (
    <Link to={to} className={cn(style.container, className)}>
      {children}
    </Link>
  );
}

export default DefaultLink;
