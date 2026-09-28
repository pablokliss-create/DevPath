import { expect,test } from 'vitest'; import { localizeHref,swapLocaleInPath } from '@/i18n/links';
test('localizeHref preserves locale for internal routes',()=>{expect(localizeHref('pt-BR','/course')).toBe('/pt-BR/course');expect(localizeHref('en','/')).toBe('/en');});
test('swapLocaleInPath keeps the current route',()=>{expect(swapLocaleInPath('/pt-BR/course/variables','en')).toBe('/en/course/variables');});
