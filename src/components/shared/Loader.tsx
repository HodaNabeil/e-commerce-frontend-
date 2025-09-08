"use client";
import React from "react";
import styles from "../../styles/loader.module.css";

type LoaderProps = {
  size?: number | string;
  thickness?: number;
  color?: string;
  speedSeconds?: number;
  className?: string;
  ariaLabel?: string;
};

const Loader: React.FC<LoaderProps> = ({
  size = 25,
  thickness = 3,
  color = "#ffa50097",
  speedSeconds = 1,
  className = "",
  ariaLabel = "جارٍ التحميل",
}) => {
  const cssSize = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${styles.loader} ${className}`}
      style={
        {
          "--size": cssSize,
          "--thickness": `${thickness}px`,
          "--color": color,
          "--speed": `${speedSeconds}s`,
        } as React.CSSProperties
      }
    />
  );
};

export default Loader;
