import { Injectable } from '@nestjs/common';

const slugify = require('slugify');

@Injectable()
export class SlugProvider {
  

  slugify(slug: string): Promise<string> {
    return slugify('some string', {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi',       // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
      })
  }

}