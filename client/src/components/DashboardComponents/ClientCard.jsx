import React from "react";

const ClientCard = ({ client }) => {
  return (
    <div className="p-6 bg-white rounded-xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold">{client.name}</h1>
        <p className="text-sm text-gray-400">{client.title}</p>
      </div>
      <p className="text-xs text-gray-300">{client.date}</p>
    </div>
  );
};

export default ClientCard;
