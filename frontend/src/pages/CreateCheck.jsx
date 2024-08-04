import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { BASEURL } from "../config";
import { useNavigate } from "react-router-dom";

const CreateCheck = () => {
  const [type, setType] = useState("checkout");
  const [agent, setAgent] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveCheck = () => {
    const data = {
      type,
      agent,
      place,
      time,
    };
    setLoading(true);
    axios
      .post(`${BASEURL}/checks`, data)
      .then(() => {
        setLoading(false);
        navigate(-1);
      })
      .catch((error) => {
        alert("Controlla i campi");
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="p-4 flex flex-col space-y-4">
      <span className="mt-5 inline-flex items-center gap-x-1.5 rounded-full text-2xl font-medium">
        Crea nuovo
      </span>
      <p className="text-gray-600 text-xs mb-5">
        Per salvare un check-in o un check-out risulta necessario indicare la
        tipologia e la data, i dati restanti sono facoltativi.
      </p>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col space-y-4">
          <ul className="flex flex-col sm:flex-row">
            <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
              <div className="relative flex items-start w-full">
                <div className="flex items-center h-5">
                  <input
                    onClick={(e) => setType(e.target.value)}
                    defaultChecked
                    value="checkout"
                    id="list-group-checkin-2"
                    name="list-group-checkin"
                    type="radio"
                    className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
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
                    value="checkin"
                    id="list-group-checkin-1"
                    name="list-group-checkin"
                    type="radio"
                    className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
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
              type="datetime-local"
              className="w-[90vw] sm:w-full py-3 px-4 pe-11 h-12 border border-gray-200 rounded-lg text-sm "
            />
          </div>
          <label className="block text-sm text-gray-600 font-semibold">
            Informazioni Facoltative
          </label>
          {/*<div>
              <div className="relative">
                <InputMask
                  onChange={(e) => setPlace(e.target.value)}
                  mask="99-9-99-9a"
                  defaultValue="18-0-02-1A"
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
                    onClick={(e) => setAgent(e.target.value)}
                    value="giulia"
                    id="list-group-agent-1"
                    name="list-group-agent"
                    type="radio"
                    className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
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
                    value="giusy"
                    id="list-group-agent-2"
                    name="list-group-agent"
                    type="radio"
                    className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
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
                    value="raffa"
                    id="list-group-agent-3"
                    name="list-group-agent"
                    type="radio"
                    className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
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
              onClick={handleSaveCheck}
              type="button"
              className="text-center w-full py-3 px-4 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white"
            >
              Salva
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCheck;
