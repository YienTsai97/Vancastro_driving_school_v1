"use client"

type QuickBooksItem = {
  Id: string;
  Name: string;
  Description?: string;
  UnitPrice?: number;
  Type: string;
  Active: boolean;
};

type QuickBooksItemsResponse = {
  QueryResponse: {
    Item: QuickBooksItem[];
  };
};

export default function test({data}:{
  data: QuickBooksItemsResponse
} ) {

// console.log(data.QueryResponse.Item)

const activeItems = data.QueryResponse.Item.filter((item) => item.Active === true && item.Type === "Service");
console.log("Active Items:", activeItems);
  return (
    <div>
      {activeItems.map((item) => (
        <div key={item.Id} className="p-4 border-b border-gray-200">
          <p>{item.Id}</p>
          <h3 className="text-lg font-semibold">{item.Name}</h3>
          <p>{item.Description}</p>
          <p>Price: {item.UnitPrice}</p>
          <p>Type: {item.Type}</p>
          <p>Active: {item.Active ? "Yes" : "No"}</p>
        </div>
      ))}
      {activeItems.length === 0 && (
        <p className="text-gray-500">No active items found.</p>
      )}
    </div>
  )
}
