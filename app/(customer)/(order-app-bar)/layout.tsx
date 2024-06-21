'use client';
import Navbar from '@/components/customer-nav-bar';
import OrderBar from '@/components/templates/order-bar';

const CustomerLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <OrderBar />
      <div className="spacing md:mt-16"></div>
      <div className="main-container ">{children}</div>
    </>
  );
};

export default CustomerLayout;
