const LaunchpadOrderEmpty = () => {
  return (
    <div className="border border-gray-600 rounded-2xl p-10 flex flex-col items-center justify-center flex-1">
      <p className="text-bodyM text-gray-100 text-center">
        Your order has no items, please add some above.
      </p>
    </div>
  );
};

export default LaunchpadOrderEmpty;
