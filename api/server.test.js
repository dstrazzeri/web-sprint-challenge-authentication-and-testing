test('NODE_ENV is correct', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})


test('sanity', () => {
  expect(true).toBe(true)
})
