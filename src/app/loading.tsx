export default function LoadPage() {
  return (
    <div className="flex h-screen items-center justify-center flex-col lg:flex-row">
        <div><span className="loading loading-ring block loading-lg m-auto"></span></div>
      <div className="text-2xl font-bold mx-4">
        Loading...
      </div>
    </div>
  );
}
