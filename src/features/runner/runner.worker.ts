export const RUNNER_WORKER_SOURCE = `
self.onmessage = async (event) => {
  const { code } = event.data;
  const output = [];
  const safeString = (value) => typeof value === 'string'
    ? value
    : (() => { try { return JSON.stringify(value); } catch { return String(value); } })();
  const consoleProxy = {
    log: (...args) => output.push(args.map(safeString).join(' ')),
    error: (...args) => output.push(args.map(safeString).join(' '))
  };
  try {
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const execute = new AsyncFunction('console', code);
    await execute(consoleProxy);
    self.postMessage({ ok: true, output });
  } catch (error) {
    self.postMessage({
      ok: false,
      output,
      error: (error && error.name ? error.name + ': ' : '') +
        (error && error.message ? error.message : String(error))
    });
  }
};`;