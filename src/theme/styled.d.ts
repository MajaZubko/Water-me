import 'styled-components';

import { Breakpoint } from './media';
import { ThemeMap, Border, Color, Font, Shadow, Size, ZIndex } from './index';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors?: ThemeMap<Color, string>;
    fonts?: ThemeMap<Font, string>;
    borders?: ThemeMap<Border, string>;
    shadows?: ThemeMap<Shadow>;
    sizes?: ThemeMap<Size>;
    zIndexes?: ThemeMap<ZIndex>;
    activeBreakpoint?: Breakpoint;
  }
}
