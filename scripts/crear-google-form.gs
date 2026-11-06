/**
 * Crea el Google Form de contacto del sitio de Fuerza + su hoja de cálculo,
 * y escribe en el registro el bloque CONTACT_FORM listo para pegar en
 * src/data/site.ts.
 *
 * Cómo usarlo (una sola vez, con la cuenta de Google de Fuerza):
 *   1. Entrar a https://script.google.com → «Proyecto nuevo».
 *   2. Borrar lo que hay, pegar este archivo entero y guardar.
 *   3. Elegir la función `crearFormContacto` y tocar «Ejecutar».
 *      Google pide permisos (Forms y Hojas de cálculo): aceptarlos.
 *   4. Abrir «Registro de ejecución» y copiar el bloque CONTACT_FORM.
 *
 * Las preguntas tienen que quedar en este orden y con este tipo. Ninguna es
 * obligatoria en Google a propósito: el sitio ya valida lo obligatorio, y si
 * Google exigiera algo que el sitio deja vacío, esa respuesta se perdería sin aviso.
 */

const PREGUNTAS = [
  { key: 'nombre', titulo: 'Nombre y apellido', tipo: 'corta' },
  { key: 'empresa', titulo: 'Empresa o marca', tipo: 'corta' },
  { key: 'email', titulo: 'Email', tipo: 'corta' },
  { key: 'telefono', titulo: 'Código + teléfono', tipo: 'corta' },
  { key: 'mensaje', titulo: 'Contanos un poco más', tipo: 'parrafo' },
];

function crearFormContacto() {
  const form = FormApp.create('Contacto · Fuerza Estudio Creativo');
  form
    .setDescription('Respuestas del formulario de contacto del sitio de Fuerza.')
    .setCollectEmail(false)
    .setLimitOneResponsePerUser(false)
    .setAllowResponseEdits(false)
    .setShowLinkToRespondAgain(false)
    .setAcceptingResponses(true)
    .setConfirmationMessage('¡Gracias! Recibimos tu mensaje.');

  // Solo existe en cuentas de Google Workspace; en cuentas comunes no hace falta.
  try { form.setRequireLogin(false); } catch (e) {}
  // Los forms nuevos pueden nacer «sin publicar» y así no aceptan respuestas.
  try { if (typeof form.setPublished === 'function') form.setPublished(true); } catch (e) {}

  const items = PREGUNTAS.map((p) => {
    const item = p.tipo === 'parrafo' ? form.addParagraphTextItem() : form.addTextItem();
    return item.setTitle(p.titulo).setRequired(false);
  });

  // Hoja de cálculo donde caen las respuestas (una fila por envío).
  const hoja = SpreadsheetApp.create('Contacto · Fuerza (respuestas)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, hoja.getId());

  // Los entry.NNNN no son los ids de los ítems: se sacan de un link prellenado.
  const prellenado = form.createResponse();
  items.forEach((item, i) => {
    const marca = '__' + PREGUNTAS[i].key + '__';
    const respuesta = PREGUNTAS[i].tipo === 'parrafo'
      ? item.asParagraphTextItem().createResponse(marca)
      : item.asTextItem().createResponse(marca);
    prellenado.withItemResponse(respuesta);
  });
  const url = prellenado.toPrefilledUrl();

  const entries = {};
  PREGUNTAS.forEach((p) => {
    const m = url.match(new RegExp('(entry\\.\\d+)=__' + p.key + '__'));
    entries[p.key] = m ? m[1] : '';
  });

  const action = form.getPublishedUrl().replace(/\/viewform.*$/, '/formResponse');

  const bloque = [
    'export const CONTACT_FORM = {',
    "  action: '" + action + "',",
    '  entries: {',
    ...PREGUNTAS.map((p) => '    ' + p.key + ": '" + entries[p.key] + "', // " + p.titulo),
    '  },',
    '} as const;',
  ].join('\n');

  Logger.log('Form (editar):      ' + form.getEditUrl());
  Logger.log('Form (público):     ' + form.getPublishedUrl());
  Logger.log('Hoja de respuestas: ' + hoja.getUrl());
  Logger.log('\nPegar en src/data/site.ts:\n\n' + bloque);
}
