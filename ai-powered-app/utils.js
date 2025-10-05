export function formatOutput(output) {
  if (Array.isArray(output)) return output.join("\n");
  return String(output);
}
