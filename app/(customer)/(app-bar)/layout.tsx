import Navbar from '@/components/customer-nav-bar';

const CustomerLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Navbar />
      <div className="spacing md:mt-16"></div>
      <div className="main-container ">{children}</div>
    </>
  );
};

export default CustomerLayout;
