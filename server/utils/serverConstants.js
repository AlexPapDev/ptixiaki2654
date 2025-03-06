const USER_ROLES = {
  NORMAL: 'normal_user',
  AMBASSADOR: 'ambassador',
  ADMIN: 'admin',
}
const INSTANT_CREATION_ROLES = [USER_ROLES.AMBASSADOR, USER_ROLES.ADMIN]
const GEOCODE_API_URL = 'https://nominatim.openstreetmap.org/reverse'

const GREEK_TO_ENGLISH_MAP = {
  'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': 'Th',
  'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': 'X', 'Ο': 'O', 'Π': 'P',
  'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'Ch', 'Ψ': 'Ps', 'Ω': 'O',
  'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h', 'θ': 'th',
  'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o', 'π': 'p',
  'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'ch', 'ψ': 'ps', 'ω': 'o',
  'Ά': 'A', 'Έ': 'E', 'Ή': 'H', 'Ί': 'I', 'Ό': 'O', 'Ύ': 'Y', 'Ώ': 'O',
  'ά': 'a', 'έ': 'e', 'ή': 'h', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ώ': 'o', 'ϊ': 'i', 'ϋ': 'y',
  'ΐ': 'i', 'ΰ': 'y'
}

const TONOS_MAP = {
  'Ά': 'Α', 'Έ': 'Ε', 'Ή': 'Η', 'Ί': 'Ι', 'Ό': 'Ο', 'Ύ': 'Υ', 'Ώ': 'Ω',
  'ά': 'α', 'έ': 'ε', 'ή': 'η', 'ί': 'ι', 'ό': 'ο', 'ύ': 'υ', 'ώ': 'ω', 'ϊ': 'ι', 'ϋ': 'υ',
  'ΐ': 'ι', 'ΰ': 'υ'
}

export default {
  USER_ROLES,
  INSTANT_CREATION_ROLES,
  GEOCODE_API_URL,
  GREEK_TO_ENGLISH_MAP,
  TONOS_MAP,
}