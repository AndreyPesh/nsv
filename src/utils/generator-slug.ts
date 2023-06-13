const translit = (str: string) => {
  const ru =
    'А-а-Б-б-В-в-Г-г-Д-д-Е-е-Ё-ё-Э-э-Ж-ж-З-з-И-и-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я'.split(
      '-',
    );
  const en =
    "A-a-B-b-V-v-G-g-D-d-E-e-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-Ts-ts-Ch-ch-Sh-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya".split(
      '-',
    );
  let res = '';
  for (let i = 0, l = str.length; i < l; i++) {
    let s = str.charAt(i);
    let n = ru.indexOf(s);
    if (n > 0) {
      res += en[n];
    } else {
      res += s;
    }
  }
  return res;
};

export const generatingSlug = (str: string) => {
  let url = str.replace(/[\s]+/gi, '-');
  url = translit(url);

  url = url
    .replace(/[^0-9a-z_\-]+/gi, '')
    .replace('---', '-')
    .replace('--', '-')
    .toLowerCase();
  return url;
};
