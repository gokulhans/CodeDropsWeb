import React from "react";

const ShimmerSearch = () => {
  return (
    <>
      <div className="bg-white rounded-lg p-4 shadow-md mb-4 border-gray-200  overflow-hidden">
        <div className="h-full">
          <div className="p-2">
            <h2 className="bg-gray-200 animate-pulse h-6 w-1/4 mb-2" />
            {/* <h1 className="w-1/2 mb-4 h-6 animate-pulse bg-gray-200" /> */}
            <p className="leading-relaxed mb-3 w-2/3 h-3 animate-pulse bg-gray-200" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShimmerSearch;
