import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { BASEURL } from "../config";

const Summary = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASEURL}/checks/users`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <p className="leading-snug font-semibold mb-4 text-3xl capitalize flex justify-between">
        Riepilogo
      </p>
      {data.length > 0 ? (
        <div>
          {data.map((user, index) => (
            <p key={index}>{user.outs.last.amount + user.ins.last.amount}</p>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Summary;
