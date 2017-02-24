/**
 * Altera o valor do campo, emitindo o evento `input` na DOM.
 */
export default function setInputValue(input: HTMLInputElement, value: string): void {
  const event = new Event('input', { target: input, bubbles: true } as any);
  input.value = value;
  input.dispatchEvent(event);
}
