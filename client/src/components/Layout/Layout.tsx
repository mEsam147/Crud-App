import Navbar from "../Navbar";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto ">{children}</main>
    </div>
  );
};

export default Layout;
