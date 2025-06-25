import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Index page',
};

const RoutingPage = () => {
  return <div className="p-5 text-center text-xl font-bold">Index page</div>;
};

export default RoutingPage;
