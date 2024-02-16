const Loading = () => (
  <div>
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="animate-ping w-16 h-16 m-8 rounded-full bg-sky-600"></div>
    </div>
  </div>
);

export default Loading;