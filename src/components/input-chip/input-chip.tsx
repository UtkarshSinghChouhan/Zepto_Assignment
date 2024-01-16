"use client";

import { utils } from "@/lib/utils";
import { IApiResponse, api } from "@/models/interface-types";

import React, { useState } from "react";
import Chip from "../chip";

const InputChip = () => {
  const [show, setShow] = useState<boolean>(false);

  const [inputState, setInputState] = useState<string>("");

  const [selected, setSelected] = useState<Array<api>>([]);

  const API: string = "https://jsonplaceholder.typicode.com/users";

  // Fetching the DropDown
  const { users, handleClick, removeChip, handleKeyDown } = utils(API);

  // Filtering the dropdown based on query
  const res = users.filter((obj: api) =>
    obj?.name.toLowerCase().includes(inputState.toLowerCase())
  );

  return (
    <main className="w-full h-screen flex justify-center">
      {/* Input Chip */}
      <article className="h-fit mt-20 flex flex-col min-w-[400px] max-w-[800px]">
        {/* Input Feild with the Chips */}
        <div className="shadow-sm flex gap-5 flex-wrap border border-slate-300 py-2 px-3 rounded-lg">
          {/* Chip Components */}
          {selected.length !== 0 && (
            <>
              <div className="flex items-center gap-3 flex-wrap">
                {selected?.map((obj: api) => (
                  <Chip
                    key={obj?.id}
                    obj={obj}
                    selected={selected}
                    setSelected={setSelected}
                    removeChip={removeChip}
                  />
                ))}
              </div>
            </>
          )}

          <input
            value={inputState}
            onChange={(e) => {
              setInputState(e.target.value);
            }}
            type="text"
            placeholder={selected.length === 0 ? "Search User ..." : ""}
            onFocus={() => setShow(true)}
            onKeyDown={(e) =>
              handleKeyDown(e, inputState, selected, setSelected)
            }
            className="outline-none"
          />
        </div>

        {/* DropDown */}
        {show && (
          <>
            <ul className="shadow-md mt-2 border border-slate-300 rounded-xl px-4 py-3">
              {res.length === 0 ? (
                <li className="dropdown_tile">{`No Result Found`}</li>
              ) : (
                res.map((obj: api) => (
                  <li
                    key={obj?.id}
                    className="dropdown_tile"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(obj?.id as number, setSelected);
                    }}
                  >
                    {obj?.name}
                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </article>

      {/* Creator */}
      <div className="absolute text-sm  bottom-2 left-1/2 -translate-x-1/2 ">
        Made with 🩶 By{" "}
        <span style={{ fontFamily: "Croissant One" }}>
          Utkarsh Singh Chouhan
        </span>
      </div>
    </main>
  );
};

export default InputChip;
