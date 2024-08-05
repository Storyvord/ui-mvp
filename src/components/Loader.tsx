
const Loader = () => {
  return (
    <div className="w-fit">
      <div
        className="w-6 h-6"
        style={{
          border: "1px solid #f3f3f3",
          borderRadius: "50%",
          borderTop: "2px solid #3498db",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;

