import css from 'styled-jsx/css'

export const globalStyle = css.global`
html,
body,
span,
p,
h1, h2, h3, h4, h5, h6{
  padding: 0;
  margin: 0;
  letter-spacing: unset;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-tap-highlight-color: transparent;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
`
