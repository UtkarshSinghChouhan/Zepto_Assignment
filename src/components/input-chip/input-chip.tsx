"use client";

import { fetchData } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

export interface IApiResponse {
  id: number;
  name: string;
}

type api = IApiResponse | undefined;

const InputChip = () => {
  const [show, setShow] = useState<boolean>(false);

  const [inputState, setInputState] = useState<string>("");

  const [selected, setSelected] = useState<Array<api>>([]);

  const API: string = "https://jsonplaceholder.typicode.com/users";
  const { users, setUsers } = fetchData(API);

  const handleClick = (id: number) => {
    const res = users.find((obj: { id: number }) => id === obj?.id);
    setSelected((pre) => {
      return [...pre, res];
    });

    const filteredUser = users.filter((obj: IApiResponse) => id !== obj?.id);
    setUsers(filteredUser);
  };

  const removeChip = (rmObj: IApiResponse) => {
    const filteredUser = selected.filter((obj: api) => rmObj?.id !== obj?.id);
    setSelected(filteredUser);

    setUsers((pre) => {
      return [rmObj, ...pre];
    });
  };

  return (
    <main className="w-full h-screen flex justify-center">
      <article className="h-fit mt-20 flex flex-col w-[400px] max-w-[450px]">
        <div className="shadow-sm flex gap-5 flex-wrap border border-slate-300 py-2 px-3 rounded-lg">
          {selected.length !== 0 && (
            <>
              <div className="flex items-center gap-5 flex-wrap">
                {selected?.map((obj: api) => (
                  <div className="flex gap-2 hover:bg-slate-200 items-center bg-slate-100 border border-slate-200 rounded-full px-4 py-2 shadow-sm">
                    <span className=" whitespace-nowrap inline-block text-sm font-medium cursor-default">
                      {obj?.name}
                    </span>
                    <span
                      className="rounded-full p-2 text-xs font-normal hover:font-medium inline-block hover:bg-slate-300 bg-slate-200 cursor-pointer"
                      onClick={() => removeChip(obj as IApiResponse)}
                    >
                      <Image
                        src={`/cross-svgrepo-com.svg`}
                        alt={`cross`}
                        width={7}
                        height={7}
                      />
                    </span>
                  </div>
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
            className="outline-none"
          />
        </div>

        {show && (
          <>
            <ul className="shadow-md mt-2 border border-slate-300 rounded-xl px-4 py-3">
              {users
                .filter((obj: IApiResponse) =>
                  obj?.name.toLowerCase().includes(inputState.toLowerCase())
                )
                .map((obj: IApiResponse) => (
                  <li
                    key={obj?.id}
                    className="cursor-pointer border-b border-b-slate-300 py-[6px] hover:bg-slate-200 rounded-lg text-base font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(obj?.id);
                    }}
                  >
                    {obj?.name}
                  </li>
                ))}
            </ul>
          </>
        )}
      </article>

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
