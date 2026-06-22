import React, { useState, useEffect } from 'react';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    const verificarConexion = async () => {
      try {
        const response = await fetch(
  `${process.env.REACT_APP_API_URL}/health`
);

        if (response.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch (error) {
        setBackendStatus('offline');
      }
    };

    // Primera verificación
    verificarConexion();

    // Verificar cada 5 segundos
    const intervalo = setInterval(verificarConexion, 5000);

    // Limpiar intervalo al desmontar el componente
    return () => clearInterval(intervalo);

  }, []);

  const colores = {
    azulSoraka: '#00A3BF',
    verdeClinico: '#00B89C',
    azulMarino: '#172B4D',
    fondoGris: '#F4F6F9',
    rojoError: '#FF4D4D',
    blanco: '#FFFFFF'
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundColor: colores.fondoGris,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0
      }}
    >
      {/* CABECERA */}
      <header
        style={{
          backgroundColor: colores.blanco,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          padding: '15px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/IMG-20260620-WA0015.jpg"
            alt="Soraka P.G.S.C"
            style={{
              height: '60px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>

        <div
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: colores.azulMarino,
            backgroundColor: colores.fondoGris,
            padding: '8px 15px',
            borderRadius: '20px'
          }}
        >
          Fase III: Entregable de Infraestructura
        </div>
      </header>

      {/* CONTENIDO */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px'
        }}
      >
        <div
          style={{
            backgroundColor: colores.blanco,
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(23,43,77,0.08)',
            width: '100%',
            maxWidth: '550px',
            padding: '40px',
            textAlign: 'center'
          }}
        >
          <h2
            style={{
              color: colores.azulMarino,
              marginBottom: '10px',
              fontSize: '24px',
              fontWeight: '700'
            }}
          >
            Monitor de Orquestación y Red Virtual
          </h2>

          <p
            style={{
              color: '#6B778C',
              fontSize: '15px',
              marginBottom: '35px'
            }}
          >
            Estado de interconexión perimetral de los nodos bajo la red bridge
            de Docker Compose.
          </p>

          {/* SEMÁFORO */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              backgroundColor:
                backendStatus === 'online'
                  ? `${colores.verdeClinico}15`
                  : backendStatus === 'offline'
                  ? `${colores.rojoError}15`
                  : '#EDEDED',
              marginBottom: '25px'
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor:
                  backendStatus === 'online'
                    ? colores.verdeClinico
                    : backendStatus === 'offline'
                    ? colores.rojoError
                    : '#B3BAC5'
              }}
            />
          </div>

          {/* MENSAJES */}
          <div style={{ marginBottom: '30px' }}>
            {backendStatus === 'online' && (
              <div>
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: colores.verdeClinico
                  }}
                >
                  SISTEMA ONLINE
                </span>

                <p
                  style={{
                    color: '#4C5E7A',
                    fontSize: '14px',
                    marginTop: '5px'
                  }}
                >
                  El contenedor <strong>frontend</strong> se está comunicando
                  con éxito con el contenedor <strong>backend</strong>.
                </p>
              </div>
            )}

            {backendStatus === 'offline' && (
              <div>
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: colores.rojoError
                  }}
                >
                  CONEXIÓN INTERRUMPIDA
                </span>

                <p
                  style={{
                    color: '#4C5E7A',
                    fontSize: '14px',
                    marginTop: '5px'
                  }}
                >
                  El backend está fuera de línea o bloqueó la solicitud.
                </p>
              </div>
            )}

            {backendStatus === 'checking' && (
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#7A869A'
                }}
              >
                Verificando canal de datos...
              </span>
            )}
          </div>

          <hr
            style={{
              border: 'none',
              borderTop: '1px solid #E3E6EB',
              margin: '25px 0'
            }}
          />

          {/* DETALLES */}
          <div
            style={{
              textAlign: 'left',
              backgroundColor: '#F8F9FA',
              padding: '15px',
              borderRadius: '8px'
            }}
          >
            <div
              style={{
                fontSize: '13px',
                color: '#4C5E7A',
                marginBottom: '6px'
              }}
            >
              <strong>Origen del Tráfico:</strong> Container_Frontend (Puerto
              3000)
            </div>

            <div
              style={{
                fontSize: '13px',
                color: '#4C5E7A',
                marginBottom: '6px'
              }}
            >
              <strong>Destino del Tráfico:</strong> Container_Backend (Puerto
              8000)
            </div>

            <div style={{ fontSize: '13px', color: '#4C5E7A' }}>
              <strong>Topología de Red:</strong> Docker Bridge Network Privada
            </div>
          </div>
        </div>
      </main>

      {/* PIE DE PÁGINA */}
      <footer
        style={{
          backgroundColor: colores.azulMarino,
          color: colores.blanco,
          textAlign: 'center',
          padding: '15px',
          fontSize: '13px'
        }}
      >
        Desarrollado por la Fábrica de Software • CTMA Medellín • 2026
      </footer>
    </div>
  );
}

export default App;