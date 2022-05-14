import React, { useContext } from "react";
import DataContext from "../context/DataContext";

export default function Alert() {
  const context = useContext(DataContext);
  const { alert } = context;
  return (
    alert && (
      <div>
        <div className="alert alert-primary" role="alert">
          <strong>{alert.type}</strong>: {alert.message}
        </div>
      </div>
    )
  );
}
