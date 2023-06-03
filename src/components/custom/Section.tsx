import React from "react";

interface Props {
  children: React.ReactNode,
  className?: string
  style?: any
}

const Section: React.FC<Props> = ({
  children,
  className,
  style,
}) => {
  return (
    <section style={style} className={className}>
      {children}
    </section>
  )
}

export default Section