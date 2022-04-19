import { style } from '@vanilla-extract/css'

export const ulClass = style({
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
})

export const liClass = style({
  width: '6em',
  marginRight: 8,
  marginBottom: 8,
})
