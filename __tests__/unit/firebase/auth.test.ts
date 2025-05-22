import { describe, expect, test } from 'vitest'
import { isAllowedEmail } from '../../docs/.vitepress/auth'

describe('isAllowedEmail', () => {
  test('allows @appointy.com addresses', () => {
    expect(isAllowedEmail('user@appointy.com')).toBe(true)
  })
  test('rejects other domains', () => {
    expect(isAllowedEmail('user@example.com')).toBe(false)
  })
})
