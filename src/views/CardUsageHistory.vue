<template>
  <div>
    <h2>카드이용 내역</h2>
    {{ message }}
    <CardUsageHistoryList></CardUsageHistoryList>
  </div>
</template>

<script>
import CardUsageHistoryList from '../components/CardUsageHistoryList'

export default {
  name: 'cardUsageHistory',
  components: {
    CardUsageHistoryList
  },
  data () {
    return {
      message: '준비는 끝났다'
    }
  }
}
</script>

<style scoped lang="less">

</style>
