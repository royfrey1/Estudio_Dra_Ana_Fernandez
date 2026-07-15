import React, { useState, useEffect } from 'react';
import image1 from './assets/civil.jpg';
import image2 from './assets/penal.avif'; 
import image3 from './assets/familia.avif';
import image4 from './assets/imagen1.jpg';
import heroBg from './assets/bg4.png';
import logoIcono from './assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faUser, faLock, faCircleChevronUp, faBullseye, faScaleBalanced, faComments, faHandshakeAngle, faBolt, faUsers, faFileSignature, faGavel, faGraduationCap, faAward } from '@fortawesome/free-solid-svg-icons';


export default function EstudioAnaFernandez() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [motivo, setMotivo] = useState('');
  const [consulta, setConsulta] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
 
  const [mostrarPoliticas, setMostrarPoliticas] = useState(false);

  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleEnviarConsulta = async (e) => {
    e.preventDefault();
    setEnviando(true);

    // Mapeo de valores técnicos a etiquetas legibles alineado con las especialidades de la Dra.
    const motivosLabels = {
      familia: "Derecho de Familia (Divorcios, Alimentos, Cuidado Personal)",
      sucesiones: "Sucesiones y Herencias",
      civil: "Derecho Civil (Sucesiones, Contratos, Daños y Perjuicios)",
      penal: "Asistencia / Defensa Penal",
      otro: "Otro Motivo / Consulta General"
    };

    const motivoTexto = motivosLabels[motivo] || "No especificado";

    try {
      // --- REDIRECCIÓN DIRECTA A WHATSAPP ---
      const numeroDra = "5493757449422"; 

      let mensajeWhatsApp = `⚖️ *NUEVA CONSULTA LEGAL - DRA. ANA FERNÁNDEZ*\n\n`;
      mensajeWhatsApp += `👤 *Cliente:* ${nombre}\n`;
      mensajeWhatsApp += `📞 *Teléfono:* ${telefono}\n`;
      mensajeWhatsApp += `📂 *Área:* ${motivoTexto}\n\n`;
      mensajeWhatsApp += `💬 *Consulta:* \n"${consulta}"\n\n`;
      mensajeWhatsApp += `⏳ _Enviado desde la plataforma web._`;

      const mensajeEncriptado = encodeURIComponent(mensajeWhatsApp);
      window.open(`https://wa.me/${numeroDra}?text=${mensajeEncriptado}`, '_blank');

      // Limpiar el formulario tras la redirección exitosa
      setNombre('');
      setTelefono('');
      setMotivo('');
      setConsulta('');
      
      // Si usás el modal de éxito, lo dejamos activo. Si no, lo podés comentar/borrar.
      if (typeof setMostrarModalExito === 'function') {
        setMostrarModalExito(true);
      }

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

  // Evitar que el fondo haga scroll cuando el modal está abierto
  useEffect(() => {
    if (mostrarPoliticas) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Limpieza por si el componente se desmonta inesperadamente
    return () => {
      document.body.style.overflow = '';
    };
  }, [mostrarPoliticas]);

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
            <a href="#especialidades" className="text-slate-600 hover:text-amber-600 text-sm font-medium transition-colors whitespace-nowrap">
              Especialidades
            </a>
            <a href="#porqueelegirnos" className="text-slate-600 hover:text-amber-600 text-sm font-medium transition-colors whitespace-nowrap">
              Por qué elegirnos
            </a>
            <a href="#ubicacion" className="text-slate-600 hover:text-amber-600 text-sm font-medium transition-colors whitespace-nowrap">
              Ubicacion
            </a>
          </div>

          {/* DERECHA: WHATSAPP Y HAMBURGUESA */}
          <div className="shrink-0 flex items-center gap-2">
            <a 
              href="https://wa.me/5493757449422?text=Hola%20Dra.%20Ana%20Fernandez..."
              target="_blank"
              rel="noreferrer"
              className="inline-block whitespace-nowrap border border-amber-400/40 bg-linear-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500 hover:to-amber-600 hover:text-white text-amber-700 font-bold rounded-md transition-all uppercase tracking-wider cursor-pointer
                        text-[10px] sm:text-xs px-1 py-1.5 sm:px-4 sm:py-2"
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
              href="#especialidades" 
              onClick={() => setMenuAbierto(false)}
              className="text-slate-600 hover:text-amber-600 text-xs sm:text-sm font-medium py-1.5 border-b border-slate-50 transition-colors w-full text-right"
            >
              Especialidades
            </a>
            <a 
              href="#porqueelegirnos" 
              onClick={() => setMenuAbierto(false)}
              className="text-slate-600 hover:text-amber-600 text-xs sm:text-sm font-medium py-1.5 border-b border-slate-50 transition-colors w-full text-right"
            >
              Porque elegirnos
            </a>
            <a 
              href="#ubicacion" 
              onClick={() => setMenuAbierto(false)}
              className="text-slate-600 hover:text-amber-600 text-xs sm:text-sm font-medium py-1.5 transition-colors w-full text-right"
            >
              Ubicacion del Estudio
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION PREMIUM CON DEGRADADO LATERAL ADAPTATIVO */}
      <header 
        className="scroll-mt-20 relative bg-[#FAF8F5] bg-no-repeat bg-[length:auto_98%] xs:bg-[length:auto_90%] sm:bg-cover bg-[right_-120px_bottom_0px] xs:bg-[right_-80px_bottom_0px] sm:bg-right lg:bg-center min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-5 sm:py-12 overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})` }}
        id='hero'
      >
        {/* CAPA DE DEGRADADO: Asegura total legibilidad en móviles y transiciones suaves en escritorio */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/60 xs:via-[#FAF8F5]/85 sm:via-[#FAF8F5]/40 to-transparent/10 md:to-transparent z-0"></div>

        {/* CONTENEDOR DE TEXTO (Posicionado arriba del degradado con z-10) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-1 sm:pt-2">
          
          {/* COLUMNA DE CONTENIDO (Ocupa la mitad izquierda en pantallas grandes) */}
          <div className="md:col-span-8 lg:col-span-7 flex flex-col gap-3.5 sm:gap-6 text-left">
            
            {/* Tag superior con línea dorada */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs sm:text-sm font-sans font-bold text-amber-600 uppercase tracking-widest">
                Abogada de Familia
              </span>
              <div className="w-16 h-[2px] bg-amber-500"></div>
            </div>

            {/* Nombre Principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-slate-900 tracking-tight leading-none">
              Dra. Ana <br className="hidden sm:inline" />
              Fernández
            </h1>

            {/* Subtítulo Credenciales */}
            <div className="flex flex-col gap-0.5">
              <p className="text-xs sm:text-sm font-sans font-bold text-slate-800 tracking-wider uppercase">
                Especialista y Maestranda en Derecho de Familia
              </p>
              <p className="text-xs sm:text-sm font-sans font-bold text-slate-800 tracking-wider uppercase">
                Más de 13 años de experiencia
              </p>
            </div>

            {/* Descripción Humana */}
            <div className="flex flex-col gap-3 text-slate-700 text-xs md:text-sm sm:text-md sm:text-base leading-relaxed max-w-lg font-medium">
              <p>
                Acompaño a personas y familias en la resolución de conflictos jurídicos con un enfoque humano, estratégico y eficaz.
              </p>
              <p>
                Cada caso es único y merece una atención personalizada, compromiso y la máxima calidad profesional.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-1 w-full sm:w-auto">
              {/* Botón Áreas de Práctica */}
              <a 
                href="#especialidades" 
                className="flex items-center justify-between gap-3 bg-[#D4953C] hover:bg-[#b87d2d] text-white font-sans font-bold text-xs sm:text-sm px-5 py-3 rounded-lg transition-all uppercase tracking-wider shadow-md hover:shadow-lg cursor-pointer group w-full sm:w-auto text-center"
              >
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faScaleBalanced} className="text-sm sm:text-base" />
                  Áreas de Práctica
                </span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>

              {/* Botón Iniciar Consulta Online */}
              <a 
                href="https://wa.me/5493757449422?text=Hola%20Dra.%20Ana%20Fernandez%2C%20quisiera%20iniciar%20una%20consulta%20online."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-slate-800 hover:bg-slate-800 hover:text-white text-slate-800 bg-[#FAF8F5]/80 backdrop-blur-xs font-sans font-bold text-xs sm:text-sm px-5 py-3 rounded-lg transition-all uppercase tracking-wider cursor-pointer w-full sm:w-auto text-center"
              >
                <FontAwesomeIcon icon={faComments} className="text-sm sm:text-base" />
                Iniciar Consulta Online
              </a>
            </div>

          </div>
          
          {/* Columna derecha vacía en pantallas medianas/grandes para dar aire y lucir la foto */}
          <div className="hidden md:block md:col-span-4 lg:col-span-5"></div>

        </div>

        {/* BARRA DE PILARES CORPORATIVOS EN UNA SOLA LÍNEA SIN SCROLL */}
        <div className="relative z-10 max-w-7xl mx-auto w-full mt-auto pt-4 sm:pt-6 px-1 sm:px-0">
          <div className="bg-[#FAF8F5]/90 backdrop-blur-md border border-slate-200/50 rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-3">
            {/* Grilla de 4 columnas fijas desde el tamaño más chico (grid-cols-4) */}
            <div className="grid grid-cols-4 divide-x divide-slate-300/50 w-full items-stretch">
              
              {/* Pilar 1: Excelencia */}
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 px-1 sm:px-4 text-center sm:text-left">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 text-[11px] sm:text-base shrink-0">
                  <FontAwesomeIcon icon={faShieldHalved} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] xs:text-[9px] sm:text-[10px] font-sans font-bold text-slate-900 uppercase tracking-wider leading-tight">Excelencia</span>
                  <span className="text-[7px] xs:text-[9px] sm:text-[10px] font-sans font-bold text-slate-900 uppercase tracking-wider leading-tight">Jurídica</span>
                </div>
              </div>

              {/* Pilar 2: Enfoque Humano */}
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 px-1 sm:px-4 text-center sm:text-left">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 text-[11px] sm:text-base shrink-0">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] xs:text-[9px] sm:text-[10px] font-sans font-bold text-slate-900 uppercase tracking-wider leading-tight">Enfoque</span>
                  <span className="text-[7px] xs:text-[9px] sm:text-[10px] font-sans font-bold text-slate-900 uppercase tracking-wider leading-tight">Humano</span>
                </div>
              </div>

              {/* Pilar 3: Confidencialidad */}
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 px-1 sm:px-4 text-center sm:text-left">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 text-[11px] sm:text-base shrink-0">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] xs:text-[9px] sm:text-[10px] font-sans font-bold text-slate-900 uppercase tracking-wider leading-tight">Confidencialidad</span>
                  <span className="text-[7px] xs:text-[9px] sm:text-[10px] font-sans font-bold text-slate-900 uppercase tracking-wider leading-tight">Absoluta</span>
                </div>
              </div>

              {/* Pilar 4: Soluciones */}
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 px-1 sm:px-4 text-center sm:text-left">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 text-[11px] sm:text-base shrink-0">
                  <FontAwesomeIcon icon={faBullseye} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] xs:text-[10px] sm:text-[10px] font-sans font-bold text-slate-900 uppercase tracking-wider leading-tight">Soluciones</span>
                  <span className="text-[7px] xs:text-[10px] sm:text-[10px] font-sans font-bold text-slate-900 uppercase tracking-wider leading-tight">Efectivas</span>
                </div>
              </div>

            </div>
          </div>
        </div>  
      </header>

      {/* SECCIÓN 1: SOBRE MÍ (PERFIL ACTUAL Y EJERCICIO PROFESIONAL) */}
        <section id="sobre-mi" className="scroll-mt-52 sm:scroll-mt-28 lg:scroll-mt-18 bg-[#FAF8F5]/30 py-18 px-4 sm:px-6 border-t border-slate-100">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Foto de perfil */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start gap-4">
              <div className="w-full max-w-[260px] md:max-w-full aspect-3/4 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-md relative group">
                <img 
                  src={image4} 
                  alt="Dra. Ana Fernández" 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-amber-500"></div>
              </div>
            </div>

            {/* Texto Institucional Adaptado */}
            <div className="md:col-span-8 flex flex-col gap-4.5 text-center md:text-left">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Trayectoria y Especialización</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">Dra. Ana Fernández</h2>
                <p className="text-amber-600 text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">
                  Especialista y Maestranda en Derecho de Familia
                </p>
              </div>
              
              <div className="h-[2px] w-12 bg-amber-500 mx-auto md:mx-0 my-1"></div>
              
              <div className="text-slate-600 text-xs sm:text-sm leading-relaxed flex flex-col gap-4 text-justify md:text-left font-medium">
                <p>
                  La Dra. Ana Fernández es abogada especialista y maestranda en Derecho de Familia, con <strong className="text-slate-900">más de 13 años de experiencia profesional</strong>. Su sólida trayectoria y formación continua le permiten ofrecer un asesoramiento jurídico de excelencia y una representación legal estratégica y personalizada.
                </p>
                <p>
                  Como directora de <strong className="text-slate-900">A|F & Asociados</strong>, lidera un equipo comprometido con el acompañamiento cercano de personas y familias. Su práctica profesional se concentra en resolver conflictos complejos con la máxima empatía, responsabilidad y profesionalismo, brindando soluciones eficaces adaptadas a las necesidades particulares de cada caso.
                </p>
                <p>
                  Bajo su dirección, el estudio también brinda un respaldo integral en las áreas de <strong className="text-slate-900">Derecho Civil</strong>, además de ofrecer asistencia estratégica en materia <strong className="text-slate-900">Penal</strong>. En <strong className="text-slate-900">A|F & Asociados</strong> entendemos que detrás de cada consulta hay una historia de vida que merece ser escuchada y defendida con absoluta seriedad y excelencia.
                </p>
              </div>

              <div className="mt-2 text-center md:text-left">
                <p className="text-amber-700 font-serif italic text-xs sm:text-sm font-semibold">
                  "Acompañar con cercanía. Defender con excelencia. Construir soluciones con responsabilidad."
                </p>
              </div>
            </div>

          </div>
        </section>


          {/* DIVISOR ELEGANTE DESVANECIDO EN LOS LATERALES */}
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
            <div className="h-[3px] w-full bg-linear-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>

        {/* SECCIÓN ESPECIALIDADES CON FOTOS */}
        <section id="especialidades" className="scroll-mt-52 sm:scroll-mt-28 lg:scroll-mt-18 bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            
            {/* Título de Sección */}
            <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Servicios Legales</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1E293B] tracking-tight">
                Nuestras Áreas de Práctica
              </h2>
              <div className="w-12 h-[2px] bg-amber-500 mx-auto mt-1"></div>
            </div>

            {/* Grilla de Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              
              {/* Tarjeta 1: Derecho de Familia */}
              <div className="bg-[#FAF8F5]/50 border border-slate-100 rounded-2xl overflow-hidden shadow-md flex flex-col group hover:shadow-lg transition-all duration-300">
                {/* Contenedor relativo sin overflow-hidden para que el icono flote libre */}
                <div className="relative h-56 sm:h-64">
                  {/* Este sub-contenedor SÍ tiene overflow-hidden para recortar la imagen en el hover */}
                  <div className="w-full h-full overflow-hidden rounded-t-2xl">
                    <img 
                      src={image3} 
                      alt="Derecho de Familia" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Icono flotante con z-20 para que quede por encima de los textos */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0F172A] border-2 border-[#FAF8F5] flex items-center justify-center text-amber-500 shadow-md z-20">
                    <FontAwesomeIcon icon={faUsers} className="text-base" />
                  </div>
                </div>
                
                {/* Contenido de Texto */}
                <div className="p-6 pt-10 flex flex-col gap-3 text-center flex-grow">
                  <h3 className="font-serif font-black text-slate-900 text-xl sm:text-2xl">
                    Derecho de Familia
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Asesoramiento y representación en divorcios, cuidado personal, régimen de comunicación, alimentos, adopciones, filiación, autorizaciones de viaje, uniones convivenciales, violencia familiar y medidas de protección.
                  </p>
                </div>
              </div>

              {/* Tarjeta 2: Derecho Civil */}
              <div className="bg-[#FAF8F5]/50 border border-slate-100 rounded-2xl overflow-hidden shadow-md flex flex-col group hover:shadow-lg transition-all duration-300">
                {/* Contenedor relativo sin overflow-hidden */}
                <div className="relative h-56 sm:h-64">
                  {/* Sub-contenedor con overflow-hidden */}
                  <div className="w-full h-full overflow-hidden rounded-t-2xl">
                    <img 
                      src={image1} 
                      alt="Derecho Civil" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Icono flotante con z-20 */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0F172A] border-2 border-[#FAF8F5] flex items-center justify-center text-amber-500 shadow-md z-20">
                    <FontAwesomeIcon icon={faFileSignature} className="text-base" />
                  </div>
                </div>
                
                {/* Contenido de Texto */}
                <div className="p-6 pt-10 flex flex-col gap-3 text-center flex-grow">
                  <h3 className="font-serif font-black text-slate-900 text-xl sm:text-2xl">
                    Derecho Civil
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Asesoramiento y representación en contratos, responsabilidad civil, daños y perjuicios, incumplimientos, cobros de pesos, propiedad, condominios y demás cuestiones del derecho civil. <strong className="text-amber-600 font-bold">Incluye sucesiones:</strong> declaraciones de herederos, testamentos, particiones, adjudicaciones y planificación sucesoria.
                  </p>
                </div>
              </div>

              {/* Tarjeta 3: Derecho Penal */}
              <div className="bg-[#FAF8F5]/50 border border-slate-100 rounded-2xl overflow-hidden shadow-md flex flex-col group hover:shadow-lg transition-all duration-300">
                {/* Contenedor relativo sin overflow-hidden */}
                <div className="relative h-56 sm:h-64">
                  {/* Sub-contenedor con overflow-hidden */}
                  <div className="w-full h-full overflow-hidden rounded-t-2xl">
                    <img 
                      src={image2} 
                      alt="Derecho Penal" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Icono flotante con z-20 */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0F172A] border-2 border-[#FAF8F5] flex items-center justify-center text-amber-500 shadow-md z-20">
                    <FontAwesomeIcon icon={faScaleBalanced} className="text-base" />
                  </div>
                </div>
                
                {/* Contenido de Texto */}
                <div className="p-6 pt-10 flex flex-col gap-3 text-center flex-grow">
                  <h3 className="font-serif font-black text-slate-900 text-xl sm:text-2xl">
                    Derecho Penal
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                     Su libertad y sus derechos merecen la mejor defensa. Ofrecemos asistencia penal especializada con una estrategia personalizada, respuesta inmediata y acompañamiento permanente durante todo el proceso judicial, priorizando la confidencialidad y la protección integral de nuestros clientes.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

           {/* DIVISOR ELEGANTE DESVANECIDO EN LOS LATERALES */}
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
            <div className="h-[3px] w-full bg-linear-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>

        {/* SECCIÓN: POR QUÉ ELEGIR EL ESTUDIO */}
        <section id="porqueelegirnos" className="scroll-mt-20 bg-[#FAF8F5]/50 py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-100">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            
            {/* Título de Sección */}
            <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Nuestra Propuesta de Valor</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1E293B] tracking-tight">
                ¿Por Qué Elegir Nuestro Estudio?
              </h2>
              <div className="w-12 h-[2px] bg-amber-500 mx-auto mt-1"></div>
            </div>

            {/* Grilla de los 4 Puntos Clave */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              
              {/* Punto 1: Atención Personalizada */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 text-center md:text-left">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 text-xl mx-auto md:mx-0 shrink-0">
                  <FontAwesomeIcon icon={faHandshakeAngle} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif font-bold text-slate-900 text-lg">
                    Atención Personalizada
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Acompañamiento directo, comunicación permanente y seguimiento cercano durante todo el proceso judicial.
                  </p>
                </div>
              </div>

              {/* Punto 2: Defensa Firme */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 text-center md:text-left">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 text-xl mx-auto md:mx-0 shrink-0">
                  <FontAwesomeIcon icon={faShieldHalved} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif font-bold text-slate-900 text-lg">
                    Defensa Firme de sus Derechos
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Representación legal estratégica, ética y comprometida para resguardar sus derechos e intereses en cada etapa del proceso.
                  </p>
                </div>
              </div>

              {/* Punto 3: Gestión Ágil */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 text-center md:text-left">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 text-xl mx-auto md:mx-0 shrink-0">
                  <FontAwesomeIcon icon={faBolt} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif font-bold text-slate-900 text-lg">
                    Gestión Ágil del Expediente
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Seguimiento constante e impulso oportuno de cada actuación para procurar el avance eficiente del proceso.
                  </p>
                </div>
              </div>

              {/* Punto 4: Compromiso */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 text-center md:text-left">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 text-xl mx-auto md:mx-0 shrink-0">
                  <FontAwesomeIcon icon={faBullseye} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif font-bold text-slate-900 text-lg">
                    Compromiso con los Resultados
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Desarrollamos estrategias jurídicas eficaces orientadas a alcanzar la mejor solución posible para cada caso.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>        

        {/* SECCIÓN CONTACTO: FORMULARIO INTERACTIVO AVANZADO */}
        <section id="contacto" className="scroll-mt-12 sm:scroll-mt-28 lg:scroll-mt-18 bg-[#0B0F17] text-white py-16 px-4 sm:px-6 relative overflow-hidden border-t border-slate-800">
          {/* Brillo ambiental dorado de fondo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-8 relative z-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Contacto Directo</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-100">Consulte su caso de forma confidencial</h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                Complete el formulario para coordinar una evaluación estratégica de su situación con la Dra. Ana Fernández de forma presencial o virtual.
              </p>
            </div>

            <form onSubmit={handleEnviarConsulta} className="bg-[#161B26] border border-amber-500/10 p-6 sm:p-8 rounded-2xl text-left flex flex-col gap-5 shadow-2xl">
              
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
                    className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-hidden focus:border-amber-500 transition-all focus:ring-1 focus:ring-amber-500/30"
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
                    className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-hidden focus:border-amber-500 transition-all focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              {/* Selector de Área Legal - Rediseñado bajo el foco de su práctica */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Motivo Principal de la Consulta</label>
                <div className="relative">
                  <select 
                    required
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-amber-500 transition-all focus:ring-1 focus:ring-amber-500/30 appearance-none cursor-pointer"
                  >
                    <option value="" disabled hidden>Seleccione el área correspondiente...</option>
                    <option value="familia">Derecho de Familia (Divorcios, Alimentos, Cuidado Personal)</option>
                    <option value="civil">Derecho Civil (Sucesiones, Contratos, Daños y Perjuicios)</option>
                    <option value="penal">Asistencia / Defensa Penal</option>
                    <option value="otro">Otro Motivo / Consulta General</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-amber-500 text-xs">
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
                  placeholder="Escriba aquí los detalles más relevantes de su caso para poder brindarle un asesoramiento preciso..."
                  className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-hidden focus:border-amber-500 transition-all focus:ring-1 focus:ring-amber-500/30 resize-none"
                />
              </div>

              {/* Botón de envío - Premium Dorado */}
              <button 
                type="submit"
                disabled={enviando}
                className={`w-full text-slate-950 font-bold text-xs sm:text-sm py-4 rounded-xl transition-all shadow-md uppercase tracking-wider mt-2 cursor-pointer font-sans ${
                  enviando 
                    ? 'bg-amber-600/50 text-slate-800 cursor-not-allowed' 
                    : 'bg-[#D4953C] hover:bg-[#b87d2d] text-white active:scale-[0.98]'
                }`}
              >
                {enviando ? "Procesando Solicitud..." : "Solicitar Evaluación de Caso"}
              </button>
            </form>
          </div>
        </section>


        {/* SECCIÓN: UBICACIÓN / GOOGLE MAPS */}
        <section id='ubicacion' className="scroll-mt-48 sm:scroll-mt-28 lg:scroll-mt-18 bg-white py-16 px-4 sm:px-6 border-t border-slate-200/60">
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

      {/* Footer */}
      <footer className="bg-[#0B0F17] text-slate-400 text-xs py-8 px-4 sm:px-6 border-t border-slate-900 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Botón Volver Arriba */}
          <div className="flex items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-slate-400 hover:text-amber-500 text-[12px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/30 group-hover:border-amber-500/50 transition-colors">
                <FontAwesomeIcon icon={faCircleChevronUp}/>
              </span>
              Volver arriba
            </button>
          </div>

          {/* Enlace a Políticas (Discreto y elegante en el medio/lado) */}
          <div className="text-center md:text-left">
            <button 
              onClick={() => setMostrarPoliticas(true)}
              className="text-slate-500 hover:text-amber-500 text-[11px] font-medium transition-colors cursor-pointer underline decoration-dotted underline-offset-4"
            >
              Políticas de Privacidad y Términos Legales
            </button>
          </div>

          {/* Copyright y Firma */}
          <div className="text-center md:text-right text-[11px] text-slate-500 font-medium flex flex-col gap-1">
            <p>
              &copy; {new Date().getFullYear()} Estudio Jurídico <span className="text-slate-300">Dra. Ana Fernández</span>. Todos los derechos reservados.
            </p>
            <p>
              Desarrollado por{" "}
              <span>
                <a 
                  href="https://portfolio-royf.vercel.app/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-amber-500 hover:text-amber-400 underline transition-colors"
                >
                  Roy Frey
                </a>
              </span>
            </p>
          </div>

        </div>
      </footer>

      {/* BOTÓN FLOTANTE DE WHATSAPP ELEGANTE */}
      <a 
        href="https://wa.me/5493757449422?text=Hola%20Dra.%20Ana%20Fernandez%2C%20vi%20el%20boceto%20de%20su%20sitio%20web%20y%20me%20gustar%C3%ADa%20realizar%20una%20consulta%20legal.%20Quedo%20atento%2Fa%20para%20coordinar%20una%20entrevista.%20Muchas%20gracias."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-16 right-6 z-50 w-14 h-14 bg-white border border-amber-500/80 rounded-full shadow-xl hover:shadow-amber-500/20 hover:scale-110 transition-all duration-300 flex items-center justify-center text-xl group cursor-pointer"
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

      {/* MODAL DE POLÍTICAS DE PRIVACIDAD Y DERECHOS RESERVADOS */}
      {mostrarPoliticas && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
          
          {/* Contenedor del Modal */}
          <div className="bg-[#161B26] border border-amber-500/20 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            
            {/* Cabecera */}
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-[#0B0F17]">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 text-sm">⚖️</span>
                <h3 className="text-sm sm:text-base font-serif font-bold text-slate-100 uppercase tracking-wider">
                  Términos Legales y Privacidad
                </h3>
              </div>
              <button 
                onClick={() => setMostrarPoliticas(false)}
                className="text-slate-400 hover:text-amber-500 text-xl font-bold transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Contenido con Scroll Interno */}
            <div className="p-6 overflow-y-auto text-slate-300 text-xs sm:text-sm space-y-5 leading-relaxed text-justify">
              
              {/* Sección 1 */}
              <div>
                <h4 className="font-serif font-bold text-amber-500 uppercase tracking-wide text-xs mb-2">
                  1. Propiedad Intelectual y Derechos Reservados
                </h4>
                <p>
                  Todo el contenido de este sitio web, incluyendo textos, logotipos, combinaciones de colores, isotipos, códigos fuente y diseños estructurales, es propiedad exclusiva de la <strong className="text-white">Dra. Ana Fernández</strong> y su firma <strong className="text-white">A|F & Asociados</strong>. Queda estrictamente prohibida la reproducción parcial o total, distribución o uso comercial del material expuesto sin autorización previa y por escrito de la titular.
                </p>
              </div>

              {/* Sección 2 */}
              <div>
                <h4 className="font-serif font-bold text-amber-500 uppercase tracking-wide text-xs mb-2">
                  2. Política de Privacidad y Tratamiento de Datos
                </h4>
                <p>
                  En cumplimiento con las normativas vigentes de protección de datos personales, le informamos que los datos suministrados por los usuarios en el formulario de contacto (Nombre, Teléfono y Motivo de Consulta) <strong className="text-white">no son almacenados en bases de datos externas de terceros, servidores compartidos ni listas de correos comerciales</strong>. 
                </p>
                <p className="mt-2">
                  La información ingresada se procesa de forma local y se transfiere de manera directa al chat de WhatsApp privado de la profesional mediante un canal cifrado. Al presionar el botón de envío, usted consiente explícitamente esta vía de comunicación directa.
                </p>
              </div>

              {/* Sección 3 */}
              <div>
                <h4 className="font-serif font-bold text-amber-500 uppercase tracking-wide text-xs mb-2">
                  3. Confidencialidad y Secreto Profesional
                </h4>
                <p>
                  Toda la información compartida por los usuarios a través de la plataforma web o sus canales derivados de mensajería instantánea está estrictamente protegida bajo el marco del <strong className="text-white">Secreto Profesional Médico-Jurídico</strong>. No se revelarán antecedentes, datos identificatorios ni hechos consultados a ningún tercero bajo ninguna circunstancia, garantizando el resguardo absoluto de su confidencialidad.
                </p>
              </div>

              {/* Sección 4 */}
              <div>
                <h4 className="font-serif font-bold text-amber-500 uppercase tracking-wide text-xs mb-2">
                  4. Limitación de Responsabilidad
                </h4>
                <p>
                  El contenido informativo de este sitio web es de carácter orientativo e introductorio. Bajo ninguna circunstancia reemplaza a una consulta jurídica formal o al asesoramiento personalizado con un profesional matriculado en derecho.
                </p>
              </div>

            </div>

            {/* Pie del Modal con botón de cierre */}
            <div className="px-6 py-4 border-t border-slate-800 bg-[#0B0F17] flex justify-end">
              <button 
                onClick={() => setMostrarPoliticas(false)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-sans font-bold text-xs px-5 py-2.5 rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
              >
                Entendido / Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}