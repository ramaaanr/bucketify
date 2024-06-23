import Navbar from '@/components/customer-nav-bar';
import OrderBar from '@/components/templates/order-bar';
import TopBar from '@/components/templates/top-bar';

const CustomerLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <OrderBar />
      <TopBar />
      <div className="spacing md:mt-16"></div>
      <div className="main-container ">{children}</div>
    </>
  );
};

export default CustomerLayout;
