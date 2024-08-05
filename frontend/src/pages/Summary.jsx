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
          <div className="flex flex-col">
            {data.map((user, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg"
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="capitalize font-semibold">{user.agent}</p>
                    <p className="text-xs text-gray-500 w-3/4">
                      Lo scorso mese ha realizzato {user.ins.last.number}{" "}
                      checkin e {user.outs.last.number} checkout.
                    </p>
                  </div>
                  <span>€{user.outs.last.amount + user.ins.last.amount}</span>
                </div>
              </div>
            ))}
            <div className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border font-semibold bg-gray-50 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
              <div className="flex items-center justify-between w-full">
                <div>
                  <p className="capitalize">Totale</p>
                  <p className="text-xs font-normal text-gray-500 w-3/4">
                    Lo scorso mese sono stati realizzati{" "}
                    {data.reduce((acc, user) => {
                      return acc + user.ins.last.number;
                    }, 0)}{" "}
                    checkin e{" "}
                    {data.reduce((acc, user) => {
                      return acc + user.outs.last.number;
                    }, 0)}{" "}
                    checkout.
                  </p>
                </div>
                <span>
                  €
                  {data.reduce((acc, user) => {
                    return acc + user.outs.last.amount + user.ins.last.amount;
                  }, 0)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            {data.map((user, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border border-gray-800 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg"
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="capitalize font-semibold">{user.agent}</p>
                    <p className="text-xs text-gray-500 w-3/4">
                      Questo mese ha realizzato {user.ins.current.number}{" "}
                      checkin e {user.outs.current.number} checkout.
                    </p>
                  </div>
                  <span>
                    €{user.outs.current.amount + user.ins.current.amount}
                  </span>
                </div>
              </div>
            ))}
            <div className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border border-gray-800 font-semibold bg-gray-50 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
              <div className="flex items-center justify-between w-full">
                <div>
                  <p className="capitalize">Totale</p>
                  <p className="text-xs font-normal text-gray-500 w-3/4">
                    Questo mese sono stati realizzati{" "}
                    {data.reduce((acc, user) => {
                      return acc + user.ins.current.number;
                    }, 0)}{" "}
                    checkin e{" "}
                    {data.reduce((acc, user) => {
                      return acc + user.outs.current.number;
                    }, 0)}{" "}
                    checkout.
                  </p>
                </div>
                <span>
                  €
                  {data.reduce((acc, user) => {
                    return (
                      acc + user.outs.current.amount + user.ins.current.amount
                    );
                  }, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "bro"
      )}
    </div>
  );
};

export default Summary;
