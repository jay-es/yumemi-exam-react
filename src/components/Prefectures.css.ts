import { style } from '@vanilla-extract/css'

export const ulClass = style({
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
  maxHeight: '9em',
  overflowY: 'auto',
})

export const liClass = style({
  width: '6em',
  marginRight: 8,
  marginBottom: 8,
  flexGrow: 1,

  selectors: {
    '&:empty': {
      height: 0,
      marginBottom: 0,
    },
  },
})

export const labelClass = style({
  userSelect: 'none',
})
