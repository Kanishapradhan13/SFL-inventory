import Image from 'next/image';

const MyComponent = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
    <div className="h-24 w-24 animate-spin rounded-full border-8 border-solid border-warning border-t-transparent"></div>
  </div>
  );
};
export default MyComponent;

