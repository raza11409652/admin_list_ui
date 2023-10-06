import React from "react";
import { getAdminsApi } from "../api/getadmins";
import { Admin } from "../types/admin";

export const useAdmins = () => {
  const [admins, setAdmins] = React.useState<Admin[]>([]);
  const [loader, setLoaders] = React.useState(false);

  React.useEffect(() => {
    setLoaders(true);
    getAdminsApi()
      .then((d) => setAdmins(d))
      .finally(() => setLoaders(false));
  }, []);
  function deleteFromList(ids: string[]) {
    const ab = admins.filter((a) => ids.includes(a.id) === false);
    setAdmins(ab);
  }

  return {
    admins,
    loader,
    deleteFromList,
  };
};
