import React, { useState, useEffect } from 'react';
import image1 from './assets/civil.avif';
import image2 from './assets/laboral.avif'; 
import image3 from './assets/familiar.avif';
import image4 from './assets/imagen1.jpg';
import heroBg from './assets/bghero.jpg';
import logoIcono from './assets/logo.png';

export default function EstudioAnaFernandez() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [motivo, setMotivo] = useState('');
  const [consulta, setConsulta] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
 
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleEnviarConsulta = async (e) => {
    e.preventDefault();
    setEnviando(true);

    // Mapeo de valores técnicos a etiquetas legibles para el mensaje
    const motivosLabels = {
      civil: "Derecho Civil (Contratos, Alquileres, Daños)",
      comercial: "Derecho Comercial & Societario",
      laboral_trabajador: "Derecho Laboral (Defensa del Trabajador)",
      laboral_empresa: "Asesoramiento Laboral Empresarial",
      familia: "Familia (Divorcios, Alimentos)",
      sucesiones: "Sucesiones y Herencias",
      otro: "Otro Motivo / Consulta General"
    };

    const motivoTexto = motivosLabels[motivo] || "No especificado";

    try {
      // --- PASO A: ENVÍO DE DATOS A FORMSPREE
      const FORMSPREE_ID = "mrewdbwv"; // Reemplazar por el tuyo o el de la Dra.
      
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre,
          telefono: telefono,
          motivo: motivoTexto,
          mensaje: consulta
        })
      });

      // --- PASO B: REDIRECCIÓN A WHATSAPP
      const numeroDra = "5493757449422"; 

      let mensajeWhatsApp = `⚖️ *NUEVA CONSULTA LEGAL - DRA. ANA FERNÁNDEZ*\n\n`;
      mensajeWhatsApp += `👤 *Cliente:* ${nombre}\n`;
      mensajeWhatsApp += `📞 *Teléfono:* ${telefono}\n`;
      mensajeWhatsApp += `📂 *Área:* ${motivoTexto}\n\n`;
      mensajeWhatsApp += `💬 *Consulta:* \n"${consulta}"\n\n`;
      mensajeWhatsApp += `⏳ _Enviado automáticamente desde la plataforma web._`;

      const mensajeEncriptado = encodeURIComponent(mensajeWhatsApp);
      window.open(`https://wa.me/${numeroDra}?text=${mensajeEncriptado}`, '_blank');

      // Limpiar el formulario tras el envío exitoso
      setNombre('');
      setTelefono('');
      setMotivo('');
      setConsulta('');
      setMostrarModalExito(true);

    } catch (error) {
      console.error("Error al despachar la consulta:", error);
      alert("Hubo un inconveniente al procesar tu consulta, por favor intenta directamente por WhatsApp.");
    } finally {
      setEnviando(false);
    }
  };

  
  const especialidades = [
    { 
      titulo: "Derecho de Familia", 
      desc: "Abordaje integral en procesos de divorcio, responsabilidad parental, fijación de cuotas alimentarias, regímenes de comunicación y protección ante situaciones de violencia familiar.",
      imagen: image3 // Vinculá tu variable de imagen correspondiente
    },
    { 
      titulo: "Derecho Civil y Sucesiones", 
      desc: "Gestión experta en redacción y revisión de contratos, demandas por daños y perjuicios, juicios sucesorios, declaratorias de herederos y planificación patrimonial eficaz.",
      imagen: image1 // Vinculá tu variable de imagen correspondiente
    },
    { 
      titulo: "Derecho Penal (Derivado)", 
      desc: "Asistencia jurídica estratégica y defensa técnica en el fuero penal, brindando soluciones eficaces derivadas de contingencias patrimoniales, familiares o contractuales.",
      imagen: image2 // Vinculá tu variable de imagen correspondiente
    },
  ];

  useEffect(() => {
    if (menuAbierto) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Limpieza al desmontar el componente por seguridad
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [menuAbierto]);

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-800 font-sans antialiased">
      
      <nav className="border-b border-slate-200/60 bg-white/90 backdrop-blur sticky top-0 z-50 shadow-xs w-full transition-all duration-300">
      
        {/* CONTENEDOR PRINCIPAL INTERNO */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">
          
          {/* IZQUIERDA: LOGO Y NOMBRE */}
          <a href="#hero" className="flex items-center gap-2 sm:gap-3 group cursor-pointer shrink-0">
            <img 
              src={logoIcono} 
              alt="Logo A|F & Asociados" 
              className="w-8 h-8 sm:w-10 lg:w-11 h-auto object-contain transition-transform duration-300 group-hover:scale-102" 
            />
            <div className="flex flex-col">
              <span className="text-sm sm:text-lg lg:text-xl font-serif font-bold tracking-wide text-amber-400 uppercase leading-none">
                A|F & Asociados
              </span>
              <span className="text-[8px] sm:text-[10px] lg:text-xs font-medium tracking-widest text-slate-900 font-sans uppercase mt-0.5 lg:mt-1 leading-none">
                Estudio Jurídico
              </span>
            </div>
          </a>

          {/* CENTRO: ENLACES INTERNOS (Ocultos hasta pantallas grandes 'lg') */}
          <div className="hidden lg:flex items-center justify-center lg:gap-8 mx-4">
            <a href="#sobre-mi" className="text-slate-600 hover:text-amber-600 text-sm font-medium transition-colors whitespace-nowrap">
              Sobre Mí
            </a>
            <a href="#academia" className="text-slate-600 hover:text-amber-600 text-sm font-medium transition-colors whitespace-nowrap">
              Formación Académica
            </a>
            <a href="#especialidades" className="text-slate-600 hover:text-amber-600 text-sm font-medium transition-colors whitespace-nowrap">
              Especialidades
            </a>
            <a href="#porqueelegirnos" className="text-slate-600 hover:text-amber-600 text-sm font-medium transition-colors whitespace-nowrap">
              Por qué elegirnos
            </a>
          </div>

          {/* DERECHA: WHATSAPP Y HAMBURGUESA */}
          <div className="shrink-0 flex items-center gap-2">
            <a 
              href="https://wa.me/5493757449422?text=Hola%20Dra.%20Ana%20Fernandez..."
              target="_blank"
              rel="noreferrer"
              className="inline-block whitespace-nowrap border border-amber-400/40 bg-linear-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500 hover:to-amber-600 hover:text-white text-amber-700 font-bold rounded-md transition-all uppercase tracking-wider cursor-pointer
                        text-[10px] sm:text-xs px-2.5 py-1.5 sm:px-4 sm:py-2"
            >
              WhatsApp <span className="hidden sm:inline">Directo</span>
            </a>

            {/* BOTÓN HAMBURGUESA INTERACTIVO (Visible en móvil y tablet) */}
            <button 
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="lg:hidden p-1.5 text-slate-600 hover:text-amber-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer" 
              aria-label="Toggle menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuAbierto ? (
                  // Icono X (Cerrar)
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Icono Hamburguesa (Abrir)
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* MENÚ DESPLEGABLE MÓVIL/TABLET (Animado por estado de React) */}
        <div className={`lg:hidden border-t border-slate-100 bg-white transition-all duration-300 overflow-hidden ${menuAbierto ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          {/* Agregamos "items-end" para tirar los elementos a la derecha */}
          <div className="px-6 pt-2.5 pb-4 flex flex-col items-end gap-3 shadow-inner">
            <a 
              href="#sobre-mi" 
              onClick={() => setMenuAbierto(false)}
              className="text-slate-600 hover:text-amber-600 text-xs sm:text-sm font-medium py-1.5 border-b border-slate-50 transition-colors w-full text-right"
            >
              Sobre Mí
            </a>
            <a 
              href="#academia" 
              onClick={() => setMenuAbierto(false)}
              className="text-slate-600 hover:text-amber-600 text-xs sm:text-sm font-medium py-1.5 border-b border-slate-50 transition-colors w-full text-right"
            >
              Formación Académica
            </a>
            <a 
              href="#especialidades" 
              onClick={() => setMenuAbierto(false)}
              className="text-slate-600 hover:text-amber-600 text-xs sm:text-sm font-medium py-1.5 border-b border-slate-50 transition-colors w-full text-right"
            >
              Especialidades
            </a>
            <a 
              href="#porqueelegirnos" 
              onClick={() => setMenuAbierto(false)}
              className="text-slate-600 hover:text-amber-600 text-xs sm:text-sm font-medium py-1.5 transition-colors w-full text-right"
            >
              Por qué elegirnos
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION CON IMAGEN DE FONDO */}
      <header 
        className="scroll-mt-20 relative bg-cover bg-center bg-no-repeat py-11 sm:py-32 px-4 sm:px-6 text-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        id='hero'
      >
        {/* Capa superpuesta (Overlay) para oscurecer el fondo y dar contraste al texto */}
        <div className="absolute inset-0 bg-slate-950/35 backdrop-blur-xs"></div>

        {/* Contenido del Hero: Usamos 'relative z-10' para que quede por encima del overlay */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-6">
          <div className="w-12 h-[2px] bg-amber-500 mb-2"></div>
          
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-white leading-tight max-w-4xl flex flex-col gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm font-sans font-bold text-amber-400 uppercase tracking-widest block">
                Estudio Jurídico Integral
              </span>
              <span>
                Dra. Ana Fernández
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl font-sans font-medium text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-amber-300 to-slate-200 normal-case tracking-normal">
                Abogada • Directora de A|F & Asociados
              </span>
            </h1>
          
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed">
            Defendemos sus derechos con la máxima rigurosidad técnica y humana. Un enfoque moderno y eficiente adaptado a sus necesidades jurídicas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <a 
              href="#especialidades" 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm px-6 py-3 rounded-lg shadow-md transition-all text-center"
            >
              Áreas de Práctica
            </a>
            <a 
              href="#contacto" 
              className="border border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3 rounded-lg backdrop-blur-xs transition-all text-center"
            >
              Iniciar Consulta Online
            </a>
          </div>
        </div>
      </header>

        {/* SECCIÓN 1: SOBRE MÍ (PERFIL ACTUAL Y EJERCICIO PROFESIONAL) */}
        <section id="sobre-mi" className="scroll-mt-52 sm:scroll-mt-28 lg:scroll-mt-18 bg-white py-18 px-4 sm:px-6 border-t border-slate-100">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Foto de perfil */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start gap-4">
              <div className="w-full max-w-[260px] md:max-w-full aspect-3/4 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-md relative">
                <img 
                  src={image4} 
                  alt="Dra. Ana Fernández" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-amber-500"></div>
              </div>
            </div>

            {/* Texto Institucional Ajustado */}
            <div className="md:col-span-8 flex flex-col gap-4.5 text-center md:text-left">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Dirección del Estudio</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">Dra. Ana Fernández</h2>
                <p className="text-amber-600 text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">Abogada</p>
              </div>
              
              <div className="h-[2px] w-12 bg-amber-500 mx-auto md:mx-0 my-1"></div>
              
              <div className="text-slate-600 text-xs sm:text-sm leading-relaxed flex flex-col gap-4 text-justify md:text-left">
                <p>
                  La Dra. Ana Fernández es directora de <strong className="text-slate-900">A|F & Asociados</strong>, un estudio jurídico comprometido con la excelencia, la innovación y la defensa integral de los derechos de sus clientes.
                </p>
                <p>
                  Actualmente, su ejercicio profesional se concentra con especial énfasis en las áreas de <strong className="text-slate-900">Derecho de Familia, Derecho Civil y Sucesiones</strong>, brindando además un respaldo estratégico en materia <strong className="text-slate-900">Penal</strong> como fuero derivado. Su enfoque se caracteriza por una atención personalizada y un profundo compromiso con cada caso.
                </p>
                <p>
                  En <strong className="text-slate-900">A|F & Asociados</strong> entendemos que detrás de cada expediente hay una historia que merece ser escuchada y defendida con seriedad, compromiso y excelencia. Por ello, trabajamos con un único objetivo: ofrecer a cada cliente la mejor estrategia jurídica para proteger sus derechos y alcanzar resultados concretos.
                </p>
              </div>

              <div className="mt-2 text-center md:text-left">
                <p className="text-amber-700 font-serif italic text-xs sm:text-sm font-medium">
                  Excelencia jurídica. Compromiso absoluto. Confianza construida sobre resultados.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* SECCIÓN 2: APARTADO DE FORMACIÓN ACADÉMICA COMPLETA */}
        <section id="academia" className="scroll-mt-48 sm:scroll-mt-28 lg:scroll-mt-24 bg-slate-50 py-16 sm:py-20 px-4 sm:px-6 border-t border-slate-200/60">
          <div className="max-w-5xl mx-auto flex flex-col gap-10">
            
            {/* Título del apartado */}
            <div className="text-center md:text-left">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Trayectoria y Credenciales</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">Formación Académica</h2>
              <div className="h-[2px] w-12 bg-amber-500 mt-2 mx-auto md:mx-0"></div>
            </div>

            {/* Distribución de Títulos */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Bloque Izquierdo: Grado, Postgrados y Docencia */}
              <div className="md:col-span-7 flex flex-col gap-4">
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs flex flex-col gap-4">
                  
                  <ul className="text-slate-500 text-[11px] sm:text-xs flex flex-col gap-3 list-none">
                    <li className="flex items-start gap-2.5">
                      <span className="text-amber-500 shrink-0 mt-0.5">🎓</span>
                      <span><strong className="text-slate-700 block">Títulos de Grado:</strong> Abogada (Universidad Católica de Salta, 2016) • Escribana (Universidad Gastón Dachary, 2017).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-amber-500 shrink-0 mt-0.5">⚖️</span>
                      <span><strong className="text-slate-700 block">Especialización Jurídica:</strong> Especialista en Derecho Procesal (Universidad Gastón Dachary, 2018).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-amber-500 shrink-0 mt-0.5">👨‍🏫</span>
                      <span><strong className="text-slate-700 block">Formación en Docencia:</strong> Capacitación y competencias en Docencia Superior Universitaria (UCASAL).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-amber-500 shrink-0 mt-0.5">🌍</span>
                      <span><strong className="text-slate-700 block">Diplomado Internacional:</strong> Defensa Internacional de Derechos Humanos (Univ. de Alcalá, Univ. de Zaragoza y CLADH, 2017).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-amber-500 shrink-0 mt-0.5">⏳</span>
                      <span><strong className="text-slate-700 block">Estudios de Maestría (En Curso):</strong> Maestría en Derecho de Familia, Niñez y Adolescencia (Facultad de Derecho y Ciencias Políticas - UNNE).</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bloque Derecho: Consejo de la Magistratura */}
              <div className="md:col-span-5">
                <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-2xl flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-xl">
                    🏅
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="bg-amber-500/20 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider self-start">
                      Respaldo Institucional
                    </span>
                    <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                      Su destacada trayectoria profesional fue reconocida por el Consejo de la Magistratura de la Provincia de Misiones, al integrar la terna oficial para el cargo de Defensora Oficial de Primera Instancia...
                    </p>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      ...distinción que refleja su excelencia académica, capacidad técnica y vocación por el servicio de justicia.
                    </p>
                    <blockquote className="border-l-2 border-amber-500 pl-3 italic text-slate-500 text-[11px] bg-white/60 p-2 rounded-r-md mt-1">
                      "Conoce la materia y la función a la que se postula. Acredita formación y vocación." 
                      <span className="block text-slate-400 not-italic text-[10px] mt-1">— Res. Pl. CM Nº 17/24.</span>
                    </blockquote>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

          {/* DIVISOR ELEGANTE DESVANECIDO EN LOS LATERALES */}
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
            <div className="h-[3px] w-full bg-linear-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>

        {/* SECCIÓN ESPECIALIDADES CON FOTOS */}
        <section id="especialidades" className="scroll-mt-48 sm:scroll-mt-28 lg:scroll-mt-20 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-20 border-t border-slate-100">
          <div className="text-center sm:text-left mb-12">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-2">Servicios Profesionales</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">Especialidades del Estudio</h2>
          </div>

          {/* Grilla responsiva: 1 col en celu, 3 en PC */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {especialidades.map((esp, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/70 rounded-2xl overflow-hidden hover:shadow-xl hover:border-amber-500/30 transition-all flex flex-col group shadow-xs"
              >
                {/* Contenedor de la Foto */}
                <div className="h-40 bg-slate-100 relative overflow-hidden">
                  <img 
                    src={esp.imagen} 
                    alt={esp.titulo} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {/* Número elegante flotando sobre la foto */}
                  <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-white text-xs font-serif px-2.5 py-1 rounded-md">
                    0{idx + 1}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-amber-500"></div>
                </div>

                {/* Cuerpo de la tarjeta */}
                <div className="p-6 flex flex-col gap-2 flex-grow">
                  <h3 className="font-serif font-bold text-lg text-slate-900 tracking-tight leading-snug">
                    {esp.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {esp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

           {/* DIVISOR ELEGANTE DESVANECIDO EN LOS LATERALES */}
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
            <div className="h-[3px] w-full bg-linear-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>

        {/* SECCIÓN: POR QUÉ ELEGIR EL ESTUDIO */}
        <section id='porqueelegirnos' className="scroll-mt-48 bg-slate-50 py-18 px-4 sm:px-6 border-t border-slate-100">
          <div className="max-w-5xl mx-auto flex flex-col gap-12">
            
            {/* Título */}
            <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Nuestros Valores</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                ¿Por qué elegir nuestro respaldo jurídico?
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Un servicio legal basado en la solidez técnica, la actualización académica rigurosa y la total transparencia institucional.
              </p>
            </div>

            {/* Grilla de los 3 pilares */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Pilar 1 */}
              <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs flex flex-col items-center md:items-start text-center md:text-left gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-lg shadow-2xs">
                  ⚖️
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-base">
                  Enfoque Estratégico Real
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Soluciones eficaces y personalizadas orientadas a resultados concretos. Cada caso es analizado bajo una estricta perspectiva procesal avanzada.
                </p>
              </div>

              {/* Pilar 2 */}
              <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs flex flex-col items-center md:items-start text-center md:text-left gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-lg shadow-2xs">
                  🎓
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-base">
                  Formación de Postgrado
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Actualización científica permanente respaldada por estudios avanzados en Derecho Procesal, Docencia Universitaria y una Maestría en curso en Familia y Niñez.
                </p>
              </div>

              {/* Pilar 3 */}
              <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs flex flex-col items-center md:items-start text-center md:text-left gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-lg shadow-2xs">
                  🏅
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-base">
                  Idoneidad Certificada
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Reconocimiento técnico externo e institucional avalado por el Consejo de la Magistratura al haber integrado la terna oficial para la magistratura provincial.
                </p>
              </div>

            </div>
          </div>
        </section>        

        {/* SECCIÓN CONTACTO: FORMULARIO INTERACTIVO AVANZADO */}
        <section id="contacto" className="scroll-mt-12 sm:scroll-mt-28 lg:scroll-mt-18 bg-slate-900 text-white py-16 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-8 relative z-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Contacto Directo</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold">Consulte su caso de forma confidencial</h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
                Complete los datos de su caso para asignarle una entrevista presencial o virtual con el profesional idóneo.
              </p>
            </div>

            <form onSubmit={handleEnviarConsulta} className="bg-slate-800 border border-slate-700/60 p-6 sm:p-8 rounded-2xl text-left flex flex-col gap-5 shadow-xl">
              
              {/* Nombre y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Nombre Completo</label>
                  <input 
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Teléfono de Contacto</label>
                  <input 
                    type="tel"
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ej: 3757 123456"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              {/* Selector de Área Legal */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Motivo Principal de la Consulta</label>
                <div className="relative">
                  <select 
                    required
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-amber-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled hidden>Seleccione el área correspondiente...</option>
                    <option value="civil">Derecho Civil (Contratos, Alquileres, Daños)</option>
                    <option value="comercial">Derecho Comercial & Societario</option>
                    <option value="laboral_trabajador">Derecho Laboral (Defensa del Trabajador / Despido)</option>
                    <option value="laboral_empresa">Asesoramiento Laboral Empresarial</option>
                    <option value="familia">Familia (Divorcios, Alimentos, Régimen de Visitas)</option>
                    <option value="sucesiones">Sucesiones y Herencias</option>
                    <option value="otro">Otro Motivo / Consulta General</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-amber-500">
                    ▼
                  </div>
                </div>
              </div>

              {/* Detalle de la consulta */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Breve descripción de su situación legal</label>
                <textarea 
                  rows="4"
                  required
                  value={consulta}
                  onChange={(e) => setConsulta(e.target.value)}
                  placeholder="Escriba los detalles relevantes de su caso para que podamos asesorarlo mejor..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 transition-all resize-none"
                />
              </div>

              {/* Botón de envío */}
              <button 
                type="submit"
                disabled={enviando}
                className={`w-full text-slate-950 font-bold text-xs sm:text-sm py-4 rounded-xl transition-all shadow-md uppercase tracking-wider mt-2 cursor-pointer ${
                  enviando 
                    ? 'bg-amber-600/50 text-slate-700 cursor-not-allowed' 
                    : 'bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                }`}
              >
                {enviando ? "Procesando Solicitud..." : "Solicitar Evaluación de Caso"}
              </button>
            </form>
          </div>
        </section>


        {/* SECCIÓN: UBICACIÓN / GOOGLE MAPS */}
        <section className="bg-white py-16 px-4 sm:px-6 border-t border-slate-200/60">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Texto de información de la oficina */}
            <div className="flex flex-col gap-4 text-center md:text-left">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Nuestra Oficina</span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                Atención Presencial
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-md mx-auto md:mx-0">
                Lo esperamos en nuestras oficinas para coordinar una entrevista y evaluar los detalles de su situación legal con absoluta privacidad.
              </p>
              
              {/* Datos rápidos de contacto estilo elegante */}
              <div className="flex flex-col gap-2 mt-2 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-amber-600">📍</span>
                  <span>Horacio Quiroga 63, N3370 Puerto Iguazú, Misiones</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-amber-600">⏰</span>
                  <span>Lunes a Viernes de 08:00 a 16:00 hs</span>
                </div>
              </div>
            </div>

            {/* El Mapa de Google Maps estilizado */}
            <div className="bg-linear-to-b from-slate-100 to-slate-200/50 p-3 rounded-2xl border border-slate-200 shadow-xs relative group">
              {/* Detalle dorado decorativo en la esquina superior del mapa */}
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-amber-500 rounded-tr-xl pointer-events-none transition-all group-hover:w-70 group-hover:h-50"></div>
              
              <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden shadow-2xs">
                <iframe
                  title="Ubicación del Estudio Jurídico"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14392.345678901234!2d-54.5750000!3d-25.6000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM2JzAwLjAiUyA1NLCwMzQnMzAuMCJX!5e0!3m2!1ses-419!2sar!4v1234567890123"
                  className="w-full h-full border-0 grayscale-[20%] contrast-[110%]"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>
        </section>
          
             {/* DIVISOR ELEGANTE DESVANECIDO EN LOS LATERALES */}
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
            <div className="h-[3px] w-full bg-linear-to-r from-transparent via-amber-500 to-transparent"></div>
          </div> 

          {/* SECCIÓN: REDES SOCIALES */}
          <section className="bg-slate-50 py-20 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
              
              {/* Textos de la sección */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Canales de Comunicación</span>
                <h3 className="font-serif font-bold text-2xl text-slate-900">
                  Síganos en nuestras redes
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
                  Compartimos novedades legales, análisis de normativas actuales y el día a día de nuestro estudio jurídico.
                </p>
              </div>

              {/* Contenedor de íconos de Redes Sociales */}
              <div className="flex justify-center items-center gap-6 mt-2">
                
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/dra_anafernandez/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-slate-950 border border-amber-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-amber-500 shadow-xs group cursor-pointer"
                  aria-label="Instagram del Estudio"
                >
                  <i className="fa-brands fa-instagram text-xl text-slate-300 group-hover:text-amber-500 transition-colors duration-300"></i>
                </a>

                {/* LinkedIn (Fundamental para Abogados) */}
                <a 
                  href="https://www.linkedin.com/in/dra-ana-fern%C3%A1ndez-43601221b/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-slate-950 border border-amber-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-amber-500 shadow-xs group cursor-pointer"
                  aria-label="LinkedIn del Estudio"
                >
                  <i className="fa-brands fa-linkedin-in text-xl text-slate-300 group-hover:text-amber-500 transition-colors duration-300"></i>
                </a>

                {/* Facebook */}
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-slate-950 border border-amber-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-amber-500 shadow-xs group cursor-pointer"
                  aria-label="Facebook del Estudio"
                >
                  <i className="fa-brands fa-facebook-f text-lg text-slate-300 group-hover:text-amber-500 transition-colors duration-300"></i>
                </a>

              </div>
            </div>
          </section>    

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-8 px-4 sm:px-6 border-t border-slate-900 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-slate-400 hover:text-amber-400 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-amber-500/40 transition-colors">
              ▲
              </span>
              Volver arriba
            </button>
          </div>

            <div className="text-center text-[11px] text-slate-500 font-medium">
              &copy; {new Date().getFullYear()} Estudio Jurídico <span className="text-slate-300">Dra. Ana Fernández</span>. Todos los derechos reservados. Desarrollado por <span> <a href="https://portfolio-royf.vercel.app/" target="_blank" rel="noreferrer" className="text-amber-500 hover:text-amber-400 underline">Roy Frey</a></span>
            </div>
            <div className="hidden md:block w-40 text-[12px] text-slate-600 font-mono">
              ⚖️ Mat. Profesional N° 12345 - Misiones, Argentina.
            </div>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE DE WHATSAPP ELEGANTE */}
      <a 
        href="https://wa.me/5493757449422?text=Hola%20Dra.%20Ana%20Fernandez%2C%20vi%20el%20boceto%20de%20su%20sitio%20web%20y%20me%20gustar%C3%ADa%20realizar%20una%20consulta%20legal.%20Quedo%20atento%2Fa%20para%20coordinar%20una%20entrevista.%20Muchas%20gracias."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-18 right-6 z-50 w-14 h-14 bg-white border border-amber-500/80 rounded-full shadow-xl hover:shadow-amber-500/20 hover:scale-110 transition-all duration-300 flex items-center justify-center text-xl group cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        {/* Sutil efecto de pulso dorado rodeando el botón */}
        <span className="absolute inset-0 rounded-full bg-amber-500/10 animate-ping pointer-events-none group-hover:bg-amber-500/20"></span>
        <i className="fa-brands fa-whatsapp text-2xl text-amber-500 relative z-10 filter drop-shadow-sm group-hover:rotate-12 transition-transform duration-300"></i>
      </a>

      {/* MODAL DE ÉXITO ESTILIZADO */}
      {mostrarModalExito && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-800 border border-slate-700 max-w-md w-full rounded-2xl p-6 text-center shadow-2xl relative flex flex-col gap-4">
            
            {/* Icono de balanza / éxito */}
            <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto text-2xl border border-amber-500/20">
              ⚖️
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-serif font-bold text-white">Consulta Recibida</h3>
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest">Estudio Jurídico Dra. Ana Fernández</p>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Los detalles de su caso han sido registrados en nuestro sistema de forma estrictamente confidencial. Se ha enviado una copia a nuestro correo oficial y se ha generado la comunicación vía WhatsApp.
            </p>

            <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-3 text-left text-[11px] text-slate-400">
              <span className="font-bold text-slate-300 block mb-1">Próximo paso:</span>
              Evaluaremos la información provista para asignarle una entrevista presencial o virtual a la brevedad.
            </div>

            <button
              onClick={() => setMostrarModalExito(false)}
              className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs py-3 rounded-xl uppercase tracking-wider transition-all shadow-md cursor-pointer mt-2"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}