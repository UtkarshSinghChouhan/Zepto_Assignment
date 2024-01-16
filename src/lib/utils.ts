import { IApiResponse } from "@/components/input-chip/input-chip";
import { useEffect, useState } from "react";

/**
 *
 * @param API
 * @param setUsers
 */
export const fetchData = (API: string) => {
  const [users, setUsers] = useState<Array<IApiResponse>>([]);

  const fetchUsers = async (API: string) => {
    try {
      let res = await fetch(API);
      let data = await res.json();

      if (data.length > 0) {
        setUsers(data);
      }

      console.log("Received Data -> ", data);
    } catch (err) {
      console.log("Erro -> " + err);
    }
  };

  useEffect(() => {
    fetchUsers(API);
  }, []);

  return { users, setUsers };
};
