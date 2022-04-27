import { Directive, Input, ElementRef, Renderer2, NgZone } from '@angular/core';
import { fromEvent, take, Subject, takeUntil } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[imgLoader]'
})
export class ImgLoaderDirective {
  @Input() set src(path: string) {
    this._onSourceChange(path);
  }

  private _destroy$ = new Subject<void>();

  constructor(
    private _imageRef: ElementRef<HTMLImageElement>,
    private _renderer: Renderer2,
    private _zone: NgZone
  ) {
    this._renderer.addClass(this._image, 'loading-img');
  }

  private get _image(): HTMLImageElement {
    return this._imageRef.nativeElement;
  }

  private get _parent(): HTMLElement {
    return this._image.parentElement;
  }

  private _destroySub(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$ = new Subject<void>();
  }

  private _onSourceChange(srcPath: string): void {
    this._destroySub();
    // this.setParentAnimation ? this._renderer.addClass(this._parent, 'loading-bg') : void 0;
    this._renderer.setAttribute(this._image, 'src', srcPath);
    this._renderer.removeClass(this._image, 'loading-img--loaded');
    this._zone.runOutsideAngular(() => {
      fromEvent(this._image, 'load')
        .pipe(take(1), takeUntil(this._destroy$), untilDestroyed(this))
        .subscribe(() => {
          this._renderer.addClass(this._image, 'loading-img--loaded');
          this._renderer.removeClass(this._parent, 'loading-bg');
        });
    });
  }
}
