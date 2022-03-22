import "jest-preset-angular/setup-jest";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

declare module "@angular/core" {
  interface DebugElement {
    _getText(): string;

    _getDebugEl(dataTestAttribute: string): DebugElement;

    _getDebugElArray(dataTestAttribute: string): DebugElement[];
  }
}
DebugElement.prototype._getText = function () {
  return this.nativeElement.textContent.trim();
};

DebugElement.prototype._getDebugEl = function (dataTestAttribute: string) {
  return this.query(By.css(`[data-test="${dataTestAttribute}"]`));
};

DebugElement.prototype._getDebugElArray = function (dataTestAttribute: string) {
  return this.queryAll(By.css(`[data-test="${dataTestAttribute}"]`));
};
