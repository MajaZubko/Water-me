import { Breakpoint, media, responsiveValue } from '../media';

describe('theme/media', () => {
  describe('responsiveValue', () => {
    const getValue = responsiveValue(100, { desktop: 200 });

    describe('when no breakpoint matches', () => {
      it('should return default value', () => {
        jest.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList);
        const val = getValue();
        expect(val).toBe(100);
      });
    });

    describe('when specified breakpoint mathces', () => {
      it('should return provided breakpoint value', () => {
        jest.spyOn(window, 'matchMedia').mockImplementation(query => {
          const size = query.replace(/[^0-9]+/gi, '');
          return { matches: parseInt(size, 10) >= 1280 } as MediaQueryList;
        });
        const val = getValue();

        expect(val).toBe(200);
      });
    });

    describe('when lower than specified breakpoint matches', () => {
      it('should return provided breakpoint value', () => {
        jest.spyOn(window, 'matchMedia').mockImplementation(query => {
          const size = query.replace(/[^0-9]+/gi, '');
          return { matches: parseInt(size, 10) >= 768 } as MediaQueryList;
        });

        const val = getValue();
        expect(val).toBe(200);
      });
    });
  });

  describe('media()', () => {
    const CSS_CONTENT = 'padding: 10px;';
    const getMedia = (...args: Parameters<typeof media>) => media(...args)`${CSS_CONTENT}`.join('');

    describe('for specified breakpoint', () => {
      it('should return correct css media query', () => {
        expect(getMedia(Breakpoint.MOBILE)).toMatchSnapshot();
        expect(getMedia(Breakpoint.TABLET)).toMatchSnapshot();
        expect(getMedia(Breakpoint.DESKTOP)).toMatchSnapshot();
        expect(getMedia(Breakpoint.DESKTOP_WIDE)).toMatchSnapshot();
        expect(getMedia(Breakpoint.DESKTOP_FULL)).toMatchSnapshot();
      });
    });

    describe('for specified retina breakpoint', () => {
      it('should return correct css media query', () => {
        expect(getMedia(Breakpoint.MOBILE, { retina: true })).toMatchSnapshot();
        expect(getMedia(Breakpoint.TABLET, { retina: true })).toMatchSnapshot();
        expect(getMedia(Breakpoint.DESKTOP, { retina: true })).toMatchSnapshot();
        expect(getMedia(Breakpoint.DESKTOP_WIDE, { retina: true })).toMatchSnapshot();
        expect(getMedia(Breakpoint.DESKTOP_FULL, { retina: true })).toMatchSnapshot();
      });
    });

    describe('for specified landscape breakpoint', () => {
      it('should return correct css media query', () => {
        expect(getMedia(Breakpoint.MOBILE, { landscape: true })).toMatchSnapshot();
        expect(getMedia(Breakpoint.TABLET, { landscape: true })).toMatchSnapshot();
        expect(getMedia(Breakpoint.DESKTOP, { landscape: true })).toMatchSnapshot();
        expect(getMedia(Breakpoint.DESKTOP_WIDE, { landscape: true })).toMatchSnapshot();
        expect(getMedia(Breakpoint.DESKTOP_FULL, { landscape: true })).toMatchSnapshot();
      });
    });

    describe('for specified retina landscape breakpoint', () => {
      it('should return correct css media query', () => {
        expect(getMedia(Breakpoint.MOBILE, { landscape: true, retina: true })).toMatchSnapshot();
        expect(getMedia(Breakpoint.TABLET, { landscape: true, retina: true })).toMatchSnapshot();
        expect(getMedia(Breakpoint.DESKTOP, { landscape: true, retina: true })).toMatchSnapshot();
        expect(getMedia(Breakpoint.DESKTOP_WIDE, { landscape: true, retina: true })).toMatchSnapshot();
        expect(getMedia(Breakpoint.DESKTOP_FULL, { landscape: true, retina: true })).toMatchSnapshot();
      });
    });
  });
});
