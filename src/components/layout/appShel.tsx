import { Navbar } from "../ui/navbar";
import NavBottom from "../ui/navbottom";

const AppShel = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-[100vh] max-h-max relative">
      <Navbar />
      <div className="relative top-[130px] w-full h-max">{children}</div>
      <NavBottom />
    </main>
  );
};

export default AppShel;
