import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * Esta diretiva para textareas permite que eles cresçam (em altura)
 * conforme o conteúdo digitado.
 */
@Directive({
  selector: 'textarea[reAutoWrap]',
})
export class AutoWrapDirective {
  private readonly textarea: HTMLTextAreaElement;
  private readonly rows: number;

  constructor(el: ElementRef) {
    this.textarea = el.nativeElement;
    this.rows = this.textarea.rows;
    el.nativeElement.style.resize = 'none';
  }

  /**
   * Redimensiona sempre que o usuário altera o conteúdo do campo.
   */
  @HostListener('input') onInput() {
    this.resize(this.textarea);
  }

  /**
   * Redimensiona sempre que o usuário altera o tamanho da janela do navegador.
   */
  @HostListener('window:resize') onWindowResize() {
    this.resize(this.textarea);
  }

  /**
   * Redimensiona o textarea informado conforme o seu conteúdo.
   * @param textarea campo que será redimensionado
   */
  resize(textarea: HTMLTextAreaElement) {
    textarea.rows = this.rows;
    if (textarea.scrollHeight > textarea.clientHeight) {
      textarea.rows = textarea.scrollHeight / (textarea.clientHeight / this.rows);
    }
  }
}
