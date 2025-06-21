import React from 'react';

const FinalTransformation: React.FC = () => {
  return (
    <div className="text-center">
      <div className="mb-12">
        <div className="rotating-crucifix-3d">
          <div className="crucifix-3d">
            <div className="crucifix-vertical"></div>
            <div className="crucifix-horizontal"></div>
            <div className="crucifix-center"></div>
          </div>
        </div>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <pre className="text-green-400 font-mono text-sm">
            <code>
              {`01000011 01110010 01110101 01100011
              01101001 01100110 01101001 01101010
              01101111 00100000 01100100 01100101
              01000011 11000011 10110011 01100100
              01101001 01100111 01101111`}
            </code>
          </pre>
        </div>

        <p className="text-gray-400 text-sm italic">
          "Crucifijo de Código" en binario
        </p>
      </div>
    </div>
  );
};

export default FinalTransformation;