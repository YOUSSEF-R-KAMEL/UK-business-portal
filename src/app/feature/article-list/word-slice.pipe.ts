import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordSlice'
})
export class WordSlicePipe implements PipeTransform {
  transform(value: string | undefined, wordCount: number): string {
    if (!value) return '';
    const words = value.split(' ');
    return words.slice(0, wordCount).join(' ') + (words.length > wordCount ? '...' : '');
  }
}