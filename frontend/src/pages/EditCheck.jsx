import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { BASEURL } from "../config";

const EditCheck = () => {
  const [type, setType] = useState("checkout");
  const [agent, setAgent] = useState();
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASEURL}/checks/${id}`)
      .then((response) => {
        setType(response.data.type);
        setAgent(response.data.agent);
        setTime(response.data.time);
        setPlace(response.data.place);
        setIsCompleted(response.data.isCompleted);
        setLoading(false);
      })
      .catch((error) => {
        alert("Check console");
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleEditCheck = () => {
    const data = {
      type,
      agent,
      place,
      time,
      isCompleted,
    };
    setLoading(true);
    axios
      .put(`${BASEURL}/checks/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate(-1);
      })
      .catch((error) => {
        alert("Controlla i campi");
        // alert(JSON.stringify(data));
        setLoading(false);
        console.log(error);
      });
  };

  const handleDeleteCheck = () => {
    setLoading(true);
    axios
      .delete(`${BASEURL}/checks/${id}`)
      .then(() => {
        setLoading(false);
        navigate(-1);
      })
      .catch((error) => {
        alert("Errore");
        setLoading(false);
        console.log(error);
      });
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-4 flex flex-col space-y-4">
      <div className="flex justify-between align-end">
        <span className="mt-4 inline-flex items-center gap-x-1.5 rounded-full text-2xl font-medium">
          Modifica
        </span>

        <button
          onClick={handleDeleteCheck}
          type="button"
          className="text-center mt-auto flex-none h-10 px-8 text-sm font-medium rounded-lg border border-red-800 text-red-800"
        >
          Elimina
        </button>
      </div>

      <div className="flex flex-col space-y-4">
        <ul className="flex flex-col sm:flex-row">
          <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
            <div className="relative flex items-start w-full">
              <div className="flex items-center h-5">
                <input
                  onClick={(e) => setType(e.target.value)}
                  defaultChecked={type === "checkout"}
                  value="checkout"
                  id="list-group-checkin-2"
                  name="list-group-checkin"
                  type="radio"
                  className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:defaultChecked:bg-blue-500 dark:defaultChecked:border-blue-500 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="list-group-checkin-2"
                className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
              >
                Check OUT
              </label>
            </div>
          </li>
          <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
            <div className="relative flex items-start w-full">
              <div className="flex items-center h-5">
                <input
                  onClick={(e) => setType(e.target.value)}
                  defaultChecked={type === "checkin"}
                  value="checkin"
                  id="list-group-checkin-1"
                  name="list-group-checkin"
                  type="radio"
                  className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:defaultChecked:bg-blue-500 dark:defaultChecked:border-blue-500 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="list-group-checkin-1"
                className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
              >
                Check IN
              </label>
            </div>
          </li>
        </ul>
        <div className="w-full rounded-md bg-gray-200">
          <input
            onChange={(e) => {
              var date = new Date(e.target.value);
              date.toISOString();
              setTime(date);
            }}
            defaultValue={
              time
                ? (() => {
                    const date = new Date(time);
                    date.setHours(date.getHours() + 2); // Add 2 hours
                    return date.toISOString().slice(0, 16); // Format to YYYY-MM-DDTHH:MM
                  })()
                : ""
            }
            type="datetime-local"
            className="flex w-[90vw] sm:w-full py-3 px-4 pe-11 h-10 border border-gray-200 rounded-lg text-sm "
          />
        </div>
        <div
          className={`flex border py-3 px-4 border-green-600 rounded-md ${
            isCompleted ? "bg-green-100" : "bg-none"
          }`}
        >
          <input
            onClick={() => setIsCompleted(!isCompleted)}
            defaultChecked={isCompleted}
            type="checkbox"
            className="hidden shrink-0 mt-0.5 rounded text-green-600 focus:ring-green-500"
            id="checked-checkbox"
          />
          <label
            htmlFor="checked-checkbox"
            className="text-sm text-green-600 font-semibold ms-2 w-full"
          >
            {isCompleted ? "COMPLETATO" : "Segna come completato"}
          </label>
        </div>
        {/*<div>
              <div className="relative">
                <InputMask
                  onChange={(e) => setPlace(e.target.value)}
                  mask="99-9-99-9a"
                  maskPlaceholder="_"
                  alwaysShowMask
                  defaultValue={place}
                  className="py-3 px-4 pe-11 block w-full border border-gray-200 rounded-lg text-sm "
                />
                <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4 text-gray-500">
                  <IoHomeOutline />
                </div>
              </div>
            </div> */}
        <ul className="flex flex-col sm:flex-row">
          <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
            <div className="relative flex items-start w-full">
              <div className="flex items-center h-5">
                <input
                  onClick={() => setAgent(null)}
                  defaultChecked={!agent}
                  id="list-group-agent-0"
                  name="list-group-agent"
                  type="radio"
                  className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:defaultChecked:bg-blue-500 dark:defaultChecked:border-blue-500 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="list-group-agent-0"
                className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
              >
                Da assegnare
              </label>
            </div>
          </li>
          <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
            <div className="relative flex items-start w-full">
              <div className="flex items-center h-5">
                <input
                  onClick={(e) => setAgent(e.target.value)}
                  defaultChecked={agent === "giulia"}
                  value="giulia"
                  id="list-group-agent-1"
                  name="list-group-agent"
                  type="radio"
                  className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:defaultChecked:bg-blue-500 dark:defaultChecked:border-blue-500 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="list-group-agent-1"
                className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
              >
                Giulia
              </label>
            </div>
          </li>
          <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
            <div className="relative flex items-start w-full">
              <div className="flex items-center h-5">
                <input
                  onClick={(e) => setAgent(e.target.value)}
                  defaultChecked={agent === "giusy"}
                  value="giusy"
                  id="list-group-agent-2"
                  name="list-group-agent"
                  type="radio"
                  className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:defaultChecked:bg-blue-500 dark:defaultChecked:border-blue-500 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="list-group-agent-2"
                className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
              >
                Giusy
              </label>
            </div>
          </li>
          <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
            <div className="relative flex items-start w-full">
              <div className="flex items-center h-5">
                <input
                  onClick={(e) => setAgent(e.target.value)}
                  defaultChecked={agent === "raffa"}
                  value="raffa"
                  id="list-group-agent-3"
                  name="list-group-agent"
                  type="radio"
                  className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:defaultChecked:bg-blue-500 dark:defaultChecked:border-blue-500 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="list-group-agent-3"
                className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
              >
                Raffa
              </label>
            </div>
          </li>
        </ul>
        <div className="flex gap-5">
          <div
            onClick={() => navigate(-1)}
            className="text-center w-full py-3 px-4 text-sm font-medium rounded-lg border border-gray-800 text-gray-800"
          >
            Annulla
          </div>
          <button
            onClick={handleEditCheck}
            type="button"
            className="text-center w-full py-3 px-4 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white"
          >
            Salva
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCheck;
