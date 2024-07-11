import DEXSellOrdersTable from "./DEXSellOrdersTable";

const DEXAllSellOrdersTable = () => {
  return (
    <div className="flex flex-col gap-10">
      <DEXSellOrdersTable />
      <p className="text-bodyM text-gray-400 text-right">
        Table shows the first 100 sell orders
      </p>
    </div>
  );
};

export default DEXAllSellOrdersTable;
