import { empty } from 'ramda';
import throttle from 'lodash.throttle';
import { renderHook } from '@testing-library/react-hooks';
import { useWindowListener } from '../useWindowListener.hook';

jest.mock('lodash.throttle', () => jest.fn().mockImplementation((fn) => fn));

const defaultOptions = {
  foo: 'bar',
};

const defaultArgs: [string, Function, object] = [
  'scroll',
  empty,
  {
    throttle: 100,
    ...defaultOptions,
  },
];

// @ts-ignore
const render = (args = defaultArgs) => renderHook(() => useWindowListener(...args));

describe('useWindowListener: Hook', () => {
  // @ts-ignore
  const addEventListenerSpy = jest.spyOn(global.window, 'addEventListener');
  // @ts-ignore
  const removeEventListenerSpy = jest.spyOn(global.window, 'removeEventListener');

  afterEach(() => {
    addEventListenerSpy.mockClear();
    removeEventListenerSpy.mockClear();
  });

  it('should return nothing', () => {
    const { result } = render();
    expect(result.current).toBeUndefined();
  });

  xit('should call addEventListener with proper eventType on mount', () => {
    render();
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), defaultOptions);
  });

  xit('should call removeEventListener with proper eventType on unmount', () => {
    const el = render();
    el.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), defaultOptions);
  });

  describe('when no throttling is provided', () => {
    it('should call addEventListener with provided function on mount', () => {
      const onEvent = (): void => null;
      render([defaultArgs[0], onEvent, { throttle: 0, ...defaultOptions }]);
      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', onEvent, defaultOptions);
    });

    it('should call removeEventListener with provided function on mount', () => {
      const onEvent = (): void => null;
      const el = render([defaultArgs[0], onEvent, { throttle: 0, ...defaultOptions }]);
      el.unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', onEvent, defaultOptions);
    });
  });

  describe('when throttle is provided', () => {
    it('should call throttle on given function', () => {
      const onEvent = (): void => null;
      render([defaultArgs[0], onEvent, defaultArgs[2]]);
      expect(throttle).toHaveBeenCalledWith(onEvent, 100, expect.anything());
    });
  });
});
