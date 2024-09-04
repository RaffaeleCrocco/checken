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
      <p className="leading-snug font-semibold mb-4 text-3xl capitalize">
        Checken Little
      </p>
      <p className="mb-5 text-sm text-gray-600">
        Nothing fancy, just some little checkins and outs of an imaginary runner
        management app.
      </p>
      <div className="mb-5 bg-gray-50 border border-gray-200 text-sm text-gray-600 rounded-lg p-4">
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
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </div>
          <div className="flex-1 md:flex md:justify-between ms-2">
            <p id="hs-link-on-right-label" className="text-sm">
              Update nuova versione. Aggiunto utente bonus per i check in/out
              che non possono essere coperti dai runners principali. v0409.1336
            </p>
          </div>
        </div>
      </div>
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
          Dashboards
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
              {checks
                .sort((a, b) => new Date(b.time) - new Date(a.time))
                .map((check, index) => (
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
                              : check.agent === "raffa"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-purple-100 text-purple-800"
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
