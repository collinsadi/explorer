const Title = ({ className = "", children }) => {
  return (
    <div className={`w-full p-4 mx-auto ${className}`}>
      <h1 className="ml-2 font-varela font-bold text-xl mx-auto">{children}</h1>
    </div>
  );
};

export default Title;
