import React, { useState } from "react";
import { Stack, Container, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import firebaseVakandvik from "../../fb";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseVakandvik);

const LogueoForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  async function submitHandler(e) {
    e.preventDefault();
    const correo = e.target.formBasicEmail.value;
    const contra = e.target.formBasicPassword.value;

    // Validar que ambos campos estén completos
    if (!correo || !contra) {
      Swal.fire({
        title: "Existen Campos Vacios",
        icon: "error",
        iconColor: "#d4034f",
        confirmButtonColor: "#d4034f",
        background: "#23252E",
        color: "#fff",
        confirmButtonText: "volver a intentar",
      });
      return;
    }

    // Validar formato del correo electrónico usando una expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      Swal.fire({
        title: "El correo electrónico NO es válido",
        icon: "error",
        iconColor: "#d4034f",
        confirmButtonColor: "#d4034f",
        background: "#23252E",
        color: "#fff",
        confirmButtonText: "volver a intentar",
      });
      return;
    }

    try {
      // Intentar iniciar sesión
      await signInWithEmailAndPassword(auth, correo, contra);
      // Si la autenticación es exitosa, puedes redirigir al usuario a otra página
      // usando la navegación de React Router o realizar alguna otra acción.
      console.log("Inicio de sesión exitoso!");
    } catch (error) {
      // En caso de error, mostrar mensaje de error
      Swal.fire({
        title: "Correo o Contraseña Incorrecto",
        icon: "error",
        iconColor: "#d4034f",
        confirmButtonColor: "#d4034f",
        background: "#23252E",
        color: "#fff",
        confirmButtonText: "volver a intentar",
      });
    }
  }
  return (
    <Container className="pt-100">
      <h1 className="fw-800 color-font mb-50" style={{ textAlign: "center" }}>
        Inicio de Sesión
      </h1>
      <Stack gap={3}>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingresá tu email" />
          </Form.Group>
          <Form.Group className="mb-3 pb-50" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"} // Mostrar como "text" o "password" según el estado de showPassword
              placeholder="Ingresá tu contraseña"
            />
            <Button
              variant="secondary"
              className="mt-3"
              onClick={toggleShowPassword}
              style={{ fontSize: "12px" }}
            >
              {showPassword ? "Ocultar Contraseña" : "Mostrar Contraseña"}
            </Button>
          </Form.Group>

          <Button variant="warning" type="submit">
            Iniciar Sesión
          </Button>
        </Form>
      </Stack>
    </Container>
  );
};

export default LogueoForm;
