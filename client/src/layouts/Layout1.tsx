import { Outlet } from "react-router-dom";

const Layout1 = () => {
  return (
    <>
      <header></header>
      <main className="w-screen h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default Layout1;
