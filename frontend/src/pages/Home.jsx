import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { BASEURL } from "../config";

const Home = () => {
  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASEURL}/checks`)
      .then((response) => {
        setChecks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex mb-4 justify-between gap-4">
        <Link
          to="/checks/create"
          className="text-center w-full py-3 px-4 text-sm font-medium rounded-lg border border-gray-800 text-gray-800"
        >
          Crea nuovo
        </Link>
        <Link
          to="/dashboard/raffa"
          className="text-center w-full py-3 px-4 text-sm font-medium rounded-lg border border-gray-800 text-gray-800"
        >
          Dashboard
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
              {checks.map((check, index) => (
                <tr key={check._id}>
                  <td className="px-3 py-5 whitespace-nowrap text-sm font-medium text-gray-800">
                    <span
                      className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-gray-800 text-gray-800 ${
                        check.isCompleted ? "bg-green-100" : ""
                      }`}
                    >
                      {check.type}
                    </span>
                  </td>
                  <td className="px-3 py-5 whitespace-nowrap text-sm font-medium text-gray-800">
                    {new Date(check.time).toLocaleString("it-IT", {
                      month: "long",
                      day: "numeric",
                    })}
                    {", "}
                    {new Date(check.time).toLocaleString("it-IT", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false, // Use 24-hour format
                    })}
                  </td>
                  <td className="px-3 py-5 whitespace-nowrap text-sm font-medium text-gray-800 flex justify-end">
                    {check.isAssigned ? (
                      <Link
                        to={`/checks/edit/${check._id}`}
                        className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${
                          check.agent === "giulia"
                            ? "bg-pink-100 text-pink-800"
                            : check.agent === "giusy"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {check.agent}
                      </Link>
                    ) : (
                      <Link
                        to={`/checks/edit/${check._id}`}
                        className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        Assegna
                      </Link>
                    )}
                  </td>
                  {/*<td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
                    {check.place.building}-P{check.place.floor}-
                    {check.place.number}-{check.place.room}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
