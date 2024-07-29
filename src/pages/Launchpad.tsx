export default function Launchpad() {
  return (
    <div className="w-full py-6 container">
      <div className="flex flex-col gap-12">
        <h1 className="text-heading2 tablet:text-displayS font-formula font-bold">
          Launchpad
        </h1>
        <div className="flex flex-col gap-3">{/* <LaunchpadItem> */}</div>
      </div>
    </div>
  );
}
