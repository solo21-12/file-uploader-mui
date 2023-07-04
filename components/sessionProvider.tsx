"use client";


const Provider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  return <div>{children}</div>;
};

export default Provider;
