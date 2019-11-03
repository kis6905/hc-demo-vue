const REG_NUMBER_COMMA = /(^[+-]?\d+)(\d{3})/;

export default {
  methods: {
    util_numberFormat (v = 0) {
      if (v === 0) return 0
      let s = String(v)
      while (REG_NUMBER_COMMA.test(s))
        s = s.replace(REG_NUMBER_COMMA, '$1' + ',' + '$2')
      return s
    }
  }
}
