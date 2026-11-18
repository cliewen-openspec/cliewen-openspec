import {JSDOM} from 'jsdom';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
// Do not enable scripts or resource loading in this parsing-only DOM.
const {window} = new JSDOM('');
Object.assign(globalThis, {window, document: window.document});
const {default: mermaid} = await import('mermaid');
mermaid.initialize({startOnLoad: false, securityLevel: 'strict', secure: ['securityLevel', 'startOnLoad', 'maxTextSize', 'suppressErrorRendering'], maxTextSize: 262144, suppressErrorRendering: true});
process.send?.({ready: true, version: require('mermaid/package.json').version});
process.on('message', async (value: unknown) => {
  if (typeof value !== 'string' || Buffer.byteLength(value) > 262144) { process.exitCode = 1; process.disconnect?.(); return; }
  try {
    await mermaid.parse(value);
    process.send?.({valid: true});
  } catch {
    // Parser errors can contain whole source lines; report location in the parent.
    process.send?.({valid: false});
  }
});
