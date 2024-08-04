import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link, useParams } from "react-router-dom";
import CountUp from "../components/CountUp";
import { BASEURL } from "../config";

const Dashboard = () => {
  const [checks, setChecks] = useState([]);
  const [notAssignedChecks, setNotAssignedChecks] = useState([]);
  const [outs, setOuts] = useState([]);
  const [ins, setIns] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASEURL}/checks/user/${user}`)
      .then((response) => {
        setChecks(response.data.data);
        setOuts(response.data.outs);
        setIns(response.data.ins);
        setNotAssignedChecks(response.data.notAssignedChecks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [user]);

  const handleEditCheck = (isAssigned, isCompleted, id) => {
    const data = {
      isAssigned,
      isCompleted: !isCompleted,
    };
    setLoading(true);
    axios
      .put(`${BASEURL}/checks/complete/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate(0);
      })
      .catch((error) => {
        alert("Controlla i campi");
        setLoading(false);
        console.log(error);
      });
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      {outs && ins ? (
        <div>
          {/* <p className="font-semibold mt-4 text-xl">Bentornat&#601;,</p> */}
          <p className="font-semibold mb-4 text-5xl capitalize flex justify-between">
            <span className="leading-snug">{user}</span>
            <div>
              <Link
                to={`/dashboard/giulia`}
                className="ms-2 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-pink-100 text-pink-800"
              >
                giulia
              </Link>
              <Link
                to={`/dashboard/giusy`}
                className="ms-2 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                giusy
              </Link>
              <Link
                to={`/dashboard/raffa`}
                className="ms-2 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
              >
                raffa
              </Link>
            </div>
          </p>
          <div className="flex mb-4">
            <Link
              to="/checks/create"
              className="text-center w-full py-3 px-4 text-sm font-medium rounded-lg border border-gray-800 text-gray-800"
            >
              Crea nuovo
            </Link>
          </div>
          <div className="flex gap-4">
            <div className="flex w-full flex-col p-4 border border-gray-800 rounded-md">
              <h4 className="text-gray-800 mb-1">Questo mese</h4>
              <div className="flex gap-x-1">
                <span className="text-xl font-normal text-gray-800">
                  &#8364;
                </span>
                <div className="text-gray-800 font-semibold text-3xl">
                  <CountUp
                    endValue={ins.current?.amount + outs.current?.amount}
                  />
                </div>
              </div>
              <p className="text-gray-400 mt-1 text-xs">
                {ins.current?.number} checkin e {outs.current?.number} checkout
              </p>
            </div>
            <div className="flex w-full flex-col p-4 border border-gray-200 rounded-md">
              <h4 className="text-gray-800 mb-1">Mese scorso</h4>
              <div className="flex gap-x-1">
                <span className="text-xl font-normal text-gray-800">
                  &#8364;
                </span>
                <div className="text-gray-800 font-semibold text-3xl">
                  <CountUp endValue={ins.last?.amount + outs.last?.amount} />
                </div>
              </div>
              <p className="text-gray-400 mt-1 text-xs">
                {ins.last?.number} checkin e {outs.last?.number} checkout
              </p>
            </div>
          </div>
          {notAssignedChecks.length != 0 ? (
            <div className="border rounded-md mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {notAssignedChecks
                    .sort((a, b) => new Date(b.time) - new Date(a.time))
                    .map((check, index) => (
                      <tr key={check._id}>
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-gray-800 text-gray-800">
                            {check.type}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
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
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex justify-end">
                          <Link
                            to={`/checks/edit/${check._id}`}
                            className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            Assegna
                          </Link>
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
          ) : (
            ""
          )}
          <div className="border rounded-md mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                {checks
                  .sort((a, b) => new Date(b.time) - new Date(a.time))
                  .map((check, index) => (
                    <tr key={check._id}>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        <span
                          onClick={() =>
                            handleEditCheck(
                              check.isAssigned,
                              check.isCompleted,
                              check._id
                            )
                          }
                          className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-gray-800 text-gray-800 ${
                            check.isCompleted ? "bg-green-100" : ""
                          }`}
                        >
                          {check.type}
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
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
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex justify-end">
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
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Dashboard;
