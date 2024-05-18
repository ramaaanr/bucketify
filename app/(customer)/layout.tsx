import Navbar from '@/components/customer-nav-bar';

const CustomerLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Navbar />
      <div className="spacing mt-16"></div>
      <div className="main-container pl-6 lg:pl-24 mt-16">{children}</div>
    </>
  );
};

export default CustomerLayout;
