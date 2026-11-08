// The site has one theme provider and one theme rule (lib/theme.js). The older routes'
// components import from here, so this file passes the shared provider through.
export { default, useTheme } from './home/ThemeProvider';
