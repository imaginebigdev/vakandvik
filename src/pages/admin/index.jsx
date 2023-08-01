import React, { useState } from "react";

import Logueo from "../logueo";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseVakandvik from "../../fb";
import Admin from "../../components/admin";

const auth = getAuth(firebaseVakandvik);

const HomeAdmin = () => {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuraioAdmin) => {
    if (usuraioAdmin) {
      setUsuarioGlobal(usuraioAdmin);
    } else {
      setUsuarioGlobal(null);
    }
  });
  return (
    <>
      {usuarioGlobal ? (
        <Admin correoUsuario={usuarioGlobal.email} />
      ) : (
        <Logueo />
      )}
    </>
  );
};

export default HomeAdmin;
