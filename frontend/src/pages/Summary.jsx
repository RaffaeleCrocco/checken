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
      <div className="mb-4 bg-yellow-50 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4">
        <div className="flex">
          <div className="shrink-0">
            <svg
              className="shrink-0 size-4 mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </div>
          <div className="ms-4">
            <h3
              id="hs-with-description-label"
              className="text-sm font-semibold"
            >
              Le prossime due schede sono differenti
            </h3>
            <div className="mt-1 text-sm text-yellow-700">
              La prima serve alla contabilità e mostra i risultati raggiunti nel
              mese scorso.
            </div>
          </div>
        </div>
      </div>
      {data.length > 0 ? (
        <div>
          <div className="flex flex-col">
            {data.map((user, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border border-gray-800 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg"
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
            <div className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border border-gray-800 font-semibold bg-gray-50 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
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
                className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg"
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
            <div className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border font-semibold bg-gray-50 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
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
