import React, { useRef, useState, useEffect } from "react";
import style from "./HorizontalScroll.module.sass";

const HorizontalScroll = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartLeft, setScrollStartLeft] = useState(0);
  const MAX_SCROLL_SPEED = 500;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollStartLeft(scrollRef.current.scrollLeft);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX;
    let walk = x - startX;
    if (walk > MAX_SCROLL_SPEED) walk = MAX_SCROLL_SPEED;
    else if (walk < -MAX_SCROLL_SPEED) walk = -MAX_SCROLL_SPEED;
    scrollRef.current.scrollLeft = scrollStartLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className={style.container}
      ref={scrollRef}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default HorizontalScroll;
